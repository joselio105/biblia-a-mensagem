import { Books } from "@/components/books";
import { BibleBooks } from "@/data/bible-books";
import { View } from "react-native";

export default function Testament() {
  return (
    <View className="flex-1 bg-zinc-800">
      <Books
        books={BibleBooks.oldTestament}
        testament="old-testament"
        title="Velho Testamento"
      />
    </View>
  );
}
