import { View } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Heading } from "@/components/heading";
import { InputAutocomplete } from "@/components/input-autocomplete";
import { AllBibleBooks, BibleBooks } from "@/data/bible-books";
import { IBibleBook } from "@/types/bible";

export default function Favorites() {
  const router = useRouter();

  function afterSelect(bookName: string) {
    const boolOldTestament = findBook(BibleBooks.oldTestament, bookName);
    if (boolOldTestament) {
      router.push(
        `/old-testament/${boolOldTestament.normalizedTitle}` as never
      );
    }

    const bookNewTestament = findBook(BibleBooks.newTestament, bookName);
    if (bookNewTestament) {
      router.push(`/new-testament/${bookNewTestament.normalizedTitle}`);
    }
  }

  function findBook(testament: IBibleBook[], bookName: string) {
    return testament.find((book) => book.title === bookName);
  }

  return (
    <View className="flex-1 bg-zinc-800">
      <Heading>Favoritos</Heading>
    </View>
  );
}
