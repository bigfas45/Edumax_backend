const mongoose = require('mongoose')
const uploadFileSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
   
    
    file: {
        data: Buffer,
        contentType: String,
        path:String,
        name: String
    }
    
}, {timestamps: true}
);



module.exports = mongoose.model("UploadFile", uploadFileSchema);