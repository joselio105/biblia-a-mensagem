import clsx from "clsx";
import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
    children: ReactNode
    hasSelection: boolean
}

export function ButtonsWrapper({children, hasSelection}:Props){
    return (
        <View className={clsx(
          "flex-row items-center justify-end mb-4",
          {
            "hidden":!hasSelection, 
            "flex":hasSelection
            }
          )} 
          style={{gap: 8}}
          >{children}
        </View>
    )
}