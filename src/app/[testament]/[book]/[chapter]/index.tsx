import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard"
import clsx from "clsx";
import bibleJson from "@/data/bible.json";
import { Verse } from "@/components/verse";
import { Button } from "@/components/button";
import { ButtonBack } from "@/components/button-back";
import { useStorage } from "@/hooks/use-storage";
import { AllBibleBooks } from "@/data/bible-books";
import { IBible, IVerse, IVerseReference, TTestament } from "@/types/bible";
import { ButtonsWrapper } from "@/components/buttons-wrapper";

export default function Chapter() {
  const { testament, book: bookName, chapter } = useLocalSearchParams();
  const [content, setContent] = useState<IVerse[]>([] as IVerse[]);
  const book = AllBibleBooks.find((book) => book.normalizedTitle === bookName);
  const [selecteds, setSelecteds] = useState<IVerse[]>([])
  const [actionMessage, setActionMessage] = useState<String>('')
  const { addStoredItems } = useStorage()

  async function handleCopy() {
    try {
      await Clipboard.setStringAsync(getSelectedText())
      setMessage('Texto copiado com sucesso')
      handleCleanSelection() 
    } catch (error) {
      console.error(error);      
    }
  }
  
  async function handleSave() {
    addStoredItems(getVersesReference())
    setMessage('Texto(s) marcado(s) como favorito(s')
    handleCleanSelection()
  }

  function handleSelection(verse:IVerse){
    if(selecteds.find(({number})=>number===verse.number)){
      setSelecteds(selecteds.filter(({number})=>number!==verse.number))
    }else{
      setSelecteds([verse, ...selecteds])              
    }
  }

  function handleCleanSelection(){
    setSelecteds([])
  }

  function setMessage(message:String){
    setActionMessage(message)
    setTimeout(()=>setActionMessage(''), 1000)
  }

  function getSelectedText(){
    const selectedTexts = selecteds.map(({content, number})=>(
      `${content} ${book?.title} ${chapter}:${number} (MSG)`
    ))

    return selectedTexts.join("\n\n")
  }

  function getVersesReference():IVerseReference[]{    
    return selecteds.map(({number})=>{
      const reference: IVerseReference = {
        testament: testament as TTestament,
        book: bookName as string,
        chapter: chapter as string,
        verse: number,
        createdAt: new Date().valueOf()
      }
      
      return reference
    })
  }

  useEffect(() => {
    const bible = bibleJson as IBible;
    setContent(bible[String(testament)][String(bookName)][String(chapter)]);
  }, []);

  if (!book) {
    return "";
  }
  
  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-center my-3">
        <Text className="text-zinc-100 text-xl font-subtitle border-r border-zinc-400 pr-2">
          {book.title}
        </Text>
        <Text className="text-zinc-100 text-base font-subtitle pl-2">{`capítulo ${chapter}`}</Text>
      </View>
      <View className="flex-1 bg-zinc-900 rounded-md px-5 py-3 mx-2">
        <ButtonsWrapper hasSelection={selecteds.length>0}>
          <Button.root onPress={async ()=>await handleCopy()}>
            <Button.icon name="copy"/>
            <Button.text>Copiar</Button.text>
          </Button.root>
          <Button.root onPress={async ()=>await handleSave()}>
            <Button.icon name="save"/>
            <Button.text>Salvar</Button.text>
          </Button.root>
          <Button.root onPress={handleCleanSelection}>
            <Button.icon name="trash"/>
            <Button.text>Limpar</Button.text>
          </Button.root>
        </ButtonsWrapper>

        <View 
          className={clsx(
            "absolute left-4 right-4 bottom-4 z-10 rounded-md bg-zinc-100/90 items-center justify-center py-3", 
            {'flex':actionMessage.length>0, 'hidden':actionMessage.length===0}
            )}
          >
          <Text className="text-zinc-900 font-semibold">{actionMessage}</Text>
        </View>
        <FlatList
          data={content}
          renderItem={({ item: verse }) => (
            <Verse verse={verse} selecteds={selecteds} handleSelection={handleSelection} />
          )}
        />
      </View>
      
      <ButtonBack />
    </View>
  );
}