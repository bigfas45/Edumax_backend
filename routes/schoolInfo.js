const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { create, refById, ref, schById, info} = require("../controllers/schoolInfo");

router.post("/school/info/create",  create);
router.get("/school/:refId",  ref);

router.get("/school/info/:schId",  info);



router.param("userId", userById);
router.param("refId", refById);
router.param("schId", schById);


module.exports = router;
