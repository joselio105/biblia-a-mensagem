import { Feather } from "@expo/vector-icons";
import { Href, useNavigation } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import colors from "tailwindcss/colors";

interface Props {
  text: string;
  iconName: keyof typeof Feather.glyphMap;
  route: string;
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
}

export function MenuButton({ text, iconName, route, setModalVisible }: Props) {
  const navigation = useNavigation();

  function handleNavigation(route: Href) {
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
