import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"

dotenv.config()


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary  = async(localFilePath)=>{

    if(!localFilePath){
        return null
    }


    try {
    const response =    await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})

       try {
      fs.unlinkSync(localFilePath);
    } catch (err) {
      console.log(" Failed to delete local file:", err.message);
    }

     return response;


    } catch (error) {
        console.error("❌ Cloudinary upload error:", error.message);
   


    
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (err) {
        console.warn("⚠️ Failed to delete local file after error:", err.message);
      }
    }

      throw new Error(`Cloudinary upload failed: ${error.message || "Unknown error"}`);
    

     }


}



export default uploadOnCloudinary