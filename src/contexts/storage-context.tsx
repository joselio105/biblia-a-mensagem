import { storage } from "@/services/async-storage";
import { IVerseReference } from "@/types/bible";
import { Children, createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export interface IStorageContext {
    storedItems: IVerseReference[],
    setStoredItems: Dispatch<SetStateAction<IVerseReference[]>>
    addStoredItem: (item: IVerseReference)=>void
    clearStorage: ()=>void
}

interface IStorageProvider {
    children: ReactNode
}

export const StorageContext = createContext<IStorageContext|undefined>(undefined)

export function StorageProvider({ children }:IStorageProvider){
    const [storedItems, setStoredItems] = useState<IVerseReference[]>([])

    async function fetchItems() {
        const items = await storage.read()
        setStoredItems(items)
    }

    async function addStoredItem(item: IVerseReference) {
        const items = [item, ...storedItems]
        await storage.save(items)
        setStoredItems(items)
    }

    async function clearStorage() {
        storage.clear()
        setStoredItems([])
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <StorageContext.Provider value={{storedItems, setStoredItems, addStoredItem, clearStorage}}>
            {children}
        </StorageContext.Provider>
    )
}