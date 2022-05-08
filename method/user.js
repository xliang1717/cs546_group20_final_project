const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const { ObjectId } = require('mongodb');
const validation = require('../validation');
const bcrypt = require('bcrypt');
const saltRounds = 16;


module.exports = {
  async get(id) {
    //     if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
    //     id = validation.checkId(id,'ID');

    const userCollection = await users();
    const userData = await userCollection.findOne({ _id: ObjectId(id) });
    if (userData === null) throw 'No user with that id';
    userData._id = userData._id.toString();
    return userData;
  },

  async getAll() {
    if (arguments.length !== 0) throw "There should not input an argument !";
    const userCollection = await users();
    const usersList = await userCollection.find({}).toArray();
    if (usersList.length == 0) return [];
    for (let i = 0; i < usersList.length; i++) {
      usersList[i]._id = usersList[i]._id.toString();
    }

    console.log(usersList)


    return usersList;
  },

  async addComment(UserId, commentId) {
    const userCollection = await users();
    return userCollection.updateOne({ _id: ObjectId(UserId) }, { $push: { comment: commentId } });
  },

  async create(isDelete, nickname, lastName, firstName, email, reviews, preferLocation, carsSize, password, collectionCarParks, addedCarParks, carParkingLocation) {

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
      nickname: nickname,
      lastName: lastName,
      firstName: firstName,
      email: email,
      comment: reviews,
      preferLocation: preferLocation,
      carsSize: carsSize,
      myCar: [],
      password: password,
      collectionCarParks: collectionCarParks,
      addedCarParks: addedCarParks,
      carParkingLocation: carParkingLocation

    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

    const newId = insertInfo.insertedId.toString();
    const user = await this.get(newId);
    return user
  },

  async addCar(UserId, carname) {

    const userCollection = await users();

    //const user = await userCollection.findOne({ _id: ObjectId(UserId )});

    let updateInfoCar = userCollection.updateOne({ _id: ObjectId(UserId) }, { $push: { myCar: carname } });
    if (updateInfoCar.modifiedCount === 0) throw "update car failed";
    return await this.get(id);
  },

  async updateUser(id, nickname, firstName, lastName, email, password) {
    //if (arguments.length !== 6) throw 'wrong number of parameters passed';
    id = validation.checkId(id, 'ID');
    nickname = validation.checkString(nickname, 'username');
    firstName = validation.checkString(firstName, 'firstName');
    lastName = validation.checkString(lastName, 'lastName');
    email = validation.checkString(email, 'email');
    password = validation.checkString(password, 'password');
    const hash = await bcrypt.hash(password, saltRounds);
    const userCollection = await users();
    const old = await userCollection.findOne({ _id: ObjectId(id) });

    let userUpdateInfo = {
      nickname: nickname,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      myCar: old.myCar,
      preferLocation: old.preferLocation,
      collectionCarParks: old.collectionCarParks,
      carParkingLocation: old.carParkingLocation,
      comment: old.comment,
      addedCarParks: old.addedCarParks


    };

    const updateInfo = await userCollection.replaceOne(
      { _id: ObjectId(id) }, userUpdateInfo);

    if (!updateInfo.modifiedCount) throw 'Update failed';

    const updatedUser = await this.get(id);

    return updatedUser;

  }

}