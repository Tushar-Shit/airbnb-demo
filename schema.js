const joi=require('joi');

module.exports.listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        price:joi.number().required().min(0),
        description:joi.string().max(500).required(),
        country:joi.string().required(),
        location:joi.string().required(),
        zip:joi.number().required(),
        image: joi.string().allow("", null),
    }).required()
});

module.exports.reviewSchema=joi.object({
    review:joi.object({
        comment:joi.string().max(500).required(),
        rating:joi.number().required().min(1).max(5),
    }).required()
});

