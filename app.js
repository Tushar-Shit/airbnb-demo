const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 7000;
const path = require('path');
const methodOverRide = require("method-override");
const ejsMate = require("ejs-mate");
const listingRoute = require("./routes/listingroute");
const reviewRoute = require("./routes/reviewroute");
const userRoute = require("./routes/userroute");
const session = require('express-session');
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy = require("passport-local");
const User = require("./models/user");


main()
    .then(() => console.log("database connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URL);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverRide('_method'));
app.engine('ejs', ejsMate);


//session storage on cloud
const sessionCloud = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    crypto: {
        secret: process.env.DB_SESSION_SECRET
    },
    touchAfter: 24 * 60 * 60,
    ttl: 8 * 24 * 60 * 60
});

//session on browser
const sessionOption = {
    store: sessionCloud,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
};

sessionCloud.on("error", (err) => {
    console.log(err);
});

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});




// Root Route
app.get('/', (req, res) => {
    res.redirect("/listings");
});

//all sub routes
app.use("/listings", listingRoute);
app.use("/listings/:id/review", reviewRoute);
app.use("/user", userRoute);


// // Page Not Found
// app.use((req, res, next) => {
//     const err = new Error("Page Not Found!");
//     err.status = 404;
//     next(err);
// });

// // Error Middleware
// app.use((err, req, res, next) => {
//     let { status = 500, message = "Something Went Wrong!" } = err;
//     res.status(status).render("./listings/error2", { error: { status, message, }, });
// });


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});