import { secretMasterName, host, CREATOR_NAME } from '../config.js';
import awsIot from 'aws-iot-device-sdk';
import AWS from 'aws-sdk';
import mongoose from 'mongoose'
import * as os from 'os';
import datalogs from '../mongoose/datalogs.js'
import alarms from '../mongoose/alarms.js';
import fs from 'fs'
// setting aws region to connect
AWS.config.update({ region: 'eu-central-1' });

const alarmType = {
    OVER: 'over',
    UNDER: 'under'
}

const iot = new AWS.Iot();

let device;
console.log()
export function initDevice() { 
  
    device = awsIot.device({
        keyPath: `${os.tmpdir()}/${secretMasterName}.private.pem.key`,
        certPath: `${os.tmpdir()}/${secretMasterName}.certificate.pem.crt`,
        caPath: `${os.tmpdir()}/AmazonRootCA1.pem`,
        host: host
    });


    device.on('connect', function () {
        console.info('system connected to aws iot...');
        device.subscribe('machines');
        console.info('mqtt parser ready...');
    });

    device.on('error', function (e) {
        console.info({ e });
    });

    device.on('message', function (topic, payload) {
        console.info('message received');
        parser(payload.toString());
    });
}

function parser(message) {
    let objectMessage;
    try {
        objectMessage = JSON.parse(message);
    } catch (err) {
        console.error(`error parsing message: ${message}`);
    }

    console.log(objectMessage);

    const createAsync = async() => {
        const datalogMesg = await datalogs.create ({...objectMessage, creatorMessage: CREATOR_NAME})
        createAlarm(datalogMesg)
    }

    const createAlarm = async(datalogMesg)=>{
        
        if(datalogMesg.value > 20)
        await alarms.create ({
            logId: datalogMesg._id,
            status: 'start',
            creatorMessage :CREATOR_NAME,
            alarmType: alarmType.OVER,
            date_start:Date.now()
        }) 
    
        if(datalogMesg.value = 20){
        const allarm = await alarms.findOne(({status:'start'})).sort({data_start:-1});
        if (!allarm) return 
        else 
        console.log('stop')
        allarm.status = 'stop'
        allarm.date_end = Date.now()
        await allarm.save()
        } 

        if(datalogMesg.value < 20)
        await alarms.create ({
            logId: datalogMesg._id,
            creatorMessage :CREATOR_NAME,
            alarmType: alarmType.UNDER,
            date_start:Date.now()
        })


    }
    

    createAsync();
}

export function getElement(){
    
}