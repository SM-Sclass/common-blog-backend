const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoute = require('./routes/user.route')
const blogRoute = require('./routes/blog.route')
dotenv.config({
    path:'.env'
})

const db = require('./db') // mongoose.connection

const port = 5000

const app = express()
app.use(cors({
    origin:"*"
}))

app.use(express.json())
app.get("/", (req, res)=>{
    return res.send("These is / route")
})
app.use("/user", userRoute)
app.use("/blog", blogRoute)


db.on('error', (err)=>{
    console.log(`Some error has occured ${err}`)
})
app.listen(port, (err) => {
    if(err) console.log(err)
    console.log("Server running on port 5000")
})



