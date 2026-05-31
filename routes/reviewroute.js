const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { reviewSchema } = require("../schema");
const isloggedin = require("../middleware/authentication");
const { isowner } = require("../middleware/authorization");
const reviewController = require("../controllers/reviewcontroller");

//review validation
const reviewValidate = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        const err = new Error(error);
        err.status = 400;
        throw err;
    } else next();
};

//review 
router.post("/", isloggedin, reviewValidate, wrapAsync(reviewController.createReview));

//deleting review
router.delete("/:reviewId", isloggedin, isowner, wrapAsync(reviewController.destroyReview));


module.exports = router;