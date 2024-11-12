import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TabBar } from "@/components/tab-bar";
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
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="old-testament"
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="new-testament"
          options={{
            headerShown: false,
          }}
        />
      </Tabs>
      <Footer />
    </SafeAreaView>
  );
}
