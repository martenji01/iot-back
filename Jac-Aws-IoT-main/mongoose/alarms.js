/*
create another entity alarms that start if a sensor send
a value greater than 20 C and end if sensor
send a value below 20 
*/

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const alarmSchema = new Schema({
    logId: {type: mongoose.Schema.Types.ObjectId, ref: 'datalogs'},
    creatorMessage: String,
    status: {
        type: String,
        enum: ['start', 'stop']
    },
    alarmType: {
        type: String,
        enum: ['over', 'under']
    },
    date_start: {
        type: Date, 
        default: Date.now
    },
  
    date_end: {
        type: Date,
    }
});

const model = mongoose.model("alarms", alarmSchema);

const alarms = model

 export  default  alarms




