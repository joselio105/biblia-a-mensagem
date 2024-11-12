import clsx from "clsx";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
  isFocused?: boolean;
}

export function TabButton({ title, isFocused = false, ...rest }: Props) {
  return (
    <TouchableOpacity className="flex-1" {...rest}>
      <Text
        className={clsx("text-lg font-subtitle text-center", {
          "text-zinc-400": !isFocused,
          "text-zinc-300": isFocused,
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
