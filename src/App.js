import {ColorModeContext , useMode } from "./theme" ;
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from './scenes/global/TopBar' 
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import SideBar from "./scenes/global/SideBar"
import Dashboard from "./scenes/dashboard";


import BarChart from "./components/BarChart";
import LineBarTemp from "./components/LineBarTemp";
import HumidityLineChart from "./components/HumLineChart";

import PieChartLvG from "./components/PieChartLvG";
import Login from "./scenes/login";




function App() {
  const [colorMode, theme]= useMode ();
  const currentUser =useContext(AuthContext)
  
  const ProtectedRoute= ({children})=>{
        if(!currentUser.currentUser){
          return <Navigate to='/login'/>
        }else{
          console.log(currentUser.currentUser);
        }
        return children
  }
  return ( 
    
   <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <SideBar />
          <main className="content">
            <TopBar/>
            <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} /> 
            <Route path="/login" element={<Login/>} /> 
              <Route path="/bar" element={<ProtectedRoute><BarChart/></ProtectedRoute>} />
              <Route path="/lineBarTemp" element={<ProtectedRoute><LineBarTemp/></ProtectedRoute>} />
              <Route path="/lineBarHum" element={<ProtectedRoute><HumidityLineChart/></ProtectedRoute>} />
              <Route path="/piechartlvgarbage" element={<ProtectedRoute><PieChartLvG/></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
    </ThemeProvider>   
   </ColorModeContext.Provider>
   
     
   
    
  );
}

export default App;
