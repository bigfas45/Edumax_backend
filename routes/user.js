const express = require("express");
const router = express.Router();

const {
  userById,
  read,
  update,
  update2,
  userByIdGet,
  list,
  remove,
  listStudents,
  listSearc,
  listTeachers,
  listAdminUsers,
  edit,
  fileUpload,
  fileread,
  fileById,
  activateFile,
  file,
  fileList,
  removeFile
} = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { schById} = require("../controllers/schoolInfo");


router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});
router.get("/user/read/:userId",  read);
// router.put("/user/:userId", requireSignin, isAuth, update);
// router.put("/user/update/:userId",  edit);
router.get("/users/:userId", requireSignin, isAuth, list);
router.delete("/user/:userIdD/:userId", requireSignin, isAuth, isAdmin, remove);
router.get("/users/students/:schId/:userId", requireSignin, isAuth, isAdmin, listStudents);
router.get("/users/teachers/:schId/:userId", requireSignin, isAuth, isAdmin, listTeachers);
router.get("/users/adminUser/:schId/:userId", requireSignin, isAuth, isAdmin, listAdminUsers);
router.get("/user/list/search" , listSearc);
router.put("/admin/user/:userId", edit)
router.post("/user/file/upload/:userId", requireSignin, isAuth, isAdmin, fileUpload)
router.delete("/user/file/remove/:fileId/:userId", requireSignin, isAuth, isAdmin, removeFile);

router.get("/user/file/list", fileList)

router.get("/user/file/read/:fileId", fileread)
router.get('/user/get/file/:fileId', file);

router.get("/user/file/activate/:fileId", activateFile)

router.param("schId", schById);
router.param("userId", userById);
router.param("userIdD", userByIdGet);
router.param('fileId', fileById);


module.exports = router;
