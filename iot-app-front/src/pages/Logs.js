import React, { useEffect, useState } from 'react'
import { Grid, Button} from "@mui/material"
import { getDataLogs } from '../api/request.js'
import ChartLine from '../components/ChartLine.js';


const datalog_properties = {
    timestamp: 'timestamp',
    value: 'value',
    hum: 'hum'
}

const Logs = () => {
    const [list, setList] = useState(null)

    const setLogsData = async ()=>{
        const list = await getDataLogs()
        setList(list)
    }

    useEffect(()=>{
        setLogsData()
    }, [])

    useEffect(()=>{
        console.log({list})
    }, [list])

  return (
    <Grid container spacing={3}>
        <Grid item xs={12}> <Button variant="contained" onClick={()=>setLogsData()}>Refresh</Button> </Grid>
        <Grid item xs={12} md={6}><ChartLine list={list} title={'Hum'} property={[datalog_properties.hum]} /></Grid>
        <Grid item xs={12} md={6} ><ChartLine list={list} title={'Values'} property={[datalog_properties.value]} /></Grid>
        <Grid item xs={12}><ChartLine list={list} title={'Hum and Values'} property={[datalog_properties.hum, datalog_properties.value]} /></Grid>
    </Grid>

  )
}











export default Logs