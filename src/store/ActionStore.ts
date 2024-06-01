import { Item } from "@/type/types";
import { defineStore } from "pinia";
import { setDocumentRandomId } from "@/firebase/firebase";
import { useMainStore } from "./MainStore";
export const useActionStore = defineStore('actionStore',()=>{

    const addItem = async  (object:Item)=>{
        try{
            const mainStore = useMainStore()
            
           
        await setDocumentRandomId('items',object)
        }catch(error:any){
            console.log(error)
        }
    }

    return {addItem}
})