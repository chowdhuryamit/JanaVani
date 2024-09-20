import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure:true
})

const uploadOnCloudinary=async(fileLocalPath)=>{
    try {
        if (fileLocalPath) {
            const response=await cloudinary.uploader.upload(fileLocalPath,{
                asset_folder: 'JanaVani',
                resource_type:"auto"
            })
            fs.unlinkSync(fileLocalPath);
            return response;
        }
        else{
            fs.unlinkSync(fileLocalPath);
            return null;
        }
    } catch (error) {
        fs.unlinkSync(fileLocalPath);
        return null;
    }
}

export{
    uploadOnCloudinary
}