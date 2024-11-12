import { Modal, Text, TouchableOpacity, View, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Href, useRouter } from "expo-router";
import { LogoType } from "./logotype";
import { MenuButton } from "./menu-button";

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
        <View className="flex-1 items-center pt-40">
          <MenuButton
            iconName="home"
            text="Início"
            route={"old-testament"}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <MenuButton
            iconName="info"
            text="Sobre"
            route={"about"}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <MenuButton
            iconName="gift"
            text="Contribua"
            route={"gift"}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </Modal>
  );
}
