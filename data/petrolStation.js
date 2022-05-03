const mongoCollections = require('../config/mongoCollections');
const petrolStations = mongoCollections.petrolStation;
const { ObjectId } = require('mongodb');
//const validation = require('../validation');


module.exports = {
    async get(id) {
    //     if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
    //     id = validation.checkId(id,'ID');
        
        const petrolStationCollection = await petrolStations();
        const petrolStationData = await petrolStationCollection.findOne( {_id : ObjectId(id) });
        if (petrolStationData=== null) throw 'No band with that id';
        petrolStationData._id = petrolStationData._id.toString();
        return petrolStationData;
    },

    async getAll() {
        if (arguments.length !== 0) throw "There should not input an argument !";
        const petrolStationCollection = await petrolStations();
        const petrolStationsList = await petrolStationCollection.find({}).toArray();
        if (petrolStationsList.length== 0) return [];
        for(let i = 0; i < petrolStationsList.length; i++) {
            petrolStationsList[i]._id = petrolStationsList[i]._id.toString();
        }
        
        console.log(petrolStationsList)        
        return petrolStationsList;
    },

    async create (location, coordinate, name, type) {

        // if (arguments.length !== 6) {
        //     throw "There must be 6 arguments !"
        // }

        
        const petrolStationsCollection = await petrolStations();

        let newpetrolStation = {

            location : location, 
            coordinate : coordinate, 
            name : name, 
            type : type

        };

        const insertInfo = await petrolStationsCollection.insertOne(newpetrolStation);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

        const newId = insertInfo.insertedId.toString();
        const petrolStation = await this.get(newId);
        return petrolStation
    }


}