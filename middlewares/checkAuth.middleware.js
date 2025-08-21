const jwt = require('jsonwebtoken')

const checkAuth = async(req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer ejghio.......
        //[Bearer, evjh.........]
        if(!token){
            return res.status(401).json({message: 'Unauthorized'})
        }

        const jwtPayload = await jwt.verify(token, process.env.JWT_SECRET)
        if(!jwtPayload){
            return res.status(401).json({message: 'Unauthorized'})
        }

        req.user = jwtPayload
        {/*
        {
            id:"kkkkk",
            name:"sumit"    
        }
            */}

        next()
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}

module.exports = checkAuth