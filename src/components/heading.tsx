import { clsx } from "clsx";
import { Text } from "react-native";

interface Props {
  children: string;
  type?: "h2" | "h3";
}

export function Heading({ children, type = "h2" }: Props) {
  return (
    <Text
      className={clsx("text-zinc-100 text-xl ", {
        "font-heading my-3 text-center": type === "h2",
        "font-subtitle my-2": type === "h3",
      })}
    >
      {children}
    </Text>
  );
}
