import './axios'
import axios from 'axios'

const creatorFilter = {
    creatorName: 'AndreaCasta'
}

export const getAlarms = async ()=>{
    try {
    const {data: listAlarms} = await axios.get('/alarms', { params: creatorFilter})
    return listAlarms
    } catch (error) {
        console.log({ErrorAlarms: error})
        return null
    }
}

export const getDataLogs = async ()=>{
    try {
    const {data: listDataLogs} = await axios.get('/datalogs', { params: creatorFilter})
    return listDataLogs
    } catch (error) {
        console.log({ErrorDataLogs: error})
        return null
    }
    
}
