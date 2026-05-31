module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirect = req.originalUrl;
        req.flash("error", "you must logged in first");
        return res.redirect("/user/login");
    }
    next();
}

module.exports.previousURL = (req, res, next) => {
    if (req.session.redirect) {
        res.locals.redirect = req.session.redirect;
    }
    next();
}