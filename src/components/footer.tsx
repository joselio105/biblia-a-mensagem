import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";

export function Footer() {
  return (
    <View className="bg-zinc-900 pt-3 mt-3">
      <Text className="text-zinc-400 text-xs font-body text-center">
        © 2024 Bíblia A Mensagem Online. Todos os direitos reservados.
      </Text>
    </View>
  );
}
