const router = require("express").Router();
const userController = require("../controllers/user.controller")
const { authenticate } = require("../middleware/auth");
const { authorizeRole } = require("../middleware/authorizeRole");
const enum_helper = require ('../utils/enum')



router.use(authenticate);

router.get("/list", 
    authorizeRole([enum_helper.ROLES.EMPLOYEE]),
    userController.list
);

module.exports = router;
