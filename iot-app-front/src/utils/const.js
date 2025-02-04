import moment from 'moment'
export const datalog_properties = {
    timestamp: 'timestamp',
    value: 'value',
    hum: 'hum'
}

export const severityLevel ={
    over: 'error',
    under: 'info'
}

export const alarmType ={
    over: 'over',
    under: 'under'
}


export const alarmStatus ={
    start: 'start',
    stop: 'stop'
}

export const convertTimestamp = (unix_timestamp)=>{
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
  }

export const fromTimestampToDate = (timestamp)=>{
    return moment.unix(timestamp).format("HH:mm:ss")
}

export const fromISOtoDate = (date)=>{
    return moment(date).format('DD-MM-YYYY HH:mm:ss')
}