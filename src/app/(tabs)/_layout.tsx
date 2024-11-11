import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function TablsLayout() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-800">
      <Header />
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.zinc[800] },
          tabBarLabelStyle: { fontSize: 12, color: colors.zinc[200] },
          headerShown: false,
        }}
        initialRouteName="/(tabs)about"
      >
        <Tabs.Screen
          name="old"
          options={{
            title: "Velho Testamento",
            tabBarIcon: () => "",
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            title: "Novo Testamento",
            tabBarIcon: () => "",
          }}
        />
        <Tabs.Screen
          name="gift"
          options={{
            title: "Contribua",
            tabBarIcon: () => (
              <Feather name="gift" size={20} color={colors.zinc[200]} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "Sobre",
            tabBarIcon: () => (
              <Feather name="info" size={20} color={colors.zinc[200]} />
            ),
          }}
        />
      </Tabs>
      <Footer />
    </SafeAreaView>
  );
}
