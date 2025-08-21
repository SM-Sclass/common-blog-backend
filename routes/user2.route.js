const express = require('express')
const route = express.Router()
const userController = require("../controllers/user.controller")
const authFunc = require("../middlewares/checkAuth2.middleware")

route.post("/", userController.createUser)
route.get("/", userController.getAllUsers)
route.patch("/", authFunc, userController.updateStatus)


module.exports = route