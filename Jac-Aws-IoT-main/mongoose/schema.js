
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const datalogSchema = new Schema({

    
    timestamp: Number,
    hum: Number,
    value: Number,
    free_ram: Number,
    total_ram: Number,
    sensorCode: String,
    creatorName: String
});

const model = mongoose.model("datalogs", datalogSchema);

const datalogs = model

 export  default  datalogs




