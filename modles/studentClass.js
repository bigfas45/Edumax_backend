const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const studentClassSchema = new mongoose.Schema(
  {
    parentClass: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentClass", studentClassSchema);
