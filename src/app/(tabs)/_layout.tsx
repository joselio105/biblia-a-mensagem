import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TabBar } from "@/components/tab-bar";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TablsLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen name="old-testament" />
        <Tabs.Screen name="new-testament" />
      </Tabs>
      <Footer />
    </SafeAreaView>
  );
}
