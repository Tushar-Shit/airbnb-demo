const User = require("../models/user");



module.exports.signup = (req, res) => {
    let data = {
        username: "",
        email: ""
    }
    res.render("./listings/userSignup", { data });
};

module.exports.signupPost = async (req, res) => {
    try {
        let { user, email, password } = req.body;
        let newUser = new User({ username: email, user, email });
        let result = await User.register(newUser, password);
        req.login(newUser, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/listings");
        })
    } catch (e) {
        let data = req.body;
        req.flash("error", e.message);
        res.render("./listings/userSignup", {
            error: [e.message],
            data
        });
    }
};

module.exports.loginPost = async (req, res) => {
    req.flash("success", "Welcomeback to Airbnb!");
    let redirectPath = res.locals.redirect || "/listings"
    res.redirect(redirectPath);
};
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/listings");
    })
};