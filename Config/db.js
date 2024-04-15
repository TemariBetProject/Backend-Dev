  const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')

//const uri ="mongodb+srv://User_1:user1234@<cluster-url>?retryWrites=true&writeConcern=majority";

 const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/Temaribet')
 connection.on('open', () => {
   console.log('MongoDB connected');
});

connection.on('error', (error) => {
   console.error('Connection Error:', error);
});

 module.exports = connection

 //This is my db.js file