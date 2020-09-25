
const User = require("../models/user");
const { check, validationResult } = require('express-validator');
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt")




// {
//     "name ":"Md Sakibul",
//     "lastname":"Islam",
//     "email" : "mail@mdsakibulislam.com",
//     "password" : "123456"
// }



exports.signup = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "not able to save user in db"
            });
        }
        res.json({
            "id": user._id,
            "name ": user.name,
            "lastname": user.lastname,
            "email": user.email,
            "password": user.password
        });

    });
}



exports.signin = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    // finding user by e-mail
    user.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User does not exists",
            });
        }

        if (!user.authenicate(password)) {
            return res.status(401).json({
                error: "Email and password do not match",
            });
        }

        // create token and put token in cookie
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        res.cookie("token", token, { expire: new Date() + 9999 });


        // send response to forntend
        const { _id, name, email, role } = user;

        return res.json({
            token, user: {
                _id, name, email, role
            }
        });

    });
};


exports.signout = (req, res) => {

    res.clearCookie("token");
    res.json({
        message: "sign out successfully"
    });
};

// protected routes

exports.isSginIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
});

// custommiddlewares

exports.isAuthenticated = (req, res, next) => {

    let checker = req.profile && req.auth && req.profile._id === req.auth._id;

    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED!"
        })
    }

    next();
}

////  done work on authentication part (signup signin signout) and is user signedin or is user Authenticated or is this user a admin  

exports.isAdmin = (req, res, next) => {

    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "ACCESS DENIED!"
        })
    }

    next();
}