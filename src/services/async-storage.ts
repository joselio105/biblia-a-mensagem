import { IVerseReference } from "@/types/bible"
import AsyncStorage from "@react-native-async-storage/async-storage"

const key = 'saved_verses'


async function save(dataToStore:IVerseReference[]){
    try {
        const dataStored = await read() as IVerseReference[]
        const itemsFound = dataStored.filter(stored=>getKeysList(dataToStore).has(createKey(stored)))
        console.log('------------', {
            dataStored,
            dataToStore,
            itemsFound
        });
        
        if(itemsFound.length===0){
            dataStored.push(...dataToStore)
            await AsyncStorage.setItem(key, JSON.stringify(dataStored))
        }else{
            console.log('Esse já existe');
            
        }
        
    } catch (error) {
        console.error(error)
    }
}

async function read() {
    try {
        const dataStored = await AsyncStorage.getItem(key)??'[]'

        return dataStored!==null ? JSON.parse(dataStored) : []
    } catch (error) {
        console.error(error)
    }    
}

async function clear() {
    await AsyncStorage.clear()
}

function createKey({book, chapter, verse}: IVerseReference){
    return `${book}${chapter}${verse}`
}

function getKeysList(items: IVerseReference[]){
    return new Set(items.map(createKey))
}

export const storage ={
    read,
    save,
    clear
}