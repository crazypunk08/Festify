import app from "./app.js"
// require('dotenv').config({path:`./env`});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import ejsMate from "ejs-mate";

dotenv.config({
    path:`./env`
})

 connectDB()  //This will return a Promise
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Listening to port ${process.env.PORT || 8000}`);
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed",err);
})