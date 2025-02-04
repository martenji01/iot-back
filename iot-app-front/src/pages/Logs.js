import React, { useEffect, useState, useRef } from 'react'
import { Grid, Button} from "@mui/material"
import { getDataLogs } from '../api/request.js'
import ChartLine from '../components/ChartLine.js';
import {datalog_properties} from '../utils/const.js'

const Logs = () => {
    const [list, setList] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
          setLogsData()
        }, 10000);
    
        return () => clearInterval(interval);
      }, []);

    const setLogsData = async ()=>{
        const list = await getDataLogs()
        console.log('updating logs')
        setList(list)
    }

    useEffect(()=>{
        setLogsData()
    }, [])

    useEffect(()=>{
        console.log({list})
    }, [list])

  return (
    <Grid container spacing={3} padding={3}>
        <Grid item xs={12} md={6}><ChartLine list={list} title={'Hum'} property={[datalog_properties.hum]} /></Grid>
        <Grid item xs={12} md={6} ><ChartLine list={list} title={'Values'} property={[datalog_properties.value]} /></Grid>
        <Grid item xs={12}><ChartLine list={list} title={'Hum and Values'} property={[datalog_properties.hum, datalog_properties.value]} /></Grid>
    </Grid>

  )
}











export default Logs