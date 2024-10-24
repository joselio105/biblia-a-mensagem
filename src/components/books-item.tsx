import { Feather } from "@expo/vector-icons";
import { Href, useNavigation, useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import colors from "tailwindcss/colors";

interface Props {
  title: string;
  subtitle?: string;
  route: Href;
}

export function BooksItem({ title, subtitle, route }: Props) {
  const router = useRouter();

  function handleClick() {
    router.push(route);
  }

  return (
    <TouchableOpacity
      className="p-2 border-b border-b-zinc-400"
      onPress={handleClick}
    >
      <View className="flex-row justify-between">
        <Text className="text-zinc-100 text-lg font-subtitle">{title}</Text>
        <Feather name="arrow-up-right" color={colors.zinc[400]} size={28} />
      </View>
      {subtitle && (
        <Text className="text-zinc-400 text-base font-body">{subtitle}</Text>
      )}
    </TouchableOpacity>
  );
}
