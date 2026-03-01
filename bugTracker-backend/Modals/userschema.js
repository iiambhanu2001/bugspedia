import mongoose from "mongoose"

const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        defualt:"user",
    }
},{timestamps:true})


export default mongoose.model("User",Userschema)