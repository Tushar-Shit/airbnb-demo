const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose").default;

// console.log(typeof passportLocalMongoose);
const userSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

// console.log(passportLocalMongoose);
// console.log(typeof passportLocalMongoose);
userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', userSchema);