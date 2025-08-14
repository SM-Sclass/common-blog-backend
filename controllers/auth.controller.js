const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const bodyData = req.body

        if (!bodyData.email || !bodyData.password) {
            return res.status(400).json({ message: "Email and password is required" })
        }

        const user = await User.findOne({ email: bodyData.email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const hashedPasswordInDb = user.password

        const isMatched = await bcrypt.compare(bodyData.password, hashedPasswordInDb)
        if (!isMatched) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const jwtPayload = {
            id: user._id,
            name: user.name
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not set" })
        }

        const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        return res.status(200).json({message : "Logged in successfully", token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" })
    }


}