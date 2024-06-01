import { initializeApp } from 'firebase/app'
import { useCollection,useDocument } from 'vuefire'
import { User } from '@/type/types'
import { getAuth } from 'firebase/auth'
import { getFirestore,doc, collection,setDoc,addDoc } from 'firebase/firestore'


// ... other firebase imports

export const firebaseApp = initializeApp({
 

        apiKey: "AIzaSyCYMC0Wg9hWJ3vSXZth_p1l3D-NkaWfzKM",
      
        authDomain: "mhamadweb-7b68f.firebaseapp.com",
      
        projectId: "mhamadweb-7b68f",
      
        storageBucket: "mhamadweb-7b68f.appspot.com",
      
        messagingSenderId: "1018686798545",
      
        appId: "1:1018686798545:web:6f79c05186d4ffa6ea23f0"
   
      
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)
export const auth = getAuth()
export const getCollection = async (collectionName:string) : Promise<any> => {
    const data = useCollection(collection(db,collectionName))
    return data
}

export const getDucoment = async (doccumentName:string,id:string) : Promise<any> => {
    const data = useDocument(doc(db,doccumentName,id))
    return data
}

export const setDocument = async (collectionName:string,documentId:string ,User:any)=>{
    await setDoc(doc(db, collectionName, documentId), User);
}

export const setDocumentRandomId = async (collectionName: string, User: any) => {
    await addDoc(collection(db, collectionName), User);
}

// here we can export reusable database references
// export const todosRef = collection(db, 'todos')