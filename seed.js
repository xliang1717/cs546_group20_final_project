const dbConnection = require('./config/mongoConnection');
const method = require('./method');
const user = method.user;
const parklot = method.parklot;
const comment = method.comment;
const petrolStation = method.petrolStation;
const myCollection = method.myCollection;
const myArea = method.myArea;
const myCar = method.myCar;

async function main() {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();

    const A = await user.create(
        false,
        'A Flourish Tree',
        'LosBoger',
        'Nick',
        'nicklosboger@gmail.com',
        [],
        ['Hudson River', ' 2en street'],
        ['medium', 'small'],
        '123456password',
        [],
        ['stevens parklot', 'Tree parklot'],
        'hudson river parklot 2C'
    );
    //const B = await user.create('Simpsons','Hanmierten','luyis','luyis@gmail.com',['Hudson River',' 5th street'], ['large','small'],'7890password', ['little man parklot'], ['stevens parklot'], 'little man parklot 4a');

    const idUA = A._id.toString();
    //const idUB = B._id.toString();


    //const ParkingLotA = await parklot.create('Parking Lot 1', { "half hour ~ 1 hour": '5', "1 hour ~ 1 and half hour": '10', "1 and half hour ~ 2 hour": '13', " above 2 hour": '20 ' }, { "Longitude": '137W', "latitude": '50N' }, 700037, true, ['medium', 'small'], idUA, { "8:00 ~ 15: 00": 'light', "15:00 ~ 17:00": 'heavy' }, 5, 560)
    //const PB = await parklot.create('stevens park lot', {"half hour ~ 1 hour" : '$5', "1 hour ~ 1 and half hour" : '$10', "1 and half hour ~ 2 hour" : '$13', " above 2 hour" : ' $20 '}, {"Longitude" : '138W' , "latitude" : '51N'}, 944458, true, ['medium', 'small'], idUB, {"8:00 ~ 15: 00" : 'light', "15:00 ~ 17:00": 'heavy'})
    //const ParkingLotC = await parklot.create('Parking Lot 2', { "half hour ~ 1 hour": '5', "1 hour ~ 1 and half hour": '10', "1 and half hour ~ 2 hour": '13', " above 2 hour": '20 ' }, { "Longitude": '138W', "latitude": '51N' }, 700037, true, ['medium', 'small'], idUA, { "8:00 ~ 15: 00": 'light', "15:00 ~ 17:00": 'heavy' }, 5, 560)
    const PA = await parklot.create('little man', {"half hour ~ 1 hour" : '5', "1 hour ~ 1 and half hour" : '10', "1 and half hour ~ 2 hour" : '13', " above 2 hour" : '20 '}, {"Longitude" : '40.741' , "Latitude" : '74.029'}, '07030', 'True', ['medium', 'small'], idUA, {"8:00 ~ 15: 00" : 'light', "15:00 ~ 17:00": 'heavy'}, 560);

    const ParkingLotA = await parklot.create('Parking Lot 1', {"half hour ~ 1 hour" : '5', "1 hour ~ 1 and half hour" : '10', "1 and half hour ~ 2 hour" : '13', " above 2 hour" : '20 '}, {"Longitude" : '40.741' , "Latitude" : '74.029'}, '07030', 'True', ['medium', 'small'], idUA, {"8:00 ~ 15: 00" : 'light', "15:00 ~ 17:00": 'heavy'}, 560);
    const ParkingLotC = await parklot.create('Parking Lot 2', {"half hour ~ 1 hour" : '5', "1 hour ~ 1 and half hour" : '10', "1 and half hour ~ 2 hour" : '13', " above 2 hour" : '20 '}, {"Longitude" : '40.741' , "Latitude" : '74.029'}, '07030', 'True', ['medium', 'small'], idUA, {"8:00 ~ 15: 00" : 'light', "15:00 ~ 17:00": 'heavy'}, 560);

    const idPA = ParkingLotA._id.toString();
    //const idPB = PB._id.toString();
    const idPC = ParkingLotC._id.toString();

    // Testing myCollection method
    console.log('Testing myCollection method');
    let userCollection = await myCollection.getCollectionForUser(idUA);
    console.log('Initial Empty Collection, the size is: ' + userCollection.length);
    await myCollection.addParkingLotToUserCollection(idPA, idUA);
    userCollection = await myCollection.addParkingLotToUserCollection(idPC, idUA);
    try {
        await myCollection.addParkingLotToUserCollection(idPC, idUA);
    } catch (e) {
        console.log(e);
    }
    console.log('Two parking lots have been added into User Collection: ');
    for (let i = 0; i < userCollection.length; i++) {
        console.log(userCollection[i]);
    }
    userCollection = await myCollection.removeParkingLotFromUserCollection(idPA, idUA);
    console.log('After one parking lot has been removed into User Collection, the size is: ' + userCollection.length);
    try {
        await myCollection.removeParkingLotFromUserCollection(idPA, idUA);
    } catch (e) {
        console.log(e);
    }
    // Add it back for future API test
    await myCollection.addParkingLotToUserCollection(idPA, idUA);

    // Testing myArea method
    console.log('Testing myArea method');
    let myAreas = await myArea.getMyAreasForUser(idUA);
    console.log('Initial Empty area for user: ' + myAreas);
    await myArea.addNewAreaToUser("Hoboken", idUA);
    await myArea.addNewAreaToUser("Jersey City", idUA);
    myAreas = await myArea.getMyAreasForUser(idUA);
    console.log('Two areas have been added into User myAreas: ');
    console.log(myAreas);
    await myArea.removeAreaFromUser("Hoboken", idUA);
    myAreas = await myArea.getMyAreasForUser(idUA);
    console.log('One area has been removed from User myAreas: ');
    console.log(myAreas);
    //Add it back for future API test
    await myArea.addNewAreaToUser("Hoboken", idUA);

    // Testing findAllParkingLotsByUploaderId
    let allParkingLotsForUser = await parklot.findAllParkingLotsByUploaderId(idUA);
    console.log(allParkingLotsForUser);


    // Testing addNewCarToUser & removeCarFromUser
    await myCar.addNewCarToUser("Tesla", idUA); 
    await myCar.addNewCarToUser("Ford", idUA); 
    let myCarsInforForUser = await myCar.addNewCarToUser("Honda", idUA);
    console.log("myCarsInforForUser.myCar");
    console.log(myCarsInforForUser);
    let myCarsInforForUser2 = await myCar.removeCarFromUser("Honda", idUA);
    console.log(myCarsInforForUser2);

    // const comm1 = await comment.create(false, 'Harry pot', ['new driver friendly', 'small size'], '09/12/2020', idPA, idUA, 'The best parklot ever', 5);
    // const comm2 = await comment.create(false, 'Panda Smith', ['low fee'], '07/13/2022', idPA, idUA, 'very nice parking lot ', 4);

    const comm1 =  await comment.create('Harry pot','Good, nice ,clean','09/12/2020', idPA, idUA,'The best parklot ever',5);
    const comm2 = await comment.create('Panda Smith','Good, nice ,clean','07/13/2022', idPA, idUA,'very nice parking lot ',4);



    const comment1Id = comm1._id
    const comment2Id = comm2._id

    //await comment.remove(comment1Id);
    // await comment.remove(comment2Id);

    await petrolStation.create('Hoboken', { longitude: '137.6', latitude: '50.1' }, 'Thirsty station', [
        'gaslion',
        'diesel',
    ]);

    await user.addComment(idUA, comment1Id);
    await user.addComment(idUA, comment2Id);

    await user.getAll();
    
    console.log("User this link to test myCollection: http://localhost:3000/myCollection/" + idUA);

    await dbConnection.closeConnection();
}

main();
