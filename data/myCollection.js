const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const parklots = mongoCollections.parklot;
const { ObjectId } = require('mongodb');

module.exports = {
    async addParkingLotToUserCollection(parkingLotId, userId) {
       
        const userCollection = await users();
        //let myCollectionParkingLotIds = await this.getCollectionParkingLotIdsForUser(userId);
        const parkLotCollection = await parklots();
        
        let parkLotInfo = await parkLotCollection.findOne( {_id : ObjectId(parkingLotId) });
      
        let ParkingLotName = parkLotInfo.parkLotname;
        let myCollectionParkingLots = await this.getCollectionParkingLotForUser(userId);
        if (myCollectionParkingLots.length > 0) {
            if (myCollectionParkingLots.includes(ParkingLotName)) {
                throw 'This parking lot already in the user collection!';
            }
        }
        let updateAddParkingLotInfo = await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $push: { collectionCarParks: ParkingLotName } }
        );
        if (!updateAddParkingLotInfo.modifiedCount) throw 'Add parking lot to user collection failed.';
        return this.getCollectionParkingLotForUser(userId);
    },

    async getCollectionParkingLotForUser(userId) {
        const userCollection = await users();
        let myCollection = await userCollection.findOne(
            { _id: ObjectId(userId) },
            { projection: { collectionCarParks: 1 } }
        );
        return myCollection.collectionCarParks;
    }
}