const express = require("express");
const router = express.Router();

const { userById, userByIdGet } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { subjectById, } = require("../controllers/subject");
const { create, listResultByStudentSubject} = require("../controllers/result");

router.post("/result/create/:userId", requireSignin,isAuth,  create);

router.get("/result/subject/student/:subjectId/:userIdD/:userId", requireSignin, isAuth,  listResultByStudentSubject);



router.param("userId", userById);
router.param("subjectId", subjectById);
router.param("userIdD", userByIdGet);




module.exports = router;
