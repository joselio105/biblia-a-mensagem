import { useRef, useState } from "react";
import { TouchableOpacity, View, Animated, Easing } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { TabButton } from "./tab-button";
import { MenuMain } from "./menu-main";

export function TabBar({ state, navigation }: BottomTabBarProps) {
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
    <View className="flex-row items-center gap-3 mx-3">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        function onPress() {
          const event = navigation.emit({
            type: "tabPress",
            canPreventDefault: true,
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }

        if (route.name === "old-testament" || route.name === "new-testament") {
          return (
            <TabButton
              title={
                route.name === "old-testament"
                  ? "Velho Testamento"
                  : "Novo Testamento"
              }
              key={route.key}
              onPress={onPress}
              isFocused={isFocused}
            />
          );
        }
      })}

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
