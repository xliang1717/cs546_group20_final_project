const mongoCollections = require('../config/mongoCollections');
const parklot = mongoCollections.parklot;
const { ObjectId } = require('mongodb');
const validation = require('../validation');


module.exports = {
    async get(id) {
        if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
        id = validation.checkId(id,'ID');
        
        const parkLotCollection = await parklot();
        const parkLotData = await parkLotCollection.findOne( {_id : ObjectId(id) });
        if (parkLotData=== null) throw 'No parkLot with that id';
        parkLotData._id = parkLotData._id.toString();
        return parkLotData;
    },

    async getAll() {
        if (arguments.length !== 0) throw "There should not input an argument !";
        const parkLotCollection = await parklot();
        const parkLotsList = await parkLotCollection.find({}).toArray();
        if (parkLotsList.length== 0) return [];
        for(let i = 0; i < parkLotsList.length; i++) {
            parkLotsList[i]._id = parkLotsList[i]._id.toString();
        }

        console.log(parkLotsList)

        return parkLotsList;
    },


    async create ( parkLotname, parkingChargeStandard, parkingLotCoordinates, parklotLocationZipCode, disabilityFriendly, suitableVehicleSize, idfromUploader,trafficConditions,  capacity) {

        if (arguments.length !== 9) {
            throw "There must be 9 arguments !"
        }

        parkLotname = validation.checkString(parkLotname, 'parkLotname');

        let standard =  Object.values(parkingChargeStandard);
        for (x in standard) {
            standard[x] = Number(standard[x]);
            if (typeof standard[x] !== 'number' ||  isNaN(standard[x]) ) throw 'The parkingChargeStandard should only contain numbers';
        }

        let coordinates =  Object.values(parkingLotCoordinates);
        for (x in coordinates) {
            coordinates[x] = Number(coordinates[x]);
            if (typeof coordinates[x] !== 'number' ||  isNaN(coordinates[x]) ) throw 'The parkingLotCoordinates should only contain numbers';
        }

        if(!parklotLocationZipCode.match(/^\d{5}(?:[-\s]\d{4})?$/)) throw 'The zip code not valid.';

        if(disabilityFriendly !== 'True' && disabilityFriendly !== 'False') throw 'The disabilityFriendly should be Boolean';

        suitableVehicleSize = validation.checkStringArray(suitableVehicleSize, 'suitableVehicleSize');

        idfromUploader = validation.checkId(idfromUploader, 'idfromUploader');

        let  Conditions=  Object.values(trafficConditions);
        for (x in Conditions) {
            validation.checkString (Conditions[x], 'trafficConditions');
        };

        capacity = validation.checkIntNumber(capacity, 'capacity');
        
        const parkLotCollection = await parklot();

        let newParkLot = {

            isDelete: false,
            parkLotname : parkLotname , 
            parkingChargeStandard : parkingChargeStandard, 
            parkingLotCoordinates : parkingLotCoordinates,  
            parklotLocationZipCode : parklotLocationZipCode, 
            disabilityFriendly :disabilityFriendly,
            suitableVehicleSize : suitableVehicleSize, 
            idfromUploader : idfromUploader,
            trafficConditions : trafficConditions,
            rating : 0,
            parkingLotCapacity : capacity,
            totalCommentRating : 0,
            totalCommentNumber : 0
        };

        const insertInfo = await parkLotCollection.insertOne(newParkLot);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

        const newId = insertInfo.insertedId.toString();
        const parkLot = await this.get(newId);
        return parkLot
    },


    async findAllParkingLotsByUploaderId(userId) {
        const parkLotCollection = await parklot();
        const parkLotData = await parkLotCollection.find( {idfromUploader : userId }).toArray();
        return parkLotData;
    }

}