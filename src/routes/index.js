const router = require("express").Router();

router.get("/health", (req, res) => { res.send("hello!!");});
router.use("/auth", require("./auth.routes"));
router.use("/requests", require("./request.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
