// const Blog = require('../models/blog.model')

// exports.createBlog = async(req, res) =>{
//     const token = req.headers.authorization
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" })
//     }
//     const JWT_SECRET = "static_15/08/4:06"
//     const userDetail = await jwt.verify(token, JWT_SECRET)
//     const userId = userDetail.id

//     const bodyData =  req.body
//     if(!bodyData.title || !bodyData.content || !bodyData.userId){
//         return res.status(400).json({message: "Title, content and userID is required"})
//     }

//     const newBlog = await Blog.create(bodyData)
//     return res.status(201).json({message:"BLog created successfully", newBlog})
// }


// exports.getAllBlogs= async(req, res)=>{
//     const blogs = await Blog.find()
//     return res.status(200).json(blogs)
// }

// exports.getBlogById = async(req, res)=>{

//     const id = req.params.id
//     const blog = await Blog.findById(id)
//     return res.status(200).json(blog)
// }

// exports.updateBlog = async(req, res)=>{

//     const id = req.params.id
//     const bodyData =  req.body
//     const updatedBlog = await Blog.findByIdAndUpdate(id, bodyData, {new: true})
//     return res.status(200).json({message:"Blog updated", updatedBlog})
// }




















// mutler --> formData ----> uploadserver ---> req.body (text data)
const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const uploadtoCloudinary = require("../utils/cloudinary")

exports.createBlog = async (req, res) => {
    try {
        const bodyData = req.body
        const imageFile = req.file

        if (!bodyData.title || !bodyData.content) {
            return res.status(400).json({ message: 'Please fill all fields.' })
        }

        bodyData.userId = req.user.id
        const cloudResponse = await uploadtoCloudinary(imageFile.path)
        bodyData.image_url = cloudResponse.secure_url

        const newBlog = await Blog.create(bodyData)
        res.status(201).json({ message: 'Blog created successfully.', data: newBlog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("userId").select({
            title: 1,
            content: 1,
            userId: 1,
            image_url: 1

        })
        res.status(200).json({ message: 'Blogs fetched successfully.', data: blogs })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.getBlogByUserId = async (req, res) => {
    try {
        const userIdfromToken = req.user.id
        const userUploadedBlogs = await Blog.find({ userId: userIdfromToken })
        res.status(200).json({ message: 'Blogs fetched successfully.', data: userUploadedBlogs })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }

        return res.status(200).json(blog)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const id = req.params.id
        const bodyData = req.body
        const updatedBlog = await Blog.findByIdAndUpdate(id, bodyData, { new: true })
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found for updating" })
        }

        return res.status(200).json(updatedBlog)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}