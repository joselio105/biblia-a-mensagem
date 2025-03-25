import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "expo-router";
import { Button } from "./button";

interface Props {}

export function ButtonBack({...props}: TouchableOpacityProps) {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  return (
    
    <Button.root onPress={handleBack} {...props}>
      <Button.icon name="arrow-left" />
      <Button.text>Voltar</Button.text>
    </Button.root>
  );
}
