import { IVerse } from "@/types/bible";
import clsx from "clsx";
import { TouchableOpacity, Text, View } from "react-native";

interface Props{
    verse: IVerse
    handleSelection: (verse:IVerse)=>void
    selecteds: IVerse[]
}

export function Verse({verse, selecteds, handleSelection}:Props){
    return (
        <TouchableOpacity 
          className={clsx("px-2 mb-3", {
            'bg-zinc-700 rounded-lg p-2': Boolean(selecteds.find(({number})=>number===verse.number))
          })} 
          onPress={()=>handleSelection(verse)}
          >
            {verse.reference && (
                <Text className="text-zinc-200 text-base font-bold underline">{verse.reference}</Text>
            )}
          {verse.title.length > 0 && (
            <Text className="text-zinc-200 text-base font-subtitle text-center my-3">
              {verse.title}
            </Text>
          )}
          <Text 
            className={clsx(
              "text-zinc-200 text-base text-justify font-body",
              {
                'text-zinc-400': Boolean(selecteds.find(({number})=>number===verse.number))
              }
            )}
            >
            <View className="pr-3">
              <Text className="text-zinc-400 text-sm">
                {verse.number}
              </Text>
            </View>
            {verse.content}
          </Text>            
            {verse.createdAt && (
                <View className="flex-row gap-3 items-center justify-end">
                    <Text className="text-zinc-400 text-xs">Salvo em</Text>
                    <Text className="text-zinc-400 text-sm">{new Date(verse.createdAt).toLocaleDateString()+' '+new Date(verse.createdAt).toLocaleTimeString()}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}