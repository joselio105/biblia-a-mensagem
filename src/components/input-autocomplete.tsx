import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface ItemProps {
  id: string;
  name: string;
}

interface Props extends TextInputProps {
  listContent: ItemProps[];
  afterSelect?: (value: string) => void;
}

export function InputAutocomplete({
  listContent,
  afterSelect = () => {},
  ...props
}: Props) {
  const [query, setQuery] = useState("");
  const [filtredList, setFiltredList] = useState<ItemProps[]>([]);

  function find(text: string) {
    if (text) {
      const regex = new RegExp(`${text.trim()}`, "i");
      setFiltredList(
        listContent.filter((item) => item.name.search(regex) >= 0)
      );
    } else {
      setFiltredList([]);
    }
    setQuery(text);
  }

  return (
    <View className="px-4 relative">
      <TextInput
        className="bg-zinc-100 text-zinc-900 text-lg font-bold placeholder:text-lg p-2 rounded-md"
        value={query}
        onChangeText={(text) => find(text)}
        {...props}
      />
      <FlatList
        data={filtredList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-zinc-600 p-3 border-b border-b-zinc-900"
            onPress={() => {
              setQuery(item.name);
              setFiltredList([]);
              afterSelect(item.name);
            }}
          >
            <Text className="text-zinc-300 text-base font-body">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
