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

        // name = validation.checkString(name, 'Name');

        // website = validation.checkString(website, 'Website');
        
        // if (!website.match(/^[hH][tT][tT][pP]:\/\/[wW][wW][wW]\.[a-zA-Z0-9][^\s]{4,}\.[cC][oO][mM]$/)) {
        //     throw "The website format is invalid!"
        // }

        // recordLabel = validation.checkString(recordLabel, 'RecordLabel');

        // genre = validation.checkStringArray(genre, 'Genre');

        // bandMembers = validation.checkStringArray(bandMembers,'BandMembers');

        // yearFormed =validation.checkYear(yearFormed,'YearFormed');

        
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
    },

    // async remove(id) {
    //     if(arguments.length !== 1) throw "There must be one and one only argument !";
    //     id = validation.checkId(id, 'ID');

    //     const bandCollection = await bands();
                
    //     const deleteband = await bandCollection.findOne({_id : ObjectId(id)});
    //     if (!deleteband) throw `${id} not in the database ! `; 
        
    //     const deletionInfo = await bandCollection.deleteOne({_id : ObjectId(id)});

    //     if (deletionInfo.deletedCount === 0) throw `Could not delete band with id of ${id}`;
    //     return deleteband.name +" " + "has been successfully deleted" ;
    // },

    // async update(id, name, genre, website, recordLabel, bandMembers, yearFormed) {
    //     if (arguments.length !== 7) throw 'There must be 7 argument!';

    //     id = validation.checkId(id, 'ID');

    //     name = validation.checkString(name, 'Name');

    //     website = validation.checkString(website, 'Website');
        
    //     if (!website.match(/^[hH][tT][tT][pP]:\/\/[wW][wW][wW]\.[a-zA-Z0-9][^\s]{4,}\.[cC][oO][mM]$/)) {
    //         throw "The website format is invalid !"
    //     }

    //     recordLabel = validation.checkString(recordLabel, 'RecordLabel');

    //     genre = validation.checkStringArray(genre, 'Genre');

    //     bandMembers = validation.checkStringArray(bandMembers,'BandMembers');

    //     yearFormed =validation.checkYear(yearFormed,'YearFormed');
        
    //     const bandCollection = await bands();

    //     const old = await bandCollection.findOne({_id : ObjectId(id)});
        
    //     if (!old) throw `There is no ${id} in the database !`;
    
    //     let oldAlbums = old.albums;
    //     let oldOverAllRating = old.overallRating;

    //     let update =  {
    //         name : name,
    //         genre : genre,
    //         website :website,
    //         recordLabel : recordLabel,
    //         bandMembers : bandMembers,
    //         yearFormed : yearFormed,
    //         albums : oldAlbums,
    //         overallRating : oldOverAllRating
    //     };

    //     const updatedInfo = await bandCollection.replaceOne(
    //         {_id : ObjectId(id)},
    //          update
    //     );

    //     if (updatedInfo.modifiedCount === 0) {
    //         throw " Could not update";
    //     }

    //     return await this.get(id);

    // }


}