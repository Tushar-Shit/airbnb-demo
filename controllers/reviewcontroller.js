const listing = require('../models/listings');
const review = require('../models/review');


//create new review
module.exports.createReview = async (req, res) => {
    const hotel = await listing.findById(req.params.id);
    const newReview = new review(req.body.review);
    newReview.author = req.user._id;
    hotel.review.push(newReview);
    await newReview.save();
    await hotel.save();
    res.redirect(`/listings/${req.params.id}`);
};

//delete review
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    //it checks in review array if the reviewId is matched then except that everything get updated
    await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
};
