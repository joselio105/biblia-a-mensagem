import {
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useRef, useState } from "react";
import { MenuMain } from "./menu-main";
import { LogoType } from "./logotype";

export function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  function handleOpen() {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    });
  }

  function handleClose() {
    setModalVisible(false);
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    });
  }
  return (
    <View className="bg-zinc-900 flex-row items-center gap-3 w-full p-3 mt-8">
      <LogoType />
      <Feather name="search" size={32} color={colors.zinc[400]} />
      <TouchableOpacity onPress={handleOpen}>
        <Feather name="menu" size={32} color={colors.zinc[400]} />
      </TouchableOpacity>
      <MenuMain
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClose={handleClose}
        slideAnim={slideAnim}
      />
    </View>
  );
}
