const mongoose = require('mongoose')
const connectdb = () =>{
    if(!process.env.MONGO_URI){
        console.log(process.env.MONGO_URI , "URI not present")
        return
    
    }
    mongoose.connect(process.env.MONGO_URI)
    // mongoose.connect("mongodb+srv://Asus:$UM!T376@cluster0.vvhlsc0.mongodb.net/static-express")
}
connectdb()

module.exports = mongoose.connection