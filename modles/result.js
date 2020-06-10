const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ResultSchema = new mongoose.Schema(
  {
    
    student: {
        type: ObjectId,
        ref: "User",
        maxlength: 32
      },

    childClass: {
      type: ObjectId,
      ref: "StudentClass",
      maxlength: 32
    },

    teacher: {
      type: ObjectId,
      ref: "User",
      maxlength: 32
    },

    subject: {
        type: ObjectId,
        ref: "Subject",
        maxlength: 32
      },

      continuous_assessment: {
        type: Number,
        trim: true,
        maxlength: 32,
      },

      exam_score: {
        type: Number,
        trim: true,
        maxlength: 32,
      },

      total: {
        type: Number,
        trim: true,
        maxlength: 32,
      }




  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", ResultSchema);
