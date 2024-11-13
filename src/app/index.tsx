import { Href, Redirect } from "expo-router";

export default function Home() {
  return <Redirect href={"old-testament" as Href} />;
}
