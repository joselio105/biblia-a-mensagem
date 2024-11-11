import {
  Modal,
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Href, useRouter } from "expo-router";
import { useRef } from "react";
import { LogoType } from "./logotype";

interface Props {
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
  handleClose: () => void;
  slideAnim: Animated.Value;
}

export function MenuMain({
  modalVisible,
  setModalVisible,
  handleClose,
  slideAnim,
}: Props) {
  const router = useRouter();

  function handleNavigation(route: Href) {
    router.push(route);
    setModalVisible(false);
  }

  return (
    <Modal
      transparent
      visible={modalVisible}
      onRequestClose={handleClose}
      style={{ transform: [{ translateX: slideAnim }] }}
    >
      <View className="flex-1 gap-4 bg-zinc-900/80">
        <View className="flex-row items-center p-3  mt-8">
          <LogoType />
          <TouchableOpacity onPress={handleClose}>
            <Feather name="x" size={32} color={colors.zinc[400]} />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center pt-40 gap-4">
          <TouchableOpacity
            className="flex-row gap-3 items-center"
            onPress={() => handleNavigation("/(tabs)old")}
          >
            <Feather name="home" size={24} color={colors.zinc[100]} />
            <Text className="text-zinc-100 font-body text-lg">Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row gap-3 items-center"
            onPress={() => handleNavigation("/(tabs)gift")}
          >
            <Feather name="gift" size={24} color={colors.zinc[100]} />
            <Text className="text-zinc-100 font-body text-lg">Contribuir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row gap-3 items-center"
            onPress={() => handleNavigation("/(tabs)about")}
          >
            <Feather name="info" size={24} color={colors.zinc[100]} />
            <Text className="text-zinc-100 font-body text-lg">Sobre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
