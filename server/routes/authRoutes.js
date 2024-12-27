const router = require("express").Router();
const { login, singup, verifyAuth } = require("../controllers/authController");

router.post("/login", login);
router.post("/signup", singup);
router.get("/verify-token", verifyAuth);

module.exports = router;
