import { Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "expo-router";

interface Props {}

export function ButtonBack({}: Props) {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  return (
    <TouchableOpacity
      onPress={handleBack}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
      }}
      className="h-12 bg-zinc-900 border border-zinc-400 rounded-md mx-3 mt-3"
    >
      <Feather name="arrow-left" size={20} color={colors.zinc[400]} />
      <Text className="text-zinc-400 text-base font-body">Voltar</Text>
    </TouchableOpacity>
  );
}
