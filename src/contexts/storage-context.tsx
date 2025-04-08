import { storage } from "@/services/async-storage";
import { IVerseReference } from "@/types/bible";
import { Children, createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export interface IStorageContext {
    storedItems: IVerseReference[],
    setStoredItems: Dispatch<SetStateAction<IVerseReference[]>>
    addStoredItems: (items: IVerseReference[])=>void
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

    async function addStoredItems(items: IVerseReference[]) {
        const itemsToStore = [...items, ...storedItems]
        await storage.save(itemsToStore)
        setStoredItems(itemsToStore)
    }

    async function clearStorage() {
        storage.clear()
        setStoredItems([])
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <StorageContext.Provider value={{storedItems, setStoredItems, addStoredItems, clearStorage}}>
            {children}
        </StorageContext.Provider>
    )
}