import mongoose from "mongoose";

const userSchemma=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        unique:true,
        trim:true,
    },
    avatar:{
        type:String,
    },
    coverImage:{
        type:String,
    }
},{timestamps:true});

