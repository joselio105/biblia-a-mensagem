import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";

interface Props {
  text: string;
}

export function ToastCustom({ text }: Props) {
  return (
    <View className="flex-row gap-3 bg-zinc-700 rounded-lg p-3">
      <Feather name="check" color={colors.green[500]} size={20} />
      <Text className="text-zinc-200 text-sm font-body">{text}</Text>
    </View>
  );
}
