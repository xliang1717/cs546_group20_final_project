const dbConnection = require('./mongoConnection');


const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  user: getCollectionFn('usersCollection'),
  parklot: getCollectionFn('parkLotsCollection'),
  comment : getCollectionFn('commentsCollection'),
  petrolStation : getCollectionFn('petrolStationsCollection')

};
