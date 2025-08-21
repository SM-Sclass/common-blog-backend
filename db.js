const mongoose = require('mongoose')
const connectdb = () =>{
    if(!process.env.MONGO_URI){
        console.log(process.env.MONGO_URI , "URI not present")
        return
    
    }
    mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo db connected successfully")
}
connectdb()

module.exports = mongoose.connection