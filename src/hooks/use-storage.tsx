import { IStorageContext, StorageContext } from "@/contexts/storage-context";
import { useContext } from "react";

export function useStorage(): IStorageContext{
    const context = useContext(StorageContext)

    if(!context){
        throw new Error("useStorage deve ser usado dentro de um StorageContext");        
    }

    return context
}