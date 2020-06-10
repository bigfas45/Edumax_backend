const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const {
  create,
  subjectById,
  read,
  list,
  update,
  remove
} = require("../controllers/subject");

router.get("/subject/:subjectId", requireSignin, read);
router.post("/subject/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/subjects/:userId", requireSignin, isAuth, list);
router.put("/subject/:subjectId/:userId", requireSignin, isAuth, update);
router.delete(
  "/subject/:subjectId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.param("userId", userById);
router.param("subjectId", subjectById);

module.exports = router;
