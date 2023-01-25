import React, { useEffect, useState } from 'react'
import { Grid} from "@mui/material"
import { getAlarms } from '../api/request.js'
import Alarm from '../components/Alarm.js'

const Alarms = ({parentAlarmsNumber}) => {
  const [list, setList] = useState(null)

    const setListAlarms = async ()=>{
        const list = await getAlarms()
        setList(list)
    }

    useEffect(()=>{
      setListAlarms()
    }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        setListAlarms()
      }, 10000);
  
      return () => clearInterval(interval);
    }, []);

    useEffect(()=>{
        console.log({list})
        if(list && list.length > 0)
          parentAlarmsNumber(list.length)
    }, [list])

  return (
    <Grid container maxWidth={'sm'} spacing={2}>
        {list && list.length > 0 && list.map((alarm)=>
          <Grid item key={alarm._id} xs={12}><Alarm alarm={alarm} /></Grid>
        )}
    </Grid>
  )
}

export default Alarms