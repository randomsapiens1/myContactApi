const express = require("express");
const { registerUser, loginUser} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", (req, res) => {

    res.json({message: "Current user information"});
});

module.exports = router;

