const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const SchoolInfo = require("../modles/schoolInfo");
 const { errorHandler } = require("../helpers/dbErrorHandler");



 exports.schById = (req, res, next, id) => {
  SchoolInfo.findById(id)
  .exec((err, schinfo) => {
      if (err || !schinfo) {
          return res.status(400).json({error: " sch info not found"});
      }
      req.schinfo = schinfo;
      next();
  });
};

exports.info = (req, res) => {
  return res.json(req.schinfo);
};


 
exports.refById = (req, res, next, id) => {
  SchoolInfo.find({referenceId: id})
  .exec((err, info) => {
      if (err || !info) {
          return res.status(400).json({error: " Project not found"});
      }
      req.info = info;
      next();
  });
};


exports.ref = (req, res) => {
let referenceId
  for (let ingredients of req.info) {
    referenceId = ingredients.referenceId
}

  SchoolInfo.find({referenceId: referenceId})
  .exec((err, schoolInfo) => {
    if (err) {
        return res.status(400).json({error: "school info not found"});
    };
    res.json(schoolInfo);
});
};




 exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "File could not be uploaded" });
    }
    // check for all fields
    const {
      name,
      telephone,
      email,
      address,
      moto,
      open,
      close,
      year,
      logo,
    } = fields;

    if (
      !name
    ) {
      return res.status(400).json({
        error: " School name is required!"
      });
    }

    let schoolInfo = new SchoolInfo(fields);
    if (files.logo) {
      console.log("FILES PHOTO", files.logo);
      schoolInfo.logo.data = fs.readFileSync(files.logo.path);
      schoolInfo.logo.contentType = files.logo.type;
      schoolInfo.logo.path = files.logo.path;
      schoolInfo.logo.name = files.logo.name;
    }
   

    schoolInfo.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(result);
    });
  });
};

