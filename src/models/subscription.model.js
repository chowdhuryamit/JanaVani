import mongoose, { Schema } from "mongoose";

const subscriptionSchemma=new mongoose.Schema({
    following:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    follower:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Subscription=mongoose.model('Subscription',subscriptionSchemma);

export{
    Subscription
}