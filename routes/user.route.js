const userController = require('../controllers/user.controller')
const express = require('express')
const route = express.Router()

route.post("/", userController.createUser)
route.patch("/status/:id", userController.changeStatus)
route.delete("/:id", userController.deleteUser)
route.patch("/name/:id", userController.updateUserName)

module.exports = route