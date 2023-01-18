import { checkMasterCertificate } from "./iot/certManager.js";
import { initDevice } from "./iot/index.js";
import {databaseconnect} from "./mongoose/database.js"
import express from "express";
import Datalogs from './mongoose/schema.js'

const app = express();

// connesione al db 
await databaseconnect ()

// downloading remote cert to connect
await checkMasterCertificate();

// connect to mqtt queue
await initDevice();

await databaseconnect ()

app.use(express.json());

// api GET  data
app.get("/data", async (req, res) => {
  const allData = await Datalogs.find();
  return res.status(200).json(allData);
});

app.listen(9000, () => {
    console.log('Server listening on port 9000');

});





