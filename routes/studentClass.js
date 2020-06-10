const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const {
  create,
  list,
  classById,
  read,
  update,
  remove,
  listClassPrimary,
  listClassChild,
  listClassAdmin
} = require("../controllers/studentClass");

router.post("/class/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/class/:classId", read);
router.put("/class/:classId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete(
  "/class/:classId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get("/class", list);

router.get("/class/primary/list", listClassPrimary);

router.get("/class/child/:classId", listClassChild);

router.get("/child/list", listClassAdmin);



router.param("classId", classById);
router.param("userId", userById);

module.exports = router;
