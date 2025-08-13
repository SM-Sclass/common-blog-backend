const express = require("express")
const route = express.Router()
const blogController = require("../controllers/blog.controller")

route.post("/", blogController.createBlog)
route.get("/", blogController.getBlogs)

module.exports = route