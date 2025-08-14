const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    avatar: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    isActive: { type: Boolean, default: true }
})


module.exports = mongoose.model("User", userSchema)
































// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     name: { type: String, default: "New_User", required: true },
//     dob: { type: Date, required: false },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: false },
//     password: { type: String, required: false },
//     isActive: { type: Boolean, default: true }
// })

// module.exports = mongoose.model("User", userSchema)