import { View } from "react-native";
import { BibleBooks } from "@/data/bible-books";
import { Books } from "@/components/books";

export default function Home() {
  return (
    <View className="flex-1 flex-row px-3">
      <Books
        testament="old"
        title="Antigo Testamento"
        books={BibleBooks.oldTestament}
      />
      <Books
        testament="new"
        title="Novo Testamento"
        books={BibleBooks.newTestament}
      />
    </View>
  );
}
