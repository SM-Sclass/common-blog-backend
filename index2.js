const express = require('express')
const cors = require('cors')
const userController = require('./controllers/user.controller')
const blogController = require('./controllers/blog.controller')
const db = require("./db")
const app = express()
const port = 5000

app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.post("/user", userController.createUser)
app.get("/users", userController.getAllUsers)
app.patch("/user/:id", userController.updateStatus)
app.post("/blog", blogController.createBlog)
app.get("/blogs", blogController.getAllBlogs)


db.on("error", (err)=>{
    console.log(err)
})
app.listen(port, () => {
    console.log(
        `Localhost Server running on port ${port}`
    )
})



