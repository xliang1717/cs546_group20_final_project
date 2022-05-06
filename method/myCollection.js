const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const parklotsData = require('./parklot');
const { ObjectId } = require('mongodb');

module.exports = {
    // Add parking lot to user's collection 
    // This is required by Parking lot Detail page
    // Can only add parking lot if it doesn't exist in DB
    async addParkingLotToUserCollection(parkingLotId, userId) {
        const userCollection = await users();
        let myCollectionParkingLotIds = await this.getCollectionParkingLotIdsForUser(userId);
        if (myCollectionParkingLotIds.length > 0) {
            if (myCollectionParkingLotIds.includes(parkingLotId)) {
                throw 'ERROR: This parking lot has been added for the user collection.';
            }
        }
        let updateAddParkingLotInfo = await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $push: { collectionCarParks: parkingLotId } }
        );
        if (!updateAddParkingLotInfo.matchedCount && !updateAddParkingLotInfo.modifiedCount)
            throw 'ERROR: Add parking lot to user collection failed.';
        return this.getCollectionParkingLotIdsForUser(userId);
    },

    // Remove parking lot from user's collection
    // Throw error when could not remove the parking lot or it doesn't exists
    async removeParkingLotFromUserCollection(parkingLotId, userId) {
        const userCollection = await users();
        let myCollectionParkingLotIds = await this.getCollectionParkingLotIdsForUser(userId);
        if (myCollectionParkingLotIds.length == 0 || 
            (myCollectionParkingLotIds.length > 0 && !myCollectionParkingLotIds.includes(parkingLotId))) {
            throw 'ERROR: This parking lot does not exist in the user collection.'; 
        }
        let updateRemoveParkingLotInfo = await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $pull: { collectionCarParks: parkingLotId } }
        );
        if (!updateRemoveParkingLotInfo.matchedCount && !updateRemoveParkingLotInfo.modifiedCount)
            throw 'ERROR: Remove parking lot to user collection failed.';
        return this.getCollectionParkingLotIdsForUser(userId);
    },

    // Return user's parkingLot detail object collection
    async getCollectionForUser(userId) {
        let parkingLotIds = await this.getCollectionParkingLotIdsForUser(userId);
        let parkingLots = [];
        if (parkingLotIds.length > 0) {
            for (let i = 0; i < parkingLotIds.length; i++) {
                // Assume this line will throw error when could not find 
                // the parking lot using the parking lot id
                let parkingLot = await parklotsData.get(parkingLotIds[i]);
                parkingLots.push(parkingLot);
            }
        }
        return parkingLots;
    },

    // Get Collection ParkingLotIds for specific user
    async getCollectionParkingLotIdsForUser(userId) {
        const userCollection = await users();
        let myCollection = await userCollection.findOne(
            { _id: ObjectId(userId) },
            { projection: { collectionCarParks: 1 } }
        );
        return myCollection.collectionCarParks;
    }
}