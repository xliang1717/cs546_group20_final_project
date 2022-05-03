const mongoCollections = require('../config/mongoCollections');
const parklot = mongoCollections.parklot;
const { ObjectId } = require('mongodb');
//const validation = require('../validation');


async function get(id) {
    //     if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
    //     id = validation.checkId(id,'ID');
        
        const parkLotCollection = await parklot();
        const parkLotData = await parkLotCollection.findOne( {_id : ObjectId(id) });
        if (parkLotData=== null) throw 'No band with that id';
        parkLotData._id = parkLotData._id.toString();
        return parkLotData;
    }

async function getAllParkinglots() {
    if (arguments.length !== 0) throw "No input allowed";
    const parkLotCollection = await parklot();
    const parkLotsList = await parkLotCollection.find({}).toArray();
    if (parkLotsList.length == 0) throw "No parkinglot in collection";
    for (let i = 0; i < parkLotsList.length; i++) {
        parkLotsList[i]._id = parkLotsList[i]._id.toString();
    }
    //console.log(parkLotsList)
    return parkLotsList;
}


async function create(isDelete, parkLotname, parkingChargeStandard, parkingLotCoordinates, parklotLocationZipCode, disabilityFriendly, suitableVehicleSize, idfromUploader, trafficConditions, grade, capacity) {

    const parkLotCollection = await parklot();

    let newParkLot = {

        isDelete: isDelete,
        parkLotname: parkLotname,
        parkingChargeStandard: parkingChargeStandard,
        parkingLotCoordinates: parkingLotCoordinates,
        parklotLocationZipCode: parklotLocationZipCode,
        disabilityFriendly: disabilityFriendly,
        suitableVehicleSize: suitableVehicleSize,
        idfromUploader: idfromUploader,
        trafficConditions: trafficConditions,
        rating: grade,
        parkingLotCapacity: capacity,
        totalCommentRating: 0,
        totalCommentNumber: 0
    };

    const insertInfo = await parkLotCollection.insertOne(newParkLot);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

    const newId = insertInfo.insertedId.toString();
    const parkLot = await this.get(newId);
    return parkLot;
}

module.exports = {
    get,
    getAllParkinglots,
    create

}