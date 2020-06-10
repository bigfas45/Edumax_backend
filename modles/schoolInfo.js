const mongoose = require('mongoose')

const schoolInfoSchema = new mongoose.Schema(
    {

    name: {
        type: String,
        trim: true,
        required: true,
        unique: 32

    },
    telephone: {
        type: Number,
        trim: true
    },
   
    address: {
        type: String,
        maxlength: 2000
    },
    moto: {
        type: String,
        trim: true,
        maxlength: 32
    },
    open: {
        type: String,
        trim: true,
        maxlength: 32
    },
    close: {
        type: String,
        trim: true,
        maxlength: 32
    },
    referenceId: {
        type: String,
        trim: true
    },
    year: {
        type: String,
        trim: true,
        maxlength: 32
    },
    logo: {
        data: Buffer,
        contentType: String,
        path:String,
        name: String
    },
    
}, {timestamps: true}
);



module.exports = mongoose.model("SchoolInfo", schoolInfoSchema);