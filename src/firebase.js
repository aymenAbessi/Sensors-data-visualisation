import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyAh9hpOPDZZX24jY5rWDsZkI86UBfUX8yA",
  authDomain: "smarthome-f314e.firebaseapp.com",
  databaseURL: "https://smarthome-f314e-default-rtdb.firebaseio.com",
  projectId: "smarthome-f314e",
  storageBucket: "smarthome-f314e.appspot.com",
  messagingSenderId: "885584363406",
  appId: "1:885584363406:web:6896cfca44086efa4beedf",
  measurementId: "G-F5XTSZZ2VM"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export  const db= getDatabase();