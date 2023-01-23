import React, { useEffect, useState } from 'react'
import { Alert } from "@mui/material"
import {severityLevel, alarmStatus, alarmType} from '../utils/const.js'

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
            
    }, [alarm])
  return (
    <Alert severity={severityLevel[alarm.alarmType] || 'warning'}>{message} : {status} ({ alarm.date_start|| 'data'})</Alert>
  )
}


export default Alarm