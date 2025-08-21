const cloudinary = require("cloudinary").v2
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const uploadtoCloudinary = async(localPath) =>{
    try {
        const response = await cloudinary.uploader.upload(localPath)
        fs.unlink(localPath)

        return response
    } catch (error) {
        console.log(error)
        throw new Error("INTERNAL SERVER ERROR from cloudinary upload")
    }
}

module.exports = uploadtoCloudinary