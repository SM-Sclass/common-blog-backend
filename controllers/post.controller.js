const BASE_URL = 'https://jsonplaceholder.typicode.com';
const User = require('../models/user.model')
{/*
    Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndReplace()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()
    */}

const getPosts = async (req, res) => {
    const response = await fetch(`${BASE_URL}/posts`,
        {
            method: "GET"
        })

    const data = await response.json()
    return res.json(data)
}

const getPostById = async (req, res) => {
    const id = req.params.idssss
    const response = await fetch(`${BASE_URL}/posts/${id}`)
    console.log("Here is the status code ", response.status)
    const data = await response.json()
    return res.status(200).json(data)
}

const createPost = async (req, res) => {
    const newBody = req.body
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(newBody),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    const data = await response.json()
    console.log("These is response status", response.status)
    return res.status(400).json(data)
}

const getUsers = async (req, res) =>{
    const Reqemail = req.query.email
    console.log(Reqemail)
    const users = await User.findOne({email:Reqemail })
    console.log(users)
    return res.json(users)
}

const getUserById = async (req, res)=>{
    const id = req.params.idsss
    const user = await User.findById(id)
    console.log(user)

    return res.json(user)
}

module.exports = { getPosts, getPostById, createPost, getUsers, getUserById}