const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

exports.createUser = async (req, res) => {
    try {
        const bodyData = req.body
        if (!bodyData.name || !bodyData.email || !bodyData.password) {
            return res.status(400).json({ message: "Name, email and password is required" })
        }
        const existUser = await User.findOne({ email: bodyData.email })
        if (existUser) {
            return res.status(400).json({ message: "User with similar email already exist" })
        }

        const salt = 12
        const hashedPassword = await bcrypt.hash(bodyData.password, salt)


        bodyData.password = hashedPassword

        const newUser = await User.create(bodyData)
        console.log(newUser)
        return res.json(newUser)
    } catch (error) {
        return res.status(500).json({ error: error, message: "INTERNAL SERVER ERROR" })
    }

}


exports.getAllUsers = async (req, res) => {
    const users = await User.find()
    return res.json(users)
}

exports.updateStatus = async (req, res) => {
    try {
        const userId = req.user
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "USer not found" })
        }

        user.isActive = !user.isActive
        await user.save()

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" })
    }
}










































































// const User = require('../models/user.model')
// const bcrypt = require('bcrypt')

// exports.createUser = async (req, res) => {
//     try {
//         const bodyData = req.body
//         if (!bodyData.name.trim() || !bodyData.email.trim()) {
//             return res.status(400).json({ message: "Name and Email is required" })
//         }

//         // const newUser = await User.create(bodyData)
//         const newUser = new User(bodyData)
//         await newUser.save()

//         return res.status(201).json({ message: "Entry is created" })
//     } catch (error) {
//         console.log("API ERROR ", error)
//         return res.status(500).json({ message: error || "Internal server error" })
//     }
// }

// exports.getUserById =async(req, res) =>{
//     const id = req.user.id

//     const user = await User.findById(id)
//     if(!user){
//         return res.status(404).json({message :"User not found"})
//     }

//     return res.status(200).json(user)
// }

// exports.changeStatus = async (req, res) => {
//     try {
//         const id = req.params.id
//         const user = await User.findById(id)
//         if (!user) {
//             return res.status(404).json({ message: "User NOT FOUND" })
//         }
//         user.isActive = !user.isActive
//         await user.save()
//         return res.status(200).json({ message: "Status changed" })
//     } catch (error) {
//         console.log("API ERROR ", error)
//         return res.status(500).json({ message: error || "Internal server error" })
//     }
// }

// exports.deleteUser = async (req, res) => {
//     try {
//         const id = req.params.id
//         const user = await User.deleteOne({ _id: id })
//         if (!user) {
//             return res.status(404).json({ message: "USER NOT FOUND" })
//         }

//         return res.status(200).json({ message: "User deleted successfully", user })
//     } catch (error) {
//         console.log("API ERROR ", error)
//         return res.status(500).json({ message: error || "Internal server error" })
//     }
// }

// exports.updateUserName = async (req, res) => {
//     try {
//         const id = req.params.id
//         const bodyData = req.body
//         if (!bodyData.name.trim()) {
//             return res.status(400).json({ message: "Missing Name" })
//         }

//         const user = await User.findById(id)
//         if (!user) {
//             return res.status(404).json({ message: "USER NOT FOUND" })
//         }
//         user.name = bodyData.name
//         await user.save()
//         return res.status(200).json({ message: "name updated", user })
//     } catch (error) {
//         console.log("API ERROR ", error)
//         return res.status(500).json({ message: error || "Internal server error" })
//     }
// }

// exports.userRegister = async (req, res) => {
//     try {
//         const bodyData = req.body
//         if (!bodyData.name || !bodyData.email || !bodyData.password) {
//             return res.status(400).json({ message: "Name, email and password is required" })
//         }

//         const salt = 10
//         const hashPassword = await bcrypt.hash(bodyData.password, salt)

//         console.log("HASHED PASSWORD --------------------------> ", hashPassword)
//         const newBody = {...bodyData, password:hashPassword}
//         // const newBody = bodyData
//         // newBody.password = hashPassword

//         const user = await User.create(newBody)
//         console.log("NEW USer -------------> ", user)

//         return res.status(201).json({message : "User registered successfully", user})

//     } catch (error) {
//         console.log("API ERROR ", error)
//         return res.status(500).json({ message: error || "Internal server error" })
//     }
// }