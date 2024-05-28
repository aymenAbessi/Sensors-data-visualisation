import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getDatabase } from "firebase/database";



const firebaseConfig = {

};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export  const db= getDatabase();
