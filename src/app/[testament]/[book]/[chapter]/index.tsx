import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard"
import AsyncStorage from "@react-native-async-storage/async-storage"
import clsx from "clsx";
import { AllBibleBooks } from "@/data/bible-books";
import bibleJson from "@/data/bible.json";
import { ButtonBack } from "@/components/button-back";
import { Button } from "@/components/button";

interface VerseProps {
  title: string;
  number: string;
  content: string;
}

interface BibleProps {
  [testament: string]: {
    [book: string]: {
      [chapter: string]: VerseProps[];
    };
  };
}

export default function Chapter() {
  const { testament, book: bookName, chapter } = useLocalSearchParams();
  const [content, setContent] = useState<VerseProps[]>([] as VerseProps[]);
  const book = AllBibleBooks.find((book) => book.normalizedTitle === bookName);
  const [selecteds, setSelecteds] = useState<VerseProps[]>([])
  const [actionMessage, setActionMessage] = useState<String>('')

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
    try{
      const savedVersesJson = await AsyncStorage.getItem('saved_verses')??'[]'
      const savedVerses = JSON.parse(savedVersesJson)

      /* 
      Acrescentar a lista de versículos salvos somente aqueles que ainda não se encontram salvos
      const versesToSave = getSelectedData().filter((data)=>data.book) */
      await AsyncStorage.setItem('saved_verses', getSelectedText())
      setMessage('Texto marcado como favorito')
      handleCleanSelection()
    }catch(e){
      console.error(e);
      
    }
  }

  function handleSelection(verse:VerseProps){
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

  function getSelectedData(){
    return selecteds.map(({number})=>(
      {
        book: book?.title,
        chapter,
        verse: number,
        createdAt: new Date().toISOString
      }
    ))
  }

  useEffect(() => {
    const bible = bibleJson as BibleProps;
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
        <View className={clsx(
          "flex-row items-center justify-end mb-4",
          {
            "hidden":selecteds.length===0, 
            "flex":selecteds.length>0
            }
          )} 
          style={{gap: 8}}
          >
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
        </View>

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
            <TouchableOpacity 
              className={clsx("px-2 mb-3", {
                'bg-zinc-700 rounded-lg p-2': Boolean(selecteds.find(({number})=>number===verse.number))
              })} 
              onPress={()=>handleSelection(verse)}
              >
              {verse.title.length > 0 && (
                <Text className="text-zinc-200 text-base font-subtitle text-center my-3">
                  {verse.title}
                </Text>
              )}
              <Text 
                className={clsx(
                  "text-zinc-200 text-base text-justify font-body",
                  {
                    'text-zinc-400': Boolean(selecteds.find(({number})=>number===verse.number))
                  }
                )}
                >
                <View className="pr-3">
                  <Text className="text-zinc-400 text-sm">
                    {verse.number}
                  </Text>
                </View>
                {verse.content}
              </Text>
              {/* <View className="flex-row gap-4 justify-end">
                <TouchableOpacity onPress={() => handleCopy(verse)}>
                  <Feather name="copy" size={24} color={colors.zinc[400]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSave(verse)}>
                  <Feather name="star" size={24} color={colors.zinc[400]} />
                </TouchableOpacity>
              </View> */}
            </TouchableOpacity>
          )}
        />
      </View>
      
      <ButtonBack />
    </View>
  );
}
{/* <Toast
        config={{
          success: ({ text1 }) => <ToastCustom text={text1 ?? "..."} />,
        }}
      /> */}