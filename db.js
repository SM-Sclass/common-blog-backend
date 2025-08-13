const mongoose = require('mongoose')
const connectdb = () =>{
    if(!process.env.MONGO_URI){
        console.log(process.env.MONGO_URI , "URI not present")
        return
    
    }
    mongoose.connect(process.env.MONGO_URI)
    mongoose.connect("YOUR_MONGO_DB_URL")
}
connectdb()

module.exports = mongoose.connection