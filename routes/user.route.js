const userController = require('../controllers/user.controller')
const express = require('express')
const checkAuth = require('../middlewares/checkAuth.middleware')
const route = express.Router()

route.post("/", userController.createUser)


route.get("/", checkAuth, userController.getUserById)


route.patch("/status/:id", userController.changeStatus)
route.delete("/:id", userController.deleteUser)
route.patch("/name/:id", userController.updateUserName)

route.post("/register", userController.userRegister)

module.exports = route