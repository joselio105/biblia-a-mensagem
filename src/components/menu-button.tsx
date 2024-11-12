import { TouchableOpacity, Text } from "react-native";
import { Href, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import {} from "@react-navigation/bottom-tabs";

interface Props {
  text: string;
  iconName: keyof typeof Feather.glyphMap;
  route: never;
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
}

export function MenuButton({ text, iconName, route, setModalVisible }: Props) {
  const navigation = useNavigation();

  function handleNavigation(route: never) {
    navigation.navigate(route);
    setModalVisible(false);
  }
  return (
    <TouchableOpacity
      className="flex-row gap-3 items-center my-2"
      onPress={() => handleNavigation(route)}
    >
      <Feather name={iconName} size={24} color={colors.zinc[100]} />
      <Text className="text-zinc-100 font-body text-lg">{text}</Text>
    </TouchableOpacity>
  );
}
