import { useTheme } from '@mui/system';
import { ResponsiveBar } from '@nivo/bar';
import {  useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import { tokens } from '../theme'
import { AuthContext } from '../context/AuthContext';
import { Box } from '@mui/material';
import Header from './Header';



const BarChart = ({onDash}) => {
  const [data, setData] = useState([]);
  const currentUser = useContext(AuthContext)
  const [isMobile, setIsMobile]=useState()
  const [width,setWidth]=useState();
  const [hieght, setHieght]=useState();
  
  useEffect(() => {
   setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

    if(isMobile){
        if(onDash){
          setWidth("100vw")
          setHieght("40vh")
        }else{
          
          setWidth("100vw")
          setHieght("50vh")
        }

    }else {
        if(onDash && !isMobile){
       
          setWidth("40vw")
          setHieght("40vh")
        }else if(!onDash && !isMobile){
          console.log("not in the dash and in laptop")
          setWidth("80vw")
          setHieght("90vh")
        }
    }
    const barChartRef = ref(db, `users/${currentUser.currentUser.uid}/dataVisualisation/barChart`);
    onValue(barChartRef, (snapshot) => {
      const dataObj = snapshot.val();
      const dataArray = Object.keys(dataObj).map((key) => ({
        day: key,
        ...dataObj[key]
      }));
      setData(dataArray);
    });
  }, [currentUser.currentUser.uid,isMobile,onDash,width,hieght]);

  console.log(data)
  
  const theme = useTheme()
  const colors= tokens(theme.palette.mode)
   return ( 
    
    <Box width={width} height={hieght}  >  
    <Box ml={4} mb={-10}>
   <Header title={`${onDash ? "": "Data visualisation"}`} subTitle="the  % of co , smoke , gaz in the air at your home"/>
   </Box>
    <ResponsiveBar
    
    data={ data.sort((a, b) => {
      const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
    })}
    theme={{
              
            
      axis:{
        domain:{
          line :{
            stroke: colors.grey[100]
          },
          
        }, ticks :{
          text: {
            fill:colors.grey[100]
          }
        }
      }
      
      ,
        legends:{
          text:{
            fill: colors.grey[100]
          }
        },
      
        tooltip:{
            container :{
                color:"black"
            }
        },
        
        textColor:colors.grey[100]

        
    }}
    keys={['co', 'gaz', 'smoke']}
    indexBy="day"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10
      }
    ]}
    fill={[
      {
        match: {
          id: 'fries'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'sandwich'
        },
        id: 'lines'
      }
    ]}
    borderColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          1.6
        ]
      ]
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Day',
      legendPosition: 'middle',
      legendOffset: 32
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Concentration',
      legendPosition: 'middle',
      legendOffset: -40
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          4
        ]
      ]
    }}
    legends={[
      {
        dataFrom: 'keys',
        anchor:isMobile ? "right":  'bottom',
        direction: isMobile? "column" : "row",
          justify: false,
          translateX: 100,
          translateY: 80,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
            {
                on: 'hover',
                style: {
                    itemOpacity: 1
                }
            }
        ]
    }
]}
role="application"
ariaLabel="Nivo bar chart demo"
barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
/>
</Box>
 

)
}

export default BarChart ;