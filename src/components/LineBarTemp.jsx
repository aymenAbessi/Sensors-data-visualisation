import { useTheme } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import {  useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import { tokens } from '../theme'
import { AuthContext } from '../context/AuthContext';
import { Box } from '@mui/system';
import Header from './Header';


const LineBarTemp = ({onDash})=>{
  const theme= useTheme()
  const colors= tokens(theme.palette.mode)
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
          setHieght("40vh")
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

    const lineChartRef = ref(db,`users/${currentUser.currentUser.uid}/dataVisualisation/lineChartTemp`); 
    onValue(lineChartRef, (snapshot) => {
      const dataObj = snapshot.val();
      const dataArray = Object.keys(dataObj).map((key) => ({ x: key, y: dataObj[key] }));
      setData(dataArray);
     

    });
  }, [currentUser.currentUser.uid,onDash,isMobile]); 
    const dataV =[
        {
          "id": "Tempurature",
         
          "data":data.sort((a, b) => (parseInt(a.x) > parseInt(b.x)) ? 1 : -1)
        }
      ]  
      
        return (
          <Box width={width} height={hieght}>  
                 <Box ml={4} mb={-10}>
                     <Header title={`${onDash ? "": "Data visualisation"}`} subTitle="The value of Tempurature at your Home"/>
                 </Box>
            <ResponsiveLine
            data={dataV}
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
            key={['tempurature']}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Hour',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Temperature',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enablePoints={false}
            enableGridX={false}
            enableGridY={true}
            enableArea={true}
            areaOpacity={0.3}
            colors="orange"
            pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
              anchor:isMobile ? "bottom":  'bottom',
              direction: isMobile? "column" : "row",
                justify: false,
                translateX: 100,
                translateY: 50,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,itemTextColor :"yellow"
                            
                        }
                    }
                ]
            }
        ]}
          />
          </Box>

        )
}
export default LineBarTemp