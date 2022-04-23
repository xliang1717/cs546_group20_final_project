const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const parklotsData = require('./parklot');
const { ObjectId } = require('mongodb');

module.exports = {
    // Add new Area to user's collection 
    // TODO: Add duplicate check
    async addNewAreaToUser(newArea, userId) {
        const userCollection = await users();
        // try {

        // } catch () {

        // }
        await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $push: { preferLocation: newArea } }
        );
    },

    // Remove myArea from user's collection
    // Throw error when could not remove myArea or it doesn't exists
    async removeAreaFromUser(myArea, userId) {
        const userCollection = await users();
        await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $pull: { preferLocation: myArea } }
        );
    },

    // Return user's myAreas
    // TODO: Add Validation and error Handling
    async getMyAreasForUser(userId) {
        const userCollection = await users();
        let myCollection = await userCollection.findOne(
            { _id: ObjectId(userId) },
            { projection: { preferLocation: 1 } }
        );
        let myAreas = myCollection.preferLocation;
        return myAreas;
    }
}