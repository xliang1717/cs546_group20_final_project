

const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.comment;
const parklot = mongoCollections.parklot;
const { ObjectId } = require('mongodb');
const validation = require('../validation');


module.exports = {
    user : user,
    petrolStation : petrolStation,
    comment : comment,
    parklot : parklot,
    myCar : myCar,
    myCollection : myCollection
};