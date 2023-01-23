import Alarms from "./pages/Alarms";
import Logs from "./pages/Logs";
import {Container } from '@mui/material'
const App = ()=>{
  return (
    <Container maxWidth="xl" className="App">
      <Logs />
      <Alarms />
    </Container>
  );
}

export default App;
