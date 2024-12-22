import mongoose from "mongoose";

const facultySchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    passes:{
        type:Number,
        default:0,
        min:0,
        max:4
    }
},{timestamps:true});

const Faculty=mongoose.model("Faculty",facultySchema);

export {Faculty};