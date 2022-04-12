const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const { ObjectId } = require('mongodb');
//const validation = require('../validation');


module.exports = {
    async get(id) {
    //     if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
    //     id = validation.checkId(id,'ID');
        
        const userCollection = await users();
        const userData = await userCollection.findOne( {_id : ObjectId(id) });
        if (userData=== null) throw 'No band with that id';
        userData._id = userData._id.toString();
        return userData;
    },

    async getAll() {
        if (arguments.length !== 0) throw "There should not input an argument !";
        const userCollection = await users();
        const usersList = await userCollection.find({}).toArray();
        if (usersList.length== 0) return [];
        for(let i = 0; i < usersList.length; i++) {
            usersList[i]._id = usersList[i]._id.toString();
        }

        console.log(usersList)
        
    
        return usersList;
    },

    async addComment(UserId,commentId){
        const userCollection = await users();
        return  userCollection.updateOne( {_id : ObjectId(UserId)}, {$push : {comment : commentId}});  
    },

    async create ( isDelete,nickname, lastName, firstName, email, reviews, preferLocation, carsSize, password, collectionCarParks, addedCarParks, carParkingLocation) {

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

        
        const userCollection = await users();

        let newUser = {

            isDelete: isDelete,
            nickname : nickname, 
            lastName :lastName , 
            firstName : firstName, 
            email: email, 
            comment :reviews,
            preferLocation: preferLocation, 
            carsSize: carsSize,
            password: password, 
            collectionCarParks: collectionCarParks, 
            addedCarParks : addedCarParks, 
            carParkingLocation: carParkingLocation

        };

        const insertInfo = await userCollection.insertOne(newUser);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

        const newId = insertInfo.insertedId.toString();
        const user = await this.get(newId);
        return user
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