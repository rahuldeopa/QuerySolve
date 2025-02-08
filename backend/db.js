const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://rahuldeopa18:3iUyo2HsGn1IXFvZ@cluster0.8pmk1.mongodb.net/";

const connectToMongo = () =>{
    mongoose.connect(process.env.mongoURI || mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;
