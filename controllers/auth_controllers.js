const express = require('express');
const User = require('../models/User');

// for random keys and encryption
const bcrypt = require("bcrypt");
const saltRounds = 10;

// --------- Register user in database --------- //
module.exports.create = async function (req, res) {

    // Checking if passwords matcher
    if (req.body.password != req.body.repassword) {
        console.log("Password not match");
        res.redirect('back');
        return res.status(401).json({
            message: "Password not match",
            status: 401,
            data: null,
            error: true
        });
    }

    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        //finding user if already exist or not
        User.findOne({
            email: req.body.email
        }, function (error, user) {

            // If any error occurred
            if (error) {
                console.log("Error : CREATE 1");
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: 500,
                    data: error,
                    error: true
                });
            }
            // If user does not exist
            if (!user) {

                User.create(req.body, function (error, user) {
                    if (error) {
                        console.log("Error in creating User");
                        return res.status(403).json({
                            message: "Error in creating User",
                            status: 403,
                            data: error,
                            error: true
                        });
                    }
                    console.log(user);
                    res.redirect("/signin");
                    // return res.status(200).json({
                    //     message: "User created in database",
                    //     status: 200,
                    //     data: user,
                    //     error: false
                    // });
                })
            } else {
                console.log("User Already Exists");
                res.redirect("back");
                return res.status(403).json({
                    message: "User Already Exists",
                    status: 403,
                    data: null,
                    error: true
                });
            }

        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            data: error,
            error: true
        });
    }


}

//---------- Login Handel --------//

module.exports.login = function (req, res) {
    return res.redirect('/user')
}

//--------- Logout Handel --------//
module.exports.logout = function (req, res) {
    req.logout();
    return res.redirect("/")
}

//--------- Reset Password Handel --------//
module.exports.resetPassword = async function (req, res) {
    console.log(req.body);
    console.log(req.user);

    if (req.params.id == req.user._id) {

        if (req.body.password != req.body.repassword) {
            console.log("password and confirm pasword not equal!");
            res.redirect(`/auth/reset/${id}`);
            return res.status(406).json({
                message: "Password not match",
                status: 406,
                data: null,
                error: true
            });
        }

        let user = await User.findById(req.params.id);

        if (!user) {
            console.error("User Not found");
            return res.status(401).json({
                message: "User Not Found",
                status: 401,
                data: null,
                error: true
            });
        } else {

            let result = await bcrypt.compare(req.body.current_password, user.password);

            if (result) {
                let newPassword = await bcrypt.hash(req.body.password, saltRounds);
                await User.findByIdAndUpdate(req.params.id, {
                    password: newPassword
                });
                console.log("password reset successfully");
                res.redirect('/user');
                return res.status(200).json({
                    message: "Internal Server Error",
                    status: 200,
                    data: result,
                    error: false
                });

            } else {
                console.log("password Not match");
                return res.status(409).json({
                    message: "Password not match",
                    status: 409,
                    data: null,
                    error: true
                });
            }
        }

    } else {
        console.error("User Not match");
        res.redirect("back");
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            data: error,
            error: true
        });
    }

}