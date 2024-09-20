import {User} from "../models/user.models.js";

const landing=async(req,res)=>{
   if (!req.user) {
     return res.render('landingPage.ejs');
   }
   else{
    return res.render('home.ejs');
   }
}

const renderSignup=async(req,res)=>{
    return res.render('signup.ejs');
}

const renderSignin=async(req,res)=>{
    return res.render('signin.ejs');
}

export{
    landing,
    renderSignup,
    renderSignin
}