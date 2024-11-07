import { Text } from "react-native";

interface Props {
  children: string;
}

export function Paragraph({ children }: Props) {
  return (
    <Text className="text-zinc-100 text-base font-body text-justify mb-2">
      {children}
    </Text>
  );
}
