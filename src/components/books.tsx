import { IBibleBook } from "@/types/bible";
import { Link } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { BooksItem } from "./books-item";

interface Props {
  books: IBibleBook[];
  title: string;
}

export function Books({ title, books }: Props) {
  return (
    <View className="flex-1">
      <Text className="text-xl text-zinc-100 font-bold text-center my-3">
        {title}
      </Text>
      <ScrollView className="bg-zinc-900 border border-zinc-400 rounded-md">
        {books.map(({ title, normalizedTitle, chaptersCount }) => (
          <BooksItem
            key={normalizedTitle}
            title={title}
            subtitle={`${chaptersCount} capítulos`}
            route={`/book/${normalizedTitle}`}
          />
        ))}
      </ScrollView>
    </View>
  );
}
