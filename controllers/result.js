const User = require("../modles/users");
const Result = require('../modles/result');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const csv = require('fast-csv');


exports.create = (req, res) => {
    const result = new Result(req.body);
    console.log(req.body);
    result.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error : err
        });
      }
      res.json({ data });
    });
};

exports.listResultByStudentSubject = (req, res) => {

    //  res.json(req.subject._id)
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  
    Result.find({subject: req.subject._id, student: req.user._id})
   .populate("student")
   .populate("childClass")
   .populate("teacher")
   .populate("subject")
      .sort([[sortBy, order]])
      .exec((err, results) => {
        if (err) {
          return res.status(400).json({ error: "Subject not found" });
        }
        res.json(results);
      });
}