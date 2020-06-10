const User = require("../modles/users");
const UploadFile = require('../modles/uploadFile');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const csv = require('fast-csv');


exports.userById = (req, res, next, id) => {
    User.findById(id).populate('studentClass').exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({error: "User not found"});
        }
        req.profile = user;
        next();
    });
};

exports.userByIdGet = (req, res, next, id) => {
    User.findById(id).populate('studentClass').exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({error: " User not found"});
        }
        req.user = user;
        next();
    });
};


exports.userByEmail = (req, res, next, email) => {

    User.find({email: email}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({error: "User not found"});
        }
        req.profileByEmail = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.slat = undefined;

    return res.json(req.profile);
};

exports.update = (req, res) => {
    console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const {
        firstname,
        lastname,
        email,
        studentClass,
        schoolId,
        house,
        age,
        role,
        sex,
        school,
        verification,
        password

    } = req.body;

    User.findOne({
        _id: req.profile._id
    }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({error: 'User not found'});
        }
        if (!firstname) {
            return res.status(400).json({error: 'Name is required'});
        } else {
            user.firstname = firstname;
        }

        if (!lastname) {
            return res.status(400).json({error: 'lastname is required'});
        } else {
            user.lastname = lastname;
        }
        if (!email) {
            return res.status(400).json({error: 'email is required'});
        } else {
            user.email = email;
        }

        if (!role) {
            return res.status(400).json({error: 'role is required'});
        } else {
            user.role = role;
        }
        if (studentClass) {
            user.studentClass = studentClass
        }
        if (age) {
            user.age = age
        }
        if (schoolId) {
            user.schoolId = schoolId
        }

        if (house) {
            user.house = house
        }

        if (sex) {
            user.sex = sex
        }

        if (school) {
            user.school = school
        }

        if (verification) {
            user.verification = verification
        }


        if (password) {
            if (password.length < 6) {
                return res.status(400).json({error: 'Password should be min 6 characters long'});
            } else {
                user.password = password;
            }
        }
        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({error: 'User update failed'});
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;

            res.json(updatedUser);
        });
    });
};

exports.edit = (req, res) => {


    const {
        firstname,
        lastname,
        email,
        studentClass,
        schoolId,
        house,
        age,
        role,
        sex,
        school,
        verification,
        password

    } = req.body;

    User.findOne({
        _id: req.profile._id
    }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({error: 'User not found'});
        }
        if (firstname) {
            user.firstname = firstname;
        }

        if (lastname) {
            user.lastname = lastname;

        }
        if (email) {
            user.email = email;
        }

        if (role) {
            user.role = role;
        }
        if (studentClass) {
            user.studentClass = studentClass
        }
        if (age) {
            user.age = age
        }
        if (schoolId) {
            user.schoolId = schoolId
        }

        if (house) {
            user.house = house

        }

        if (sex) {
            user.sex = sex
        }

        if (school) {
            user.school = school
        }

        if (verification) {
            user.verification = verification
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({error: 'Password should be min 6 characters long'});
            } else {
                user.password = password;

            }
        }


        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({error: 'User update failed'});
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};


exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    User.find().select("-hashed_password").populate("studentClass").populate("schoolId").select("-salt").sort([[sortBy, order]]).exec((err, users) => {
        if (err) {
            return res.status(400).json({error: "Users not found"});
        }
        res.json(users);
    });
};

exports.listStudents = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    User.find({role: 0, schoolId: req.schinfo}).select("-hashed_password").select("-salt").populate("studentClass").populate("schoolId").sort([[sortBy, order]]).exec((err, users) => {
        if (err) {
            return res.status(400).json({error: "Users not found"});
        }
        res.json(users);
    });
};


exports.listTeachers = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    User.find({role: 2, schoolId: req.schinfo}).select("-hashed_password").select("-salt").populate("studentClass").populate("schoolId").sort([[sortBy, order]]).exec((err, users) => {
        if (err) {
            return res.status(400).json({error: "Users not found"});
        }
        res.json(users);
    });
};


exports.listAdminUsers = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    User.find({role: 1, schoolId: req.schinfo}).select("-hashed_password").select("-salt").populate("studentClass").populate("schoolId").sort([[sortBy, order]]).exec((err, users) => {
        if (err) {
            return res.status(400).json({error: "Users not found"});
        }
        res.json(users);
    });
};


exports.remove = (req, res) => {
    const user = req.user;
    user.remove((err, data) => {
        if (err) {
            return res.status(400).json({error: errorHandler(err)});
        }
        res.json({message: "user deleted"});
    });
};


exports.passwordReset = (req, res) => { // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const {password} = req.body;

    User.findOne({
        _id: req.profile._id
    }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({error: 'User not found'});
        }


        if (password) {
            if (password.length < 6) {
                return res.status(400).json({error: 'Password should be min 6 characters long'});
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({error: 'User update failed'});
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};


exports.update2 = (req, res) => { // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const verification = 0;

    User.findOne({
        _id: req.profile._id
    }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({error: 'User not found'});
        }

        user.verification = verification;


        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({error: 'User update failed'});
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    })
};


exports.listSearc = (req, res) => {

    const query = {};
    const query2 = {};

    if (req.query.search) {

        query.firstname = {
            $regex: req.query.search,
            $options: "i"
        }
        query.role = req.query.role
        query.schoolId = req.query.schoolId

        if (req.query.studentClass && req.query.studentClass != "All") {

            query.studentClass = req.query.studentClass
            console.log(query)
        }


        User.find(query, (err, users) => {

            if (err) {

                return res.status(400).json({error: errorHandler(err)});

            }

            res.json(users);

        })

    }

};


exports.fileUpload = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({error: "File could not be uploaded"});
        }
        // check for all fields
        const {name, file} = fields;

        if (!name) {
            return res.status(400).json({error: " All fields are required "});
        }

        let uploadFile = new UploadFile(fields);
        if (files.file) {
            console.log("FILES PHOTO", files.file);
            uploadFile.file.data = fs.readFileSync(files.file.path, "utf8");
            uploadFile.file.contentType = files.file.type;
            uploadFile.file.path = files.file.path;
            uploadFile.file.name = files.file.name;
        }

        uploadFile.save((err, result) => {
            if (err) {
                return res.status(400).json({error: errorHandler(err)});
            }
            res.json(result);
        });
    });
};


exports.fileById = (req, res, next, id) => {
    UploadFile.findById(id).exec((err, file) => {
        if (err || !file) {
            return res.status(400).json({error: " file not found"});
        }
        req.file = file;
        next();
    });
};


exports.fileList = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    UploadFile.find().select("-file").sort([[sortBy, order]]).exec((err, file) => {
        if (err) {
            return res.status(400).json({error: "Users not found"});
        }
        res.json(file);
    });
};


exports.fileread = (req, res) => {
    req.file.file = undefined;
    return res.json(req.file);
    next();
};


exports.activateFile = (req, res) => {
    filePath = req.file.file.path;
    var fileName = req.file.file.name;
    var contentType = req.file.file.contentType;
    let stream = fs.createReadStream(filePath);
    let myData = [];
    let csvStream = csv.parse().on("data", function (data) {
        myData.push({
            role: data[0],
            verification: data[1],
            firstname: data[2],
            lastname: data[3],
            email: data[4],
            studentClass: data[5],
            schoolId: data[6],
            house: data[7],
            age: data[8],
            sex: data[9],
            password: data[10]
        });
    }).on("end", function () {
        myData.shift();

        console.log(myData);

        User.insertMany(myData, (err, user) => {
            if (err) {
                return res.status(400).json({error: err});
            }
            user.salt = undefined;
            user.hashed_password = undefined;
            res.json({user});
        });

    });

    stream.pipe(csvStream);
}


exports.file = (req, res, next) => {
    if (req.file.file.data) {
        res.set('Content-Type', req.file.file.contentType)
        return res.send(req.file.file.data);
    }
    next();
};

exports.removeFile = (req, res) => {
  const UploadFile = req.file;
  UploadFile.remove((err, file) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "File deleted"
    });
  });
};
