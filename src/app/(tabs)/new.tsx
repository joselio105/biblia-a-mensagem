import { Books } from "@/components/books";
import { BibleBooks } from "@/data/bible-books";
import { View, Text } from "react-native";

export default function New() {
  return (
    <View className="flex-1 bg-zinc-800">
      <Books
        books={BibleBooks.newTestament}
        testament="new-testament"
        title="Novo Testamento"
      />
    </View>
  );
}
