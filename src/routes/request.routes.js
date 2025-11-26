const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const requestController = require("../controllers/request.controller");

router.use(authenticate);

router.post("/create", requestController.create);

router.get("/", requestController.list);
router.get("/all", requestController.all);
router.post("/:id/approve", requestController.approve);
router.post("/:id/reject", requestController.reject);
router.post("/:id/close", requestController.close);
router.get("/assigned", requestController.assigned);

module.exports = router;
