import { useContext, useEffect, useState } from "react"
import { ProSidebar , Menu , MenuItem} from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"
import { IconButton , Box , Typography , useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { AuthContext } from "../../context/AuthContext"

const Item = ({ title,to, icon , selected , setSelected })=>{

       const theme = useTheme()
       const colors = tokens(theme.palette.mode)
     

       return (
              <MenuItem active={selected === title} style={{color : colors.grey[100]}} onClick={()=>setSelected(title)} icon={icon}>
                     <Typography>{title}</Typography>
                     <Link to={to}/>
              </MenuItem>
       )
}


const SideBar = ()=>{
       

       const theme = useTheme()
       const colors = tokens(theme.palette.mode)
       const [isCollapsed, setIsCollapsed]= useState(false)
       const [selected, setSelected]= useState('Dashboard')
       const cureentUser= useContext(AuthContext)
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
              setDevice('laptop')
          }
       },[])


       return (
              <Box height="100vh"
                     sx={{
                            "& .pro-sidebar-inner" : {
                                   background : `${colors.primary[400]} !important`
                            },
                            "& .pro-icon-wrapper" :{
                                   background:"transparent !important"
                            },
                            "& .pro-inner-item" : {
                                   padding:"5px 35px 5px 20px !important"
                            }, 
                            "& .pro-inner-item:hover" : {
                                  color : "#868dfb !important"
                            }, 
                            "& pro-menu-item.active": {
                                   color : "#6870fa !important"
                            }

                     }}
              >

                    {  cureentUser.currentUser ? ( <ProSidebar  collapsed={isCollapsed}>
                           <Menu iconShape="square">
                                   <MenuItem
                                           onClick={() => setIsCollapsed(!isCollapsed)}
                                           icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                                           style={{
                                             margin: "10px 0 20px 0",
                                             color: colors.grey[100],
                                           }}
                                   >
                                         {!isCollapsed && (
                                           <Box>
                                           <Typography variant="h3" color={colors.grey[100]}>
                                                     ADMINIS
                                              </Typography>
                                              <IconButton onClick={()=>{
                                                 
                                                 setIsCollapsed(!isCollapsed)}}>
                                                     <MenuOutlinedIcon/>
                                              </IconButton>
                                       </Box>
                                         )}
                                   </MenuItem>
                                   {/* user */}
                                   { !isCollapsed  && (
                                          <Box mb="25px">
                                                 <Box display="flex" justifyContent="center" bgcolor={colors.grey[400]} alignItems="center">
                                                        <img
                                                               alt="profile-user"
                                                               src={`../../assets/user.png`}
                                                               width="100px"
                                                               height="100px"
                                                               style={{cursor:"pointer", borderRadius:"50%"}}
                                                        />
                                                 </Box>
                                                 <Box>
                                                        <Typography textAlign="center" fontWeight="bold" color={colors.grey[100]} sx={{m:"10px 0 0 0"}}>
                                                              {cureentUser.currentUser.displayName}
                                                        </Typography>
                                                      
                                                 </Box>
                                          </Box>

                                   )}
                                   <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                                          
                                   <Item  
                                                 title='Dashboard'
                                                 to="/"
                                                 selected={selected}
                                                 setSelected={setSelected}
                                                 icon={<HomeOutlinedIcon/>}

                                          />
                                  
                                         
                                       
                                        
                                         
                                         
                                            <Typography variant="h6" color={colors.grey[300]} sx={{m: "15px  0 5px 20px"}}>
                                                 Charts
                                          </Typography>
                                          <Item  
                                                 title='Bar Chart gaz in the air'
                                                 to="/bar"
                                                 selected={selected}
                                                 setSelected={setSelected}
                                                 icon={<BarChartOutlinedIcon/>}

                                          />
                                   
                                           <Item  
                                                 title='Tempurature Line Chart'
                                                 to="/lineBarTemp"
                                                 selected={selected}
                                                 setSelected={setSelected}
                                                 icon={<TimelineOutlinedIcon/>}

                                          />
                                            <Item  
                                                 title='Humidity Line Chart'
                                                 to="/lineBarHum"
                                                 selected={selected}
                                                 setSelected={setSelected}
                                                 icon={<TimelineOutlinedIcon/>}

                                          />
                                          
                                           <Item  
                                                 title='Garbage level Pie Chart'
                                                 to="/piechartlvgarbage"
                                                 selected={selected}
                                                 setSelected={setSelected}
                                                 icon={<DonutLargeIcon/>}

                                          />
                                           
                                         
                                   </Box>
                           </Menu>
                     </ProSidebar>)  : undefined

}
              </Box>
       )
}

export default SideBar