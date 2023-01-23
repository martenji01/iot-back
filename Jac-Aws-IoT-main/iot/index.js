import { secretMasterName, host, CREATOR_NAME } from '../config.js';
import awsIot from 'aws-iot-device-sdk';
import AWS from 'aws-sdk';
import mongoose from 'mongoose'
import * as os from 'os';
import datalogs from '../mongoose/datalogs.js'
import alarms from '../mongoose/alarms.js';

// setting aws region to connect
AWS.config.update({ region: 'eu-central-1' });

const alarmType = {
    OVER: 'over',
    UNDER: 'under'
}

const iot = new AWS.Iot();

let device;

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
    }

    const createAlarm = async()=>{
        if(datalogMesg.value > 20)
            await alarms.create ({
                logId: datalogMesg._id,
                creatorMessage :CREATOR_NAME,
                alarmType: alarmType.OVER
            })
        
            if(datalogMesg.value < 20)
            await alarms.create ({
                logId: datalogMesg._id,
                creatorMessage :CREATOR_NAME,
                alarmType: alarmType.UNDER
            })
    }
    createAsync();
}

export function getElement(){
    
}