const dotenv = require('dotenv')
dotenv.config({
    path:'.env'
})
const express = require('express')
const cors = require('cors')
const userRoute = require("./routes/user2.route")
const authController = require('./controllers/auth.controller')
const blogController = require('./controllers/blog.controller')
const authFunc = require('./middlewares/checkAuth2.middleware')
const db = require("./db")
const app = express()
const port = 5000

app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use("/user", userRoute)

app.post("/blog", authFunc, blogController.createBlog)
app.get("/blogs", blogController.getAllBlogs)

app.post("/auth/login", authController.login)


app.get("/blog/:id",authFunc, blogController.getBlogById)
app.put("/blog/:id", authFunc, blogController.updateBlog)



db.on("error", (err)=>{
    console.log(err)
})
app.listen(port, () => {
    console.log(
        `Localhost Server running on port ${port}`
    )
})



