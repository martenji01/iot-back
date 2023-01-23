import mongoose from 'mongoose' 
import { MONGODB_URI_MINE } from '../config.js'

export function databaseconnect () {

mongoose.connect(MONGODB_URI_MINE, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });
  
  mongoose.connection.on('connected', () => {
    console.info('MongoDB connected');
  });

}