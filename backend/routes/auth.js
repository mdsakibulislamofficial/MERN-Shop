var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSginIn } = require("../controllers/auth")


router.post("/signup", [
    check('name', "name should be at least 3 char")
        .isLength({ min: 3 }),
    check('email', "email is required")
        .isEmail(),
    check('password', "password should be at least 6 char")
        .isLength({ min: 6 }),
], signup);



router.post("/signin", [
    check('email', "email is required")
        .isEmail(),
    check('password', "password field required")
        .isLength({ min: 1 }),
], signin);



router.get('/signout', signout);

router.get('/testroute', isSginIn, (req, res) => {
    res.json({
        message: req.auth
    });
});


module.exports = router;