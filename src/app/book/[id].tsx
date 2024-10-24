import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Book() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Book {id}</Text>
    </View>
  );
}
