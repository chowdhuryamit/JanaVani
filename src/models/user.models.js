import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

userSchemma.pre("save",async function(next){
   if(this.isModified("password")){
     this.password=await bcrypt.hash(this.password,10);
     next();
   }
})

userSchemma.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchemma.methods.generateAccessToken=async function(){
    return jwt.sign({
        id:this._id,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

const User=mongoose.model("User",userSchemma);

export{
    User
}

