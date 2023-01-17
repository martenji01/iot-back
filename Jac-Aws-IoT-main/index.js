import { checkMasterCertificate } from "./iot/certManager.js";
import { initDevice } from "./iot/index.js";
import {databaseconnect} from "./mongoose/database.js"

import express from "express";

const app = express();

// connesione al db 
await databaseconnect ()

// downloading remote cert to connect
await checkMasterCertificate();

// connect to mqtt queue
await initDevice();

await databaseconnect ()

app.listen(9000, () => {
    console.log('Server listening on port 9000');
});