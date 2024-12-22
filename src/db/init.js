// Caution:This file Erases and completely reintialises the database
import dotenv from "dotenv";
dotenv.config({
    path: "../../.env"
});
import { students } from "./data.js";
import { Student } from "../models/student.models.js";
import { Faculty } from "../models/faculty.models.js";
import connectdatabase from "./index.js";

connectdatabase();

//function
const initdb=async()=>{
    await Faculty.deleteMany({});
    const data= await Faculty.insertMany(students);
    console.log("Mass import Successfull");
};

initdb();



