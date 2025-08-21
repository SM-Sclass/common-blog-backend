const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

const userRoute = require('./routes/user.route')
const blogRoute = require('./routes/blog.route')
const authRoute = require('./routes/auth.route')
dotenv.config({
    path:'.env'
})

const db = require('./db') // mongoose.connection

const port = 5000

app.use(cors({
    origin:"*"
}))

app.use(bodyParser.json())
app.get("/", (req, res)=>{
    return res.send("These is / route")
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)
app.use("/auth", authRoute)


db.on('error', (err)=>{
    console.log(`Some error has occured ${err}`)
})
app.listen(port, (err) => {
    if(err) console.log(err)
    console.log("Server running on port 5000")
})



