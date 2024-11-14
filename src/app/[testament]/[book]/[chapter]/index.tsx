import { AllBibleBooks } from "@/data/bible-books";
import bibleJson from "@/data/bible.json";
import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { ButtonBack } from "@/components/button-back";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-toast-message";
import { ToastCustom } from "@/components/toast-custom";

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

  function handleCopy(verse: VerseProps) {
    // Clipboard.setString(`"${verse.content}" ${bookName}:${verse.number}(MSG)`);
    Toast.show({
      type: "success",
      text1: `O versículo ${bookName}:${verse.number} foi copiado!`,
    });
  }

  function handleSave(verse: VerseProps) {}

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
        <FlatList
          data={content}
          renderItem={({ item: verse }) => (
            <View className="px-2 mb-3">
              {verse.title.length > 0 && (
                <Text className="text-zinc-200 text-base font-subtitle text-center my-3">
                  {verse.title}
                </Text>
              )}
              <Text className="text-zinc-200 text-base text-justify font-body">
                <View className="pr-3">
                  <Text className="text-zinc-400 text-sm">{verse.number}</Text>
                </View>
                {verse.content}
              </Text>
              <View className="flex-row gap-4 justify-end">
                <TouchableOpacity onPress={() => handleCopy(verse)}>
                  <Feather name="copy" size={24} color={colors.zinc[400]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSave(verse)}>
                  <Feather name="star" size={24} color={colors.zinc[400]} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <Toast
        config={{
          success: ({ text1 }) => <ToastCustom text={text1 ?? "..."} />,
        }}
      />
      <ButtonBack />
    </View>
  );
}
