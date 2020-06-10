const Subject = require("../modles/subject");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.subjectById = (req, res, next, id) => {
  Subject.findById(id)
    .populate("classParent")
    .populate("teacher")
    .exec((err, subject) => {
      if (err || !subject) {
        return res.status(400).json({ error: "Subject not found" });
      }
      req.subject = subject;
      next();
    });
};

exports.read = (req, res) => {
  return res.json(req.subject);
};

exports.create = (req, res) => {
  const subject = new Subject(req.body);
  console.log(req.body);
  subject.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error : err
      });
    }
    res.json({ data });
  });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Subject.find()
  .populate("teacher")
  .populate("classParent")
    .sort([[sortBy, order]])
    .exec((err, subjects) => {
      if (err) {
        return res.status(400).json({ error: "Subject not found" });
      }
      res.json(subjects);
    });
};

exports.update = (req, res) => {
  Subject.findOneAndUpdate(
    {
      _id: req.subject._id
    },
    {
      $set: req.body
    },
    {
      new: true
    },
    (err, subject) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "You are not allowed to perform this action" });
      }

      res.json(subject);
    }
  );
};

exports.remove = (req, res) => {
  const subject = req.subject;
  subject.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "subject deleted"
    });
  });
};
