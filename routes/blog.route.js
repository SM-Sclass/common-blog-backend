const express = require("express")
const route = express.Router()
const blogController = require("../controllers/blog.controller")
const checkAuth = require("../middlewares/checkAuth.middleware")
const upload = require("../middlewares/multer.middleware")

route.post("/", checkAuth, upload.single("image_url") , blogController.createBlog) // formdata


route.get("/", blogController.getBlogs)
route.get("/UserBlogs", checkAuth, blogController.getBlogByUserId)


// getting blog data by its id
route.get("/:id", blogController.getBlogById)

//updating blog with id
route.put("/:id", blogController.updateBlog)

module.exports = route