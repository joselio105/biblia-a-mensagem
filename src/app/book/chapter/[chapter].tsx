import { AllBibleBooks } from "@/data/bible-books";
import { useLocalSearchParams } from "expo-router";
import * as FileSystem from "expo-file-system";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";

export default function Book() {
  const { chapter: bookChapter } = useLocalSearchParams();
  const [constent, setContent] = useState("");
  const [bookkName, chapter, testament] = String(bookChapter).split("+");
  const book = AllBibleBooks.find((book) => book.normalizedTitle === bookkName);

  useEffect(() => {
    const lerArquivo = async () => {
      try {
        const fileUri =
          FileSystem.documentDirectory +
          `src/data/${testament}-testament/${bookkName}/${chapter}.json`;
        // const conteudo = await FileSystem.readAsStringAsync(
        //   fileUri
        // );
        console.log(fileUri);
      } catch (error) {
        console.error("Erro ao ler arquivo:", error);
      }
    };
    lerArquivo();
  }, []);

  if (!book) {
    return "";
  }

  return (
    <View className="flex-1">
      <Text className="text-zinc-100 text-xl font-subtitle">
        {`${book.title} capítulo ${chapter}`}
      </Text>
    </View>
  );
}
