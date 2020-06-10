const User = require("../modles/users");
const StudentClass = require("../modles/studentClass");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.classById = (req, res, next, id) => {
  StudentClass.findById(id)
    .populate("childClass")
    .populate("teacher")
    .exec((err, studentClass) => {
      if (err || !studentClass) {
        return res.status(400).json({
          error: "Class does not exsit"
        });
      }
      req.studentClass = studentClass;
      next();
    });
};

exports.read = (req, res) => {
  return res.json(req.studentClass);
};

exports.create = (req, res) => {
  const studentClass = new StudentClass(req.body);
  studentClass.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error:  "something went wrong"
      });
    }
    res.json({ data });
  });
};

//

exports.update = (req, res) => {
  StudentClass.findOneAndUpdate(
    { _id: req.studentClass._id },
    { $set: req.body },
    { new: true },
    (err, studentClassUpdate) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }

      res.json(studentClassUpdate);
    }
  );
};

exports.list = (req, res) => {
  StudentClass.find()
    .populate("childClass")
    .populate("teacher")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};



exports.listClassPrimary = (req, res) => {
  StudentClass.find({childClass: null })
    .populate("childClass")
    .populate("teacher")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};


exports.listClassAdmin = (req, res) => {
  StudentClass.find({childClass: { $exists: true, $ne: null } })
    .populate("childClass")
    .populate("teacher")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};



exports.listClassChild = (req, res) => {
  console.log(req.studentClass._id)
  StudentClass.find({childClass: req.studentClass._id })
    .populate("childClass")
    .populate("teacher")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};

exports.remove = (req, res) => {
  const studentClass = req.studentClass;
  studentClass.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "Class deleted"
    });
  });
};
