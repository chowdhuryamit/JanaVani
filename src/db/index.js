import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB=async()=>{
    try {
        const connectionInstances=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`mongodb connected!!DB_HOST:${connectionInstances.connection.host}`);
    } catch (error) {
        console.log('error occured while connecting database',error)
        process.exit(1);
    }
}

export default connectDB;