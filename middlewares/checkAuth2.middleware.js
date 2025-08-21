const jwt = require('jsonwebtoken')

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        
        const userDetail = await jwt.verify(token, process.env.JWT_SECRET)
        const userId = userDetail.id
        
        if (!userId) {
            return res.status(401).json({ message: "User Identity missing" })
        }
        req.user = userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" })
    }
}

module.exports = checkAuth
