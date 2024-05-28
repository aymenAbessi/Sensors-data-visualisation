import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ResponsivePie } from '@nivo/pie'
import {  useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import { tokens } from '../theme'
import { AuthContext } from '../context/AuthContext';
import Header from './Header';

const PieChartLvG = ({onDash})=>{
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [data, setData] = useState([]);
    const currentUser = useContext(AuthContext)
    const [width,setWidth]=useState()
    const [hieght, setHieght]=useState()
    const [isMobile, setIsMobile]=useState()

    useEffect(() => {

        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

        if(isMobile){
            if(onDash){
              setWidth("100vw")
              setHieght("40vh")
            }else{
              
             setWidth("80vw")
              setHieght("50vh")
            }
    
        }else {
            if(onDash && !isMobile){
           
              setWidth("35vw")
              setHieght("35vh")
            }else if(!onDash && !isMobile){
              console.log("not in the dash and in laptop")
              setWidth("30vw")
              setHieght("40vh")
            }
        }
    
        const barChartRef = ref(db, `users/${currentUser.currentUser.uid}/dataVisualisation/pieChartGarbage`);
        onValue(barChartRef, (snapshot) => {
          const dataObj = snapshot.val();
          const dataArray = Object.keys(dataObj).map((key) => ({
            id: key ,
            day: key,
            value :dataObj[key]
          }));
          setData(dataArray);
        });
      }, [currentUser.currentUser.uid,onDash,isMobile]);
      console.log(data)
    
    return (
        <Box width={600} height={hieght}>  
                 <Box ml={4} mb={-10}>
                     <Header title={`${onDash ? "": "Data visualisation"}`} subTitle="Level of garbage in your garbage colector"/>
                 </Box>
            <ResponsivePie
        data={data}
        theme={{
           
            
          
            
              tooltip:{
                  container :{
                      color:"black"
                  }
              },
              
             
      
              
          }}
        margin={{ top: 80, right: 20, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'monday'
                },
                id: 'dots'
            },
           
           
            {
                match: {
                    id: 'sunday'
                },
                id: 'lines'
            },
           
            {
                match: {
                    id: 'thursday'
                },
                id: 'dots'
            }
        ]}
        legends={[
            {
                anchor:isMobile ? "bottom":  'bottom',
                direction: isMobile? "column" : "row",
                justify: false,
                translateX: 0,
                translateY: 80,
                itemsSpacing: 0,
                itemWidth: 70,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: colors.grey[100]
                        }
                    }
                ]
            }
        ]}
    />

        </Box>
    )
}

export default PieChartLvG ;