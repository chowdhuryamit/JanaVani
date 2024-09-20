import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));


//import all routes
import userRoutes from "./routes/user.routes.js";

app.use('/',userRoutes);


export {app};

