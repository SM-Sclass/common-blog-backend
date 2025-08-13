// const User = require('../models/user.model')

// exports.createUser = async(req, res)=>{
//     const bodyData = req.body
//     const newUser = await User.create(bodyData)
//     console.log(newUser)
//     return res.json(bodyData)
// }

// exports.getAllUsers = async(req, res)=>{
//     const users = await User.find()
//     return res.json(users)
// }

// exports.updateStatus = async (req, res)=>{
//     const id = req.params.id
//     const user = await User.findById(id)
//     if(!user){
//         return res.status(404).json({message : "USer not found"})
//     }

//     user.isActive = !user.isActive
//     await user.save()

//     return res.json(user)
// }










































































const User = require('../models/user.model')

exports.createUser = async(req, res)=>{
    try {
        const bodyData = req.body
        if(!bodyData.name.trim() || !bodyData.email.trim()){
            return res.status(400).json({message: "Name and Email is required"})
        }

        // const newUser = await User.create(bodyData)
        const newUser = new User(bodyData)
        await newUser.save()
           
        return res.status(201).json({message: "Entry is created"})
    } catch (error) {
        console.log("API ERROR ", error)
        return res.status(500).json({message: error || "Internal server error"})
    }
}

exports.changeStatus= async(req, res) =>{
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({message:"User NOT FOUND"})
        }
        user.isActive = !user.isActive
        await user.save()
        return res.status(200).json({message: "Status changed"})
    } catch (error) {
        console.log("API ERROR ", error)
        return res.status(500).json({message: error || "Internal server error"})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.deleteOne({_id:id})
        if(!user){
            return res.status(404).json({message: "USER NOT FOUND"})
        }

        return res.status(200).json({message: "User deleted successfully", user})
    } catch (error) {
        console.log("API ERROR ", error)
        return res.status(500).json({message: error || "Internal server error"})
    }
}

exports.updateUserName = async(req, res) =>{
    try {
        const id = req.params.id
        const bodyData = req.body
        if(!bodyData.name.trim()){
            return res.status(400).json({message:"Missing Name"})
        }

        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({message:"USER NOT FOUND"})
        }
        user.name = bodyData.name
        await user.save()
        return res.status(200).json({message: "name updated", user})
    } catch (error) {
        console.log("API ERROR ", error)
        return res.status(500).json({message: error || "Internal server error"})
    }
}