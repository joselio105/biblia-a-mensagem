import { FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Heading } from "@/components/heading";
import { AllBibleBooks } from "@/data/bible-books";
import bibleJson from "@/data/bible.json";
import { IBible, IVerse, IVerseReference } from "@/types/bible";
import { useEffect, useState } from "react";
import { Verse } from "@/components/verse";
import { useStorage } from "@/hooks/use-storage";
import { ButtonsWrapper } from "@/components/buttons-wrapper";
import { ButtonBack } from "@/components/button-back";
import { Button } from "@/components/button";

export default function Favorites() {
  const router = useRouter();
  const { storedItems,clearStorage } = useStorage()
  const [itemsSaved, setItemsSaved]=useState<IVerse[]>([])
  const [selecteds, setSelecteds] = useState<IVerse[]>([])

  function handleSelection(verse:IVerse){
    if(selecteds.find(({number})=>number===verse.number)){
      setSelecteds(selecteds.filter(({number})=>number!==verse.number))
    }else{
      setSelecteds([verse, ...selecteds])              
    }
  }

  function handleCleanSelection(){
    clearStorage()
    setItemsSaved([])
    setSelecteds([])
  }

  async function fetchItems(){    
    const bible = bibleJson as IBible;
    
    storedItems.forEach((verse:IVerseReference)=>{      
      const chapterContent = bible[verse.testament][verse.book][verse.chapter]
      const item = chapterContent.find((verses)=>(verse.verse===verses.number))
      
      if(item && !hasVerse(verse)){
        item.reference = getVerseReference(verse)
        item.createdAt = verse.createdAt
        
        setItemsSaved([item, ...itemsSaved])
      }
    })
  }

  function getVerseReference({book: bookName, chapter, verse: number}:IVerseReference){
    const book = AllBibleBooks.find((book) => book.normalizedTitle === bookName);
    
    return `${book?.title} ${chapter}:${number} (MSG)`
  }

  function hasVerse(verseReference: IVerseReference):boolean {    
    return Boolean(
      itemsSaved.find(({reference})=>(reference===getVerseReference(verseReference)))
    )
  }

  useEffect(()=>{
    fetchItems()
  }, [storedItems])

  return (
    <View className="flex-1 bg-zinc-800">
      <View className="flex-row items-center justify-center">
        <Heading className="flex-1">Favoritos</Heading>
        <Text className="text-zinc-400 ml-auto pr-5">{storedItems.length} itens salvos</Text>
      </View>
      <ButtonsWrapper hasSelection={selecteds.length>0}>
        <Button.root onPress={handleCleanSelection}>
          <Button.icon name="trash" />
          <Button.text>Limpar</Button.text>
        </Button.root>
      </ButtonsWrapper>
      <FlatList
        data={itemsSaved}
        renderItem={({ item }) => (<Verse showReference verse={item} selecteds={selecteds} handleSelection={handleSelection} />
        )}
      />
    </View>
  );
}
