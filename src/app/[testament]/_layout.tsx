import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-800 pt-10">
      <Header />
      <Slot />
      <Footer />
    </SafeAreaView>
  );
}
