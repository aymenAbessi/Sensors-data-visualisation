import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import BarChart from "../../components/BarChart"
import PieChartLvG from "../../components/PieChartLvG"
import HumidityLineChart from "../../components/HumLineChart"
import LineBarTemp from "../../components/LineBarTemp"
import Header from "../../components/Header"
import { useEffect, useState } from "react"



const Dashboard = ()=>{ 
  const [device, setDevice]=useState('')

  useEffect(()=>{

     /* Storing user's device details in a variable*/
     let details = navigator.userAgent;
  
     /* Creating a regular expression 
     containing some mobile devices keywords 
     to search it in details string*/
     let regexp = /android|iphone|kindle|ipad/i;

     /* Using test() method to search regexp in details
     it returns boolean value*/
     let isMobileDevice = regexp.test(details);

     if (isMobileDevice) {
        setDevice('mobile')
     } else {
         setDevice('')
     }
  },[])
 

    return(  <Box>
   <Box ml={4} mb={-2}>
   <Header title="dashboard" subTitle="welcome to your dashboard"/>
   </Box>
        <Grid container spacing={2}>
          <Grid item xs={`${device === "mobile" ? 12 : 6}`}>
            <Box height={300}>
             <BarChart onDash={true}/>
            </Box>
          </Grid>
          <Grid item xs={`${device === "mobile" ? 12 : 6}`}>
            <Box height={200}>
                <PieChartLvG onDash={true}/>
            </Box>
          </Grid>
          <Grid item xs={`${device === "mobile" ? 12 : 6}`}>
            <Box height={300}>
                <LineBarTemp onDash={true}/>
            </Box>
          </Grid>
          <Grid item xs={`${device === "mobile" ? 12 : 6}`}>
            <Box height={300}>
                <HumidityLineChart onDash={true}/>
            </Box>
          </Grid>
        </Grid>
      </Box> )
}

export default Dashboard