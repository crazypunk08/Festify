import mongoose,{Schema} from "mongoose";

const alumnischema=new Schema({
    username:{
       type:String,
       unique:true,
       trim:true,
       lowercase:true,
       required:true,
       index:true //this enables faster search operation
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    qrGenerated:{
        type:Boolean,
        default:false
    },
    qrVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export const Alumni=mongoose.model("Alumni",alumnischema);