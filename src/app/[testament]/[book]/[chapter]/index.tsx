import { AllBibleBooks } from "@/data/bible-books";
import bibleJson from "@/data/bible.json";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

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

export default function Book() {
  const { testament, book: bookName, chapter } = useLocalSearchParams();
  const [content, setContent] = useState<VerseProps[]>([] as VerseProps[]);
  const book = AllBibleBooks.find((book) => book.normalizedTitle === bookName);

  useEffect(() => {
    const bible = bibleJson as BibleProps;
    setContent(bible[String(testament)][String(bookName)][String(chapter)]);
  }, []);

  if (!book) {
    return "";
  }

  return (
    <ScrollView className="flex-1">
      <View className="flex-row items-center justify-center my-3">
        <Text className="text-zinc-100 text-xl font-subtitle border-r border-zinc-400 pr-2">
          {book.title}
        </Text>
        <Text className="text-zinc-100 text-base font-subtitle pl-2">{`capítulo ${chapter}`}</Text>
      </View>
      <View className="bg-zinc-900 rounded-md p-2 mx-5">
        {content.map((verse, key) => (
          <View key={key} className="px-2">
            <Text className="text-zinc-200 text-lg font-subtitle">
              {verse.title}
            </Text>
            <Text className="text-zinc-200 text-base text-justify font-body">
              <View className="pr-3">
                <Text className="text-zinc-400 text-sm">{verse.number}</Text>
              </View>
              {verse.content}
            </Text>
            {/* <TouchableOpacity className="ml-auto">
              <Feather name="copy" size={20} color={colors.zinc[400]} />
            </TouchableOpacity> */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
