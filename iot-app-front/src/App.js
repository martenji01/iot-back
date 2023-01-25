import Alarms from "./pages/Alarms";
import Logs from "./pages/Logs";
import AppBarCustom from './components/AppBarCustom'
import {Container, Button } from '@mui/material'
import { useState, useEffect } from "react"
import './css/App.css'

const App = ()=>{
  const [openAlarmMenu, setOpenAlarmMenu] = useState(false)

  useEffect(() => {
    console.log({openAlarmMenu})
  }, [openAlarmMenu])
  
  return (
    <Container maxWidth="xl" className="App" disableGutters>
      <AppBarCustom />
      <Logs />
    </Container>
  );
}

export default App;
