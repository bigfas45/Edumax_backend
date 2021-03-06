const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require('uuid/v1');
const { ObjectId } = mongoose.Schema;


const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },

    lastname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32
    },

    studentClass: {
      type: ObjectId,
      ref: "StudentClass"
    },

    schoolId: {
      type: ObjectId,
      ref: "SchoolInfo"
    },

    hashed_password: {
      type: String,
      required: true
    },
    house: {
      type: String,
      trim: true,
      maxlength: 32
    },
    age: {
      type: Number,
      trim: true,
      maxlength: 32
    },

    salt: String,

    role: {
      type: Number,
      default: 0
    },

    sex: {
      type: String,
      trim: true,
      maxlength: 32
    },

    verification: {
      type: Number,
      default: 1
    },
    
  },
  { timestamps: true }
);

// virtual field

userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {

    authenticate: function(plainText){

        return this.encryptPassword(plainText) === this.hashed_password
        
    },


    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest("hex");
        } catch (err){
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);