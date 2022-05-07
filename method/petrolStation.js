const mongoCollections = require('../config/mongoCollections');
const petrolStations = mongoCollections.petrolStation;
const { ObjectId } = require('mongodb');
const validation = require('../validation');


module.exports = {
    async get(id) {
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
        return petrolStationsList;
    },

    async create (location, coordinate, name, type) {

        if (arguments.length !== 4) {
            throw "There must be 4 arguments !"
        }

        let namE = validation.checkString(name, 'Name');

        let locatioN = validation.checkString(location, 'location');

        let position = Object.values(coordinate);
        for(x in position) {
            position[x] = Number(position[x])
            if (typeof position[x] !=='number' || isNaN(position[x]) ) throw 'The coodinate should only contain number!';
        };

        let typE = validation.checkStringArray(type,'type');
        
        const petrolStationsCollection = await petrolStations();

        let newpetrolStation = {

            location : locatioN, 
            coordinate : coordinate, 
            name : namE, 
            type : typE

        };

        const insertInfo = await petrolStationsCollection.insertOne(newpetrolStation);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

        const newId = insertInfo.insertedId.toString();
        const petrolStation = await this.get(newId);
        return petrolStation
    }
}