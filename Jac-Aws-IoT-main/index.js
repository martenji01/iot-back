import { checkMasterCertificate } from "./iot/certManager.js";
import { initDevice } from "./iot/index.js";
import {databaseconnect} from "./mongoose/database.js"
import cors from "cors"
import express from "express";
import Datalogs from './mongoose/datalogs.js'
import Alarms from './mongoose/alarms.js'

await checkMasterCertificate();

await initDevice();

const app = express();

app.use(cors())

// connesione al db 
await databaseconnect ()

// downloading remote cert to connect


// connect to mqtt queue


await databaseconnect ()

app.use(express.json());

// api GET  data
app.get("/datalogs", async (req, res) => {
  const filters = req.query
  console.log({filters})
  const allData = await Datalogs.find(filters);
  return res.status(200).json(allData);
});

app.get("/alarms", async (req, res) => {
  const filters = req.query
  console.log({filters})
  const allData = await Alarms.find(filters)

  return res.status(200).json(allData);
});

app.listen(9000, () => {
    console.log('Server listening on port 9000');
});





