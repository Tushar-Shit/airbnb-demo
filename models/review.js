const mongoose = require('mongoose');
const schema = mongoose.Schema;//to reduce typing

const reviewSchema = new schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author:{
        type:schema.Types.ObjectId,
        ref:"User"
    }
});

const review = mongoose.model("review", reviewSchema);
module.exports = review;