

import mongoose from 'mongoose' 


export function databaseconnect () {

mongoose.connect("mongodb://localhost:27017/aws", {
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