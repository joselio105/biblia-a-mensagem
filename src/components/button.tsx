import { Feather } from "@expo/vector-icons";
import { ComponentProps, ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

function ButtonRoot({...props}: TouchableOpacityProps) {
    return (
        <TouchableOpacity 
            className="flex-row bg-zinc-400 rounded-md items-center justify-center px-3 py-2" 
            style={{
                gap: 4
            }}
            {...props}
        >
            {props.children}
        </TouchableOpacity>
    )
}

interface ButtonTextProps {
    children: string
}

function ButtonText({children}: ButtonTextProps){
    return (
        <Text className="text-zinc-900 text-base font-body">{children}</Text>
    )
}

interface ButtonIconProps {
    name: ComponentProps<typeof Feather>['name']
    size?:number
    color?:string
}

function ButtonIcon({name, size=24, color=colors.zinc[900]}: ButtonIconProps){
    return (
        <Feather name={name} size={size} color={color}/>
    )
}

ButtonRoot.icon = ButtonIcon
ButtonRoot.text = ButtonText

export const Button = {
    root: ButtonRoot,
    text: ButtonText,
    icon: ButtonIcon
}