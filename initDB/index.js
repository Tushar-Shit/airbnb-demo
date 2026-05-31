const mongoose = require('mongoose');
const initData = require('./data.js');
const list = require('../models/listings.js');
const xyz = require("../utils/secret.js");
// const encodedPassword = encodeURIComponent(xyz);
main()
    .then(() => console.log("database connected"))
    .catch(e => console.log(e));

async function main() {

    await mongoose.connect(`mongodb://tusharadmin:${xyz}@ac-zfgqyge-shard-00-00.xwovwkm.mongodb.net:27017,ac-zfgqyge-shard-00-01.xwovwkm.mongodb.net:27017,ac-zfgqyge-shard-00-02.xwovwkm.mongodb.net:27017/airbnb?ssl=true&replicaSet=atlas-221ylh-shard-0&authSource=admin&appName=Cluster0`);

    await dataEntry();
}

async function dataEntry() {

    await list.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:"6a17fbf234b6fbfc406b370b"}));
    await list.insertMany(initData.data);

    console.log("okay");

    mongoose.connection.close();
}