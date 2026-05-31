const listing = require('../models/listings');
const Review = require('../models/review');
module.exports.validUser = async (req, res, next) => {
    const { id } = req.params;

    let temp = await listing.findById(id);
    if (!res.locals.currentUser._id.equals(temp.owner._id)) {
        req.flash("error", "you Do not have permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isowner = async (req, res, next) => {
    const { id, reviewId } = req.params;

    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "you Do not have permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}