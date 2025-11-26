const router = require("express").Router();
const userController = require("../controllers/user.controller")
const { authenticate } = require("../middleware/auth");

router.use(authenticate);

router.get("/list", userController.list);

module.exports = router;
