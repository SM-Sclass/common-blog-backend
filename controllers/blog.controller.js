// const Blog = require('../models/blog.model')

// exports.createBlog = async(req, res) =>{
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























const Blog = require('../models/blog.model')

exports.createBlog = async(req, res) =>{
    try {
        const bodyData = req.body
        if(!bodyData.title || !bodyData.content){
            return res.status(400).json({message: 'Please fill all fields.'})
        }

        console.log(bodyData)

        const newBlog = await Blog.create(bodyData)
        res.status(201).json({message: 'Blog created successfully.', data: newBlog})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error || "Internal server error"})
    }
}

exports.getBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find().populate("userId").select({
            title: 1,
            content: 1,
            userId: 1,

        })
        res.status(200).json({message: 'Blogs fetched successfully.', data: blogs})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error || "Internal server error"})
    }
}