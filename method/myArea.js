const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const { ObjectId } = require('mongodb');

module.exports = {
    // Add new Area to user's collection 
    async addNewAreaToUser(newArea, userId) {
        const userCollection = await users();
        let myAreas = await this.getMyAreasForUser(userId);
        if (myAreas.length > 0 && myAreas.includes(newArea)) {
            throw "ERROR: This area has been added for the user areas.";
        }
        let updateInfo = await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $push: { preferLocation: newArea } }
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
            throw 'ERROR: Add area to user myAreas failed.';
        return this.getMyAreasForUser(userId);
    },

    // Remove myArea from user's collection
    // Throw error when could not remove myArea or it doesn't exists
    async removeAreaFromUser(myArea, userId) {
        const userCollection = await users();
        let myAreas = await this.getMyAreasForUser(userId);
        if (myAreas.length == 0 || (myAreas.length > 0 && !myAreas.includes(myArea))) {
            throw "ERROR: This area dose not exist for the user areas.";
        }
        let updateInfo = await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $pull: { preferLocation: myArea } }
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
            throw 'ERROR: Remove area to user myAreas failed.';
        return this.getMyAreasForUser(userId);
    },

    // Return user's myAreas
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