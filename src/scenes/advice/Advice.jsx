import { Box, Card, CardContent, IconButton, Typography, useTheme } from "@mui/material"
import Header from "../../components/Header"
import {db} from "../../firebase"
import { ref, onValue,remove } from "firebase/database"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { tokens } from "../../theme"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



const Advice =()=> {
    const currentUser = useContext(AuthContext)
    const [adviceArray,setAdviceArray] = useState([])
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const deleteAdvice = (name)=>{
       remove( ref(db,`users/${currentUser.currentUser.uid}/advice/${name}`))
    }

    useEffect(()=>{
       var refadvice = ref(db,`users/${currentUser.currentUser.uid}/advice`)   
       
        onValue(refadvice, (snapshot) => {
            const dataObj = snapshot.val();
            const dataArray = Object.keys(dataObj).map((key) => ({
              name: key ,
              advice: dataObj[key],
            
            }));
            setAdviceArray(dataArray);
          });
       

    },[currentUser.currentUser.uid])
    return (
        <Box width="80vw" height="90vh" >  
        <Box ml={4}>
       <Header title="Suggestions and Advices" subTitle="those suggestions and advices based on what we collect as a data"/>
       </Box>
       <Box display="flex" justifyContent="center" width="80vw"  flexDirection="column"  ml={4}>
       {adviceArray.map((advice) => (
        <Card  sx={{bgcolor:colors.primary[400], m:2, transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        }}} key={advice.name} variant="elevation">
          <CardContent sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <div>
            <Typography variant="h3" component="h2">
              {advice.name}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {advice.advice}
            </Typography>
            </div>
           
                <IconButton onClick={()=>deleteAdvice(advice.name)}>
            <HighlightOffIcon  sx={{color:"red", cursor:"pointer",width:40, height:40}}/>
            </IconButton>
           
                    
              
          </CardContent>
        </Card>
      ))}
       </Box>
       </Box>
    )
}

export default Advice