import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase";
export const AuthContext = createContext()

const AuthContextProvider =({children}) =>{
    const [currentUser,setCurrentUser] = useState({})

    useEffect(()=>{

      const unsub=  onAuthStateChanged (auth,(user)=>{
            setCurrentUser(user)
        })

        return ()=>{unsub()}
    },[])

    return <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
}
export default AuthContextProvider