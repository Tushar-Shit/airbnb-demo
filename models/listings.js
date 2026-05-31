const mongoose = require('mongoose');
const schema = mongoose.Schema;//to reduce typing
const defaultImage = 'https://images.unsplash.com/photo-1603477849227-705c424d1d80?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJvcGljYWwlMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D';
const review = require("./review");
const user = require("./user");
//list schema
const listSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: {
            type: String,
            default: defaultImage,
            set: (v) => v === "" ? defaultImage : v,
        },
        filename: String
    },

    location: String,
    price: Number,
    country: String,
    zip: Number,
    review: [
        {
            type: schema.Types.ObjectId,
            ref: "review"
        }],
    owner:
    {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        lat: Number,
        lng: Number
    }
});

listSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: { $in: listing.review } });
    }
});

const listing = mongoose.model('list', listSchema);
module.exports = listing;