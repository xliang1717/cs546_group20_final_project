const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const { ObjectId } = require('mongodb');

module.exports = {
 
  async addNewCarToUser(newCar, userId) {
      const userCollection = await users();
      let onecar=await userCollection.findOne({ _id: ObjectId(userId), myCar: newCar });
      if(onecar==null){
        let updateInfo = await userCollection.updateOne({ _id: ObjectId(userId) },{ $push: { myCar: newCar } });
        if (!updateInfo.modifiedCount) throw 'Add car failed.';
      }else{
        throw 'No same car is allowed to add.';
      }
   
  },

  async removeCarFromUser(carname, userId) {
      const userCollection = await users();
      let myCars = await this.getMyCarForUser(userId);
      if (myCars.length == 0 || (myCars.length > 0 && !myCars.includes(carname))) {
          throw "This car dose not exist.";
      }
      let removeInfo = await userCollection.updateOne(
          { _id: ObjectId(userId) },
          { $pull: { myCar: carname } }
      );
      if (!removeInfo.modifiedCount) throw 'Remove car failed.';
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