const listing = require("../models/listings");

//index route get
module.exports.index = async (req, res) => {
    const alllist = await listing.find({});
    res.render('./listings/index', { alllist });
};

//new listing create route get
module.exports.newRoute = (req, res) => {
    res.render('./listings/create');
};

//show route get
module.exports.showRoute = async (req, res) => {
    const { id } = req.params;
    const data = await listing.findById(id).populate({ path: "review", populate: { path: "author" } }).populate("owner");
    if (!data) {
        const err = new Error("Listing Not Found");
        err.status = 404;
        throw err;
    }
    res.render('./listings/show', { data });
};


//new listing create route post
module.exports.newRoutePost = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const data = new listing(req.body.listing);
    data.owner = req.user._id;
    data.image = { url, filename };

    let address = `${data.location},${data.zip}, ${data.country}`;
    let url2 = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=jsonv2&limit=1`;
    let response = await fetch(url2, {
        headers: {
            "User-Agent": "clone-airbnb-dev"
        }
    });
    let data2 = await response.json();
    if (!data2.length) {
        address = `${data.zip}, ${data.country}`;
        url2 = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=jsonv2&limit=1`;
        response = await fetch(url2, {
            headers: {
                "User-Agent": "clone-airbnb-dev"
            }
        });
        data2 = await response.json();
        if (!data2.length) {
            req.flash("error", "Location not found");
            return res.redirect("/listings/new");
        }
    }
    const lat = data2[0].lat;
    const lng = data2[0].lon;
    data.geometry = { lat, lng };

    await data.save();
    res.redirect('/listings');
};


//edit listing route get
module.exports.editRouteGet = async (req, res) => {
    const { id } = req.params;
    const data = await listing.findById(id);
    if (!data) {
        const err = new Error("Listing Not Found");
        err.status = 404;
        throw err;
    }
    res.render('./listings/edit', { data });
};


//edit listing route post
module.exports.editRoutePost = async (req, res) => {
    const { id } = req.params;
    const oldListing = await listing.findById(id);  //extract old listing for location changes
    //this is the new listing with all new values
    const updatedListing = await listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    // Image update
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
    }

    // Check whether location data changed
    const locationChanged =
        oldListing.location !== updatedListing.location ||
        oldListing.country !== updatedListing.country ||
        oldListing.zip !== updatedListing.zip;

    if (locationChanged) {
        let address = `${updatedListing.location},${updatedListing.zip}, ${updatedListing.country}`;
        let url2 = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=jsonv2&limit=1`;

        let response = await fetch(url2, {
            headers: {
                "User-Agent": "clone-airbnb-dev"
            }
        });
        let data2 = await response.json();

        //if data not found try with zip
        if (!data2.length) {
            address = `${updatedListing.zip}, ${updatedListing.country}`;
            url2 = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=jsonv2&limit=1`;
            response = await fetch(url2, {
                headers: {
                    "User-Agent": "clone-airbnb-dev"
                }
            });
            data2 = await response.json();
        }

        //if again location not found redirect
        if (!data2.length) {
            req.flash("error", "Location not found");
            return res.redirect(`/listings/${id}/edit`);
        }

        updatedListing.geometry = {
            lat: Number(data2[0].lat),
            lng: Number(data2[0].lon)
        };
    }

    await updatedListing.save();
    res.redirect(`/listings/${id}`);
};


//delete listing
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await listing.findByIdAndDelete(id);
    if (!deletedListing) {
        const err = new Error("Listing Not Found");
        err.status = 404;
        throw err;
    }
    res.redirect('/listings');
};
