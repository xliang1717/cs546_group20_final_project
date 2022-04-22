const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;

const { ObjectId } = require('mongodb');

module.exports = {
    // Add parking lot to user's collection 
    // Can only add parking lot if it doesn't exist in DB
    // TODO: Add duplicate check
    async addParkingLotToUserCollection(parkingLotId, userId) {
        const userCollection = await users();
        await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $push: { collectionCarParks: parkingLotId } }
        );
    },

    // Remove parking lot from user's collection
    async removeParkingLotToUserCollection(parkingLotId, userId) {
        const userCollection = await users();
        await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $pull: { collectionCarParks: parkingLotId } }
        );
    },

    // Get User's Collection
    // TODO: Add Validation and error Handling
    async getCollectionForUser(userId) {
        const userCollection = await users();
        let myCollection = await userCollection.findOne(
            { _id: ObjectId(userId) },
            { projection: { collectionCarParks: 1 } }
        );
        return myCollection.collectionCarParks;
    }
}