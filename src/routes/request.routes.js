const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const { authorizeRole } = require("../middleware/authorizeRole");
const requestController = require("../controllers/request.controller");
const enum_helper = require ('../utils/enum')

router.use(authenticate);

router.post(
  "/create",
  authorizeRole([enum_helper.ROLES.EMPLOYEE]),
  requestController.create
);

router.get("/", 
    authorizeRole([enum_helper.ROLES.EMPLOYEE]),
    requestController.list
);

router.get(
  "/all",
  authorizeRole([enum_helper.ROLES.MANAGER]),
  requestController.all
);

router.post(
  "/:id/approve",
  authorizeRole([enum_helper.ROLES.MANAGER]),
  requestController.approve
);

router.post(
  "/:id/reject",
  authorizeRole([enum_helper.ROLES.MANAGER]),
  requestController.reject
);

router.post(
  "/:id/close",
  authorizeRole([enum_helper.ROLES.EMPLOYEE]),
  requestController.close
);

router.get(
  "/assigned",
  authorizeRole([enum_helper.ROLES.EMPLOYEE]),
  requestController.assigned
);

module.exports = router;
