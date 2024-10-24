import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Href, Link, useLocalSearchParams, useRouter } from "expo-router";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";
import { AllBibleBooks } from "@/data/bible-books";

export default function Book() {
  const { book: bookTestament } = useLocalSearchParams();
  const [bookName, testament] = String(bookTestament).split("+");
  const router = useRouter();

  function handleClick(route: Href) {
    router.push(route);
  }
  console.log(bookName, testament, bookTestament);

  const book = AllBibleBooks.find((book) => book.normalizedTitle === bookName);
  if (book) {
    return (
      <View className="w-screen flex-1">
        <Text className="text-zinc-100 text-xl font-subtitle text-center my-3">
          {book.title}
        </Text>
        <ScrollView
          className="flex-1 px-5 gap-4"
          contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          {Array.from({ length: book.chaptersCount }).map((___, index) => (
            <TouchableOpacity
              key={index}
              className="w-20 h-12 flex-row justify-between p-2 bg-zinc-900 border border-zinc-400 rounded-md"
              onPress={() =>
                handleClick(
                  `/book/chapter/${book.normalizedTitle}+${
                    index + 1
                  }+${testament}`
                )
              }
            >
              <Text className="text-zinc-100 text-lg font-subtitle">
                {index + 1}
              </Text>
              <Feather
                name="arrow-up-right"
                color={colors.zinc[400]}
                size={28}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Link href="/" asChild>
          <TouchableOpacity className="h-12 flex-row gap-3 justify-center items-center bg-zinc-900 border border-zinc-400 rounded-md mx-3 mt-5">
            <Feather name="arrow-left" size={20} color={colors.zinc[400]} />
            <Text className="text-zinc-400 text-base font-body">Voltar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return "";
}
