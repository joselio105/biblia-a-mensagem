import { View } from "react-native";
import { LogoType } from "./logotype";

export function Header() {
  return (
    <View className="bg-zinc-900 flex-row items-center gap-3 w-full p-3 mt-8">
      <LogoType />
    </View>
  );
}
