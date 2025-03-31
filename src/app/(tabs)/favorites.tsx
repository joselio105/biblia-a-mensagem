import { FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Heading } from "@/components/heading";
import { AllBibleBooks, BibleBooks } from "@/data/bible-books";
import bibleJson from "@/data/bible.json";
import { IBible, IBibleBook, IVerse, IVerseReference } from "@/types/bible";
import { useEffect, useState } from "react";
import { storage } from "@/services/async-storage";

export default function Favorites() {
  const router = useRouter();
  const [itemsSaved, setItemsSaved]=useState<IVerse[]>()

  async function fetchItems(){
    const dataStored = await storage.read()
    /**
     * Buscar conteúdo 
     * Colocar conteúdo como Flatlist
     */
    const data = AllBibleBooks.filter(({normalizedTitle})=>normalizedTitle===dataStored[0].book)
    
    const bible = bibleJson as IBible;
    const books = dataStored.map((item:IVerseReference)=>{
      console.log(item.book, afterSelect(item.book));
      
    })
    
    /* setItemsSaved(dataStored.map((item:IVerseReference)=>{
      const testament = BibleBooks.newTestament.find(book=>book.normalizedTitle===item.book) ? 'new-testament': 'old-testament'
      const verse = bible[testament][item.book][item.verse]
      console.log(verse);

      
    })) */
  }

  useEffect(()=>{
    fetchItems()
  }, [])

  function afterSelect(bookName: string) {
    const bookOldTestament = findBook(BibleBooks.oldTestament, bookName);
    
    if (bookOldTestament) {
      return bookOldTestament
    }
    
    const bookNewTestament = findBook(BibleBooks.newTestament, bookName);
    console.log(bookNewTestament);
    if (bookNewTestament) {
      return bookNewTestament
    }
  }

  function findBook(testament: IBibleBook[], bookName: string) {
    return testament.find((book) => book.normalizedTitle === bookName);
  }

  return (
    <View className="flex-1 bg-zinc-800">
      <Heading>Favoritos</Heading>
      {itemsSaved ? 
        (
          <FlatList
            data={itemsSaved}
            renderItem={({ item }) => (
              <View className="px-2 mb-3">                        
                <Text className="text-zinc-200 text-base text-justify font-body">
                  <View className="pr-3">
                    <Text className="text-zinc-400 text-sm">
                      {item.content}
                    </Text>
                  </View>
                </Text>
              </View>
            )}
          />
        ) : (
        <Text className="text-2xl text-red-500">'Nada salvo'</Text>

      )}
    </View>
  );
}
