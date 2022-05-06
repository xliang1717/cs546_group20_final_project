const dbConnection = require('./config/mongoConnection');
const method = require('./method');
const user = method.user;
const parklot = method.parklot;
const comment = method.comment;
const petrolStation = method.petrolStation;

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
        ['hudson river parklot', 'little man parklot'],
        ['stevens parklot', 'Tree parklot'],
        'hudson river parklot 2C'
    );
    //const B = await user.create('Simpsons','Hanmierten','luyis','luyis@gmail.com',['Hudson River',' 5th street'], ['large','small'],'7890password', ['little man parklot'], ['stevens parklot'], 'little man parklot 4a');

    const idUA = A._id.toString();
    //const idUB = B._id.toString();


    const PA = await parklot.create('little man', {"half hour ~ 1 hour" : '5', "1 hour ~ 1 and half hour" : '10', "1 and half hour ~ 2 hour" : '13', " above 2 hour" : '20 '}, {"Longitude" : '40.741' , "Latitude" : '74.029'}, '07030', 'True', ['medium', 'small'], idUA, {"8:00 ~ 15: 00" : 'light', "15:00 ~ 17:00": 'heavy'}, 560)

    const idPA = PA._id.toString();
    //const idPB = PB._id.toString();

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

    await dbConnection.closeConnection();
}

main();
