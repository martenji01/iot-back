import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle } from "@mui/material"
import {severityLevel, alarmStatus, alarmType, fromISOtoDate} from '../utils/const.js'

const Alarm = ({alarm}) => {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [dateStart, setDateStart] = useState(null)
    
    useEffect(()=>{
        console.log(alarm)
        if(alarm.alarmType === alarmType.over)
            setMessage("Temperature over 20")
        else
            setMessage("Temperature under 20")
        
        if(alarm.status){
            if(alarm.status === alarmStatus.start)
                setStatus("Started")
            else
                setStatus("Stopped")
        }

        if(alarm.date_start)
            setDateStart(fromISOtoDate(alarm.date_start))
            
    }, [alarm])
  return (
    <Alert severity={severityLevel[alarm.alarmType] || 'warning'}>
        <AlertTitle>{message}</AlertTitle>
          {status} at ({ dateStart|| 'data'})</Alert>
  )
}


export default Alarm