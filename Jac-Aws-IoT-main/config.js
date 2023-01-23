// env reading package
import * as dotenv from 'dotenv';

dotenv.config()

const secretMasterName = process.env.SECRET_MASTER_NAME;
const secretMasterUrl = process.env.SECRET_MASTER_URL;
const host = process.env.HOST;
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI_MINE = process.env.MONGODB_URI_MINE
const CREATOR_NAME = process.env.CREATOR_NAME

export { secretMasterName, secretMasterUrl, host, MONGODB_URI, MONGODB_URI_MINE, CREATOR_NAME }