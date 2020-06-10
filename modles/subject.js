const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    
    },

    classParent: {
      type: ObjectId,
      ref: "StudentClass",
      required: true,
      maxlength: 32
    },

    teacher: {
      type: ObjectId,
      ref: "User",
      required: true,
      maxlength: 32
    },
    level: {
        type: String,
        trim: true,
        maxlength: 32,
     
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
