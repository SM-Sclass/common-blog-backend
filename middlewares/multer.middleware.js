const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, './temp/uploads/')
    },
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`) // temp/uploads/2082025778888-logo.png
    }
})

module.exports = multer({storage})