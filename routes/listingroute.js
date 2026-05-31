if (process.env.NODE_ENV != "production") { require("dotenv").config(); }
const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema, reviewSchema } = require("../schema");
const flash = require("connect-flash");
const isloggedin = require("../middleware/authentication");
const { validUser } = require("../middleware/authorization");
const listingControllers = require("../controllers/listingcontroller");
const multer = require("multer");
const { storage } = require("../cloudconfig");
const upload = multer({ storage });




//schema validation
const validateSchema = (req, res, next) => {

    let { error } = listingSchema.validate(req.body);
    if (error) {
        const err = new Error(error);
        err.status = 400;
        throw err;
    } else next();
};

//route() provide functionality to write the path once and handle all requests like this.
//here you just write the path once, reduce typing errors, structure code better.
//showing all listing and create listing on post request
router.route("/")
    .get(wrapAsync(listingControllers.index))
    .post(upload.single("listing[image]"), validateSchema, wrapAsync(listingControllers.newRoutePost));


// New Route
router.get('/new', isloggedin, listingControllers.newRoute);

router.route("/:id")
    .get(wrapAsync(listingControllers.showRoute))   // Show Route
    .put(upload.single("listing[image]"),validateSchema, validUser, wrapAsync(listingControllers.editRoutePost))     // Edit Route
    // .put(upload.array("listing[image]",5),validateSchema, validUser, wrapAsync(listingControllers.editRoutePost))     // Edit Route
    .delete(isloggedin, validUser, wrapAsync(listingControllers.destroyListing));    // Delete Route

router.get('/:id/edit', isloggedin, validUser, wrapAsync(listingControllers.editRouteGet));

module.exports = router;