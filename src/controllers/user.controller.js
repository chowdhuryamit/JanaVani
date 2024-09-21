import {User} from "../models/user.models.js";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/uploadAsset.js";


const generateAccessTokenFunction=async(userId)=>{
    const user=await User.findById(userId);
    const accessToken=user.generateAccessToken();
    return accessToken;
}


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

const signup=async(req,res)=>{
   const {username,email,password,fullname}=req.body;
   if (username===""||email===""||password===""||fullname==="") {
     return res.render('signup',{
        err:"all fields are required"
     })
   }

   let avatarLocalPath,coverImageLocalPath
   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
   }
   if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
     avatarLocalPath = req.files.avatar[0].path;
   }

   if (!avatarLocalPath || !coverImageLocalPath) {
    if (avatarLocalPath) {
       fs.unlinkSync(avatarLocalPath);
    }
    if (coverImageLocalPath) {
        fs.unlinkSync(coverImageLocalPath);
    }
    return res.render('signup',{
        err:"avatar and cover image is required"
    })
   }

   const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });


  if (existingUser) {
    if (avatarLocalPath) {
        fs.unlinkSync(avatarLocalPath);
     }
     if (coverImageLocalPath) {
         fs.unlinkSync(coverImageLocalPath);
     }
    return res.render('signup',{
        err:"user already exist try different username or email"
    })
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar||!coverImage) {
    return res.render('signup',{
        err:"avatar and cover image is not uploaded successfully"
    })
  }

  const user=await User.create({
    username:username.toLowerCase(),
    email:email.toLowerCase(),
    password:password,
    fullname:fullname,
    avatar:avatar.url,
    coverImage:coverImage.url
  })

  const accessToken=await generateAccessTokenFunction(user._id);

  const options={
    httpOnly:true,
    secure:true,
  }

  return res.cookie('accessToken',accessToken,options).redirect('/');
}


const signin=async(req,res)=>{
    const {email,password}=req.body;
    
    if (email===""||password==="") {
        return res.render('signin.ejs',{
            err:'email and password is required'
        })
    }

    const user=await User.findOne({email});

    if (!user) {
      return res.render('signin.ejs',{
        err:'User does not exist'
    })
    }

    const validPassword=await user.isPasswordCorrect(password);

    if (!validPassword) {
      return res.render('signin.ejs',{
        err:'Invalid password'
    })
    }

    const accessToken=await generateAccessTokenFunction(user._id);

    const options={
      httpOnly:true,
      secure:true,
    }

    return res.cookie('accessToken',accessToken,options).redirect('/');

}
export{
    landing,
    renderSignup,
    renderSignin,
    signup,
    signin
}