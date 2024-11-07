import { View, Image, Text } from "react-native";

export function LogoType() {
  return (
    <View className="flex-1 flex-row items-center gap-3">
      <Image
        source={require("@/assets/bible-120px.png")}
        className="h-12 w-12"
      />
      <Text className="text-zinc-100 text-xl font-heading">
        Biblia A Mensagem
      </Text>
    </View>
  );
}
