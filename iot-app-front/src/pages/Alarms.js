import React, { useEffect, useState } from 'react'
import { Grid, Button} from "@mui/material"
import { getAlarms } from '../api/request.js'
import Alarm from '../components/Alarm.js'

const Alarms = () => {
  const [list, setList] = useState(null)

    const setListAlarms = async ()=>{
        const list = await getAlarms()
        setList(list)
    }

    useEffect(()=>{
      setListAlarms()
    }, [])

    useEffect(()=>{
        console.log({list})
    }, [list])

  return (
    <Grid container spacing={3}>
        <Grid item xs={12}> <Button variant="contained" onClick={()=>setListAlarms()}>Refresh</Button> </Grid>
        
        {list && list.length > 0 && list.map((alarm)=>
          <Grid item key={alarm._id} xs={12} md={6}><Alarm alarm={alarm} /></Grid>
        )}
    </Grid>
  )
}

export default Alarms