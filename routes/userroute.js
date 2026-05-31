const express = require('express');
const router = express.Router({ mergeParams: true });
const { previousURL } = require("../middleware/authentication");
const userController = require("../controllers/usercontroller");
const passport = require('passport');

//route() provide functionality to write the path once and handle all requests like this.
//here you just write the path once, reduce typing errors, structure code better.
router.route("/signup")
    .get(userController.signup)    //user signup get route
    .post(userController.signupPost)   //user signup post route


router.route("/login")
    .get((req, res) => { res.render("./listings/userLogin"); })//user login get route
    .post(
        previousURL,
        passport.authenticate("local", { failureRedirect: "/user/login", failureFlash: true }),
        userController.loginPost
    );//user login post route

//user logout
router.get("/logout", userController.logout);

module.exports = router;