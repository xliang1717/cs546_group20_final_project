const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const { ObjectId } = require('mongodb');

module.exports = {
 
  async addNewCarToUser(newCar, userId) {
      const userCollection = await users();
      let onecar=await userCollection.findOne({ _id: ObjectId(userId), myCar: newCar });
      if(onecar==null){
        await userCollection.updateOne({ _id: ObjectId(userId) },{ $push: { myCar: newCar } });
      }else{
        throw 'No same car is allowed to add.';
      }
   
  },

  async removeCarFromUser(carname, userId) {
      const userCollection = await users();
      let removeInfo = await userCollection.updateOne(
          { _id: ObjectId(userId) },
          { $pull: { myCar: carname } }
      );
      if (!removeInfo.modifiedCount) throw 'ERROR: Remove car failed.';
      return this.getMyCarForUser(userId);
  },

  async getMyCarForUser(userId) {
      const userCollection = await users();
      let myCollection = await userCollection.findOne(
          { _id: ObjectId(userId) },
          {  projection: { myCar: 1 } }
      );
      let myCars = myCollection.myCar;
      return myCars;
  }
}