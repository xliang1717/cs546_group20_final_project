const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const parklotsData = require('./parklot');
const { ObjectId } = require('mongodb');

module.exports = {
    // Add parking lot to user's collection 
    // Can only add parking lot if it doesn't exist in DB
    // TODO: Add duplicate check
    async addParkingLotToUserCollection(parkingLotId, userId) {
        const userCollection = await users();
        // try {

        // } catch () {

        // }
        await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $push: { collectionCarParks: parkingLotId } }
        );
    },

    // Remove parking lot from user's collection
    // Throw error when could not remove the parking lot or it doesn't exists
    async removeParkingLotToUserCollection(parkingLotId, userId) {
        const userCollection = await users();
        await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $pull: { collectionCarParks: parkingLotId } }
        );
    },

    // Return user's parkingLot collection
    // TODO: Add Validation and error Handling
    async getCollectionForUser(userId) {
        const userCollection = await users();
        let myCollection = await userCollection.findOne(
            { _id: ObjectId(userId) },
            { projection: { collectionCarParks: 1 } }
        );
        let parkingLotIds = myCollection.collectionCarParks;
        let parkingLots = [];
        if (parkingLotIds.length > 0) {
            for (let i = 0; i < parkingLotIds.length; i++) {
                let parkingLot = await parklotsData.get(parkingLotIds[i]);
                parkingLots.push(parkingLot);
            }
        }
        return parkingLots;
    }
}