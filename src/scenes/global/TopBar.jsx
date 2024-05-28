import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";

const Topbar = () => {
  const navigation  = useNavigate()
  const [search, setSearch]=useState('')
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const currentUser = useContext(AuthContext)
  const [nbAdvice,setNbAdvice] = useState(0)

  useEffect(()=>{

   if(currentUser.currentUser !== null){
    var refadvice = ref(db,`users/${currentUser.currentUser.uid}/advice`)   
    
    onValue(refadvice, (snapshot) => {
        const dataObj = snapshot.val();
        setNbAdvice(0)
       Object.keys(dataObj).map((key) => (setNbAdvice(prev => prev+1)));
     
      });
   }
    

 },[currentUser])

const enter =(e)=>{
  if(e.keyCode === 13){
    setSearch('')
   if ( e.target.value ==="co" ||  e.target.value ==="smoke" ||  e.target.value ==="gaz"){
    navigation('/bar')
   }else if ( e.target.value ==="tempurature" || e.target.value ==="temp"){
    navigation('/lineBarTemp')
   }else if ( e.target.value ==="humidity" || e.target.value ==="hum"){
    navigation('/lineBarHum')
   }else if ( e.target.value ==="heart" ||  e.target.value ==="heart rate" ){
    navigation('/lineBarHeartRate')
   }else if ( e.target.value ==="garbage" ||  e.target.value ==="level" ){
    navigation('/piechartlvgarbage')
   }

 }
}
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */
       currentUser.currentUser &&
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={(e)=>enter(e)} sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

}

      {/* ICONS */}
      <Box display="flex" >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
       { currentUser.currentUser && <Box>
        
        <IconButton onClick={()=>{
          signOut(auth)
        
        }}>
          <LogoutIcon />
        </IconButton>
       </Box>  }
       
      </Box>
    </Box>
  );
};

export default Topbar;