const router = require("express").Router();

router.route("/signin").post(signin);
router.route("/signup").post(signup);
router.route("/signout").post(signout);
router.route("/token").post(tokenHandle);

module.exports = router;
