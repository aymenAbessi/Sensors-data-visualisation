import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Box } from '@mui/system'
import { Button, TextField } from '@mui/material'


export default function Login() {

  const [err,setErr]=useState(false)
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [pass,setPass]= useState("")


  const handle_submit = async ()=>{
     
    try{
      const res=await signInWithEmailAndPassword(auth, email, pass)
         
      
              navigate('/')
           
    }catch(e){
      setErr(true)
    }

  }







  return (
    <Box display="flex" alignItems="center" justifyContent="center">
        <Box display="flex" justifyItems="center" alignItems="center" flexDirection="column">
                <span className='title'>Login</span>
                  
               <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
               <TextField sx={{marginBottom:5 , marginTop:5}} onChange={(e)=>setEmail(e.target.value)} type="email" id="outlined-basic" label="Email" variant="outlined" />
               <TextField  onChange={(e)=>setPass(e.target.value)} id="outlined-basic" type="password" label="password" variant="outlined" />
               <Button onClick={handle_submit} sx={{bgcolor:"blue", marginTop:2}}  variant="contained">Sign In</Button>

                        {err && <span>Something went rong</span>}
               </Box>
          
            <p>You don't have an account ? you can register in homeWizard app </p>
        </Box>
    </Box>
  )
}
