const express = require("express")
const route = express.Router()
const blogController = require("../controllers/blog.controller")

route.post("/", blogController.createBlog)
route.get("/", blogController.getBlogs)

// getting blog data by its id
route.get("/:id", blogController.getBlogById)

//updating blog with id
route.put("/:id", blogController.updateBlog)

module.exports = route