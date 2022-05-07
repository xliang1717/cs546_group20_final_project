const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const { ObjectId } = require('mongodb');
const validation = require('../validation');
const bcrypt = require('bcrypt');
const saltRounds = 16;


async function getAll() {
  if (arguments.length !== 0) throw 'wrong number of parameters passed';

  const userCollection = await users();

  const userList = await userCollection.find({}).toArray();
 
  for(let i = 0;i< userList.length;i++){
    userList[i]._id = userList[i]._id.toString();
  }
  return userList;


}

async function get(id) {
  if (arguments.length !== 1) throw 'wrong number of parameters passed';
  id = validation.checkId(id,'ID');
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(id) });
  if (user === null) throw 'No user with that id';
  user._id = user._id.toString();

  return user;
}

async function addComment(UserId,commentId) {


  const userCollection = await users();
  return  userCollection.updateOne( {_id : ObjectId(UserId)}, {$push : {comment : commentId}});  
}

async function create ( isDelete,nickname, lastName, firstName, email, reviews, preferLocation, myCar, password, collectionCarParks, addedCarParks, carParkingLocation) {
  
  const userCollection = await users();

  let newUser = {

      isDelete: isDelete,
      nickname : nickname, 
      lastName :lastName , 
      firstName : firstName, 
      email: email, 
      comment :reviews,
      preferLocation: preferLocation, 
      myCar: myCar,
      password: password, 
      collectionCarParks: collectionCarParks, 
      addedCarParks : addedCarParks, 
      carParkingLocation: carParkingLocation

  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

  const newId = insertInfo.insertedId.toString();
  const user = await this.get(newId);
  return user;
}

async function checkUser(username, password){
  if (arguments.length !== 2) throw "Both username and password must be supplied";

  username = username.toLowerCase();

  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if (user == null) {
      throw "Either the username or password is invalid";
  }

  let compare = await bcrypt.compare(password, user.password);
  if(compare) {
    return {authenticated: true};
  } else{
    throw "Either the username or password is invalid";
  }

}

async function addCar(UserId, carname){

  const userCollection = await users();

  //const user = await userCollection.findOne({ _id: ObjectId(UserId )});

  let updateInfoCar  = userCollection.updateOne( {_id : ObjectId(UserId)}, {$push : {myCar:carname}}); 
  if (updateInfoCar.modifiedCount === 0 ) throw "update car failed";
  return await this.get(id);
}

async function updateUser(id, nickname, firstName, lastName, email, password) {
  //if (arguments.length !== 6) throw 'wrong number of parameters passed';
  id = validation.checkId(id, 'ID');
  nickname = validation.checkString(nickname, 'username');
  firstName = validation.checkString(firstName, 'firstName');
  lastName = validation.checkString(lastName, 'lastName');
  email = validation.checkString(email,'email');
  password = validation.checkString(password,'password');
  const hash = await bcrypt.hash(password, saltRounds);
  const userCollection = await users();
  const old = await userCollection.findOne({ _id: ObjectId(id) });

  let userUpdateInfo = {
    nickname : nickname, 
    firstName : firstName, 
    lastName :lastName , 
    email: email,
    password:hash,
    myCar:old.myCar,
    preferLocation:old.preferLocation,
    collectionCarParks:old.collectionCarParks,
    carParkingLocation:old.carParkingLocation,
    comment :old.comment,
    addedCarParks : old.addedCarParks


  };

  const updateInfo = await userCollection.replaceOne(
      { _id: ObjectId(id) }, userUpdateInfo);

  if (!updateInfo.modifiedCount) throw 'Update failed';

  const updatedUser = await this.get(id);

  return updatedUser;

}








// async function remove(id) {
//   if (arguments.length !== 1) throw 'wrong number of parameters passed';
//   if (!id) throw 'You must provide an id to search for';
//   if (typeof id !== 'string') throw 'id must be a string';
//   id = id.trim();
//   if (id.length === 0) throw 'id cannot be an empty string or string with just spaces';
//   if (!ObjectId.isValid(id)) throw 'invalid object ID';

//   const userCollection = await user();
//   const rname = await userCollection.findOne({ _id: ObjectId(id) });
//   const deletionInfo = await userCollection.deleteOne({ _id: ObjectId(id) });

//   if (deletionInfo.deletedCount === 0) {
//       throw `Could not delete user with id of ${id}`;
//   }
//   let nameRemove = rname.name;
//   return `${nameRemove} has been successfully deleted!`;
// }
// async function rename(id, newName) {
//   if (arguments.length !== 2) throw 'wrong number of parameters passed'
//   if (!id) throw 'You must provide an id to search for';
//   if (typeof id !== 'string') throw 'Id must be a string';
//   id = id.trim();
//   if(id.length === 0) throw 'id cannot be an empty string or string with just spaces';
//   if (!ObjectId.isValid(id)) throw 'invalid object ID';
//   if (!newName) throw 'You must provide a new name';
//   if (typeof newName !== 'string') throw 'New name must be a string';
//   newName = newName.trim();
//   if (newName.length === 0)
//       throw 'New name cannot be an empty string or string with just spaces';

//   const userCollection = await user();
//   const old = await userCollection.findOne({ _id: ObjectId(id) });
//   if (old === null) throw 'No user with that id';
  
//   let oldName = old.name;
//   if(oldName === newName) throw 'the new name is the same as the current value';

//   const updateduser = {
//       name: newName
//   };

//   const updatedInfo = await userCollection.updateOne(
//       { _id: ObjectId(id) },
//       { $set: updateduser }
//   );
//   if (updatedInfo.modifiedCount === 0) {
//       throw 'could not update user successfully';
//   }

//   return await this.get(id);

// }


module.exports = {
  getAll,
  get,
  addComment,
  create,
  checkUser,
  addCar,
  updateUser
  //likedParkinglot

}