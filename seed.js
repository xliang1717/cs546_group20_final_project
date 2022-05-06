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
    // 40.74119115392377, -74.02962195701149;

    const PA = await parklot.create(
        false,
        'little man',
        {
            'half hour ~ 1 hour': '5',
            '1 hour ~ 1 and half hour': '10',
            '1 and half hour ~ 2 hour': '13',
            ' above 2 hour': '20 ',
        },
        { Longitude: 40.741, Latitude: 74.029 },
        '07030',
        true,
        ['small'],
        idUA,
        { '8:00 ~ 15: 00': 'light', '15:00 ~ 17:00': 'heavy' },
        5,
        560
    );
    const PC = await parklot.create(
        false,
        'little man2',
        {
            'half hour ~ 1 hour': '5',
            '1 hour ~ 1 and half hour': '10',
            '1 and half hour ~ 2 hour': '13',
            ' above 2 hour': '20 ',
        },
        { Longitude: 40.741, Latitude: 74.029 },
        '07030',
        true,
        ['medium'],
        idUA,
        { '8:00 ~ 15: 00': 'light', '15:00 ~ 17:00': 'heavy' },
        5,
        560
    );
    const PB = await parklot.create(
        false,
        'little man3',
        {},
        { Longitude: 40.742, Latitude: 74.028 },
        '07030',
        true,
        ['medium', 'small'],
        idUA,
        { '8:00 ~ 15: 00': 'light', '15:00 ~ 17:00': 'heavy' },
        5,
        560
    );
    const PD = await parklot.create(
        false,
        'little man4',
        {},
        { Longitude: 40.742, Latitude: 74.028 },
        '07030',
        false,
        ['large'],
        idUA,
        { '8:00 ~ 15: 00': 'light', '15:00 ~ 17:00': 'heavy' },
        5,
        560
    );
    // 40.74119115392377, -74.02962195701149;
    //const PB = await parklot.create('stevens park lot', {"half hour ~ 1 hour" : '$5', "1 hour ~ 1 and half hour" : '$10', "1 and half hour ~ 2 hour" : '$13', " above 2 hour" : ' $20 '}, {"Longitude" : '138W' , "latitude" : '51N'}, 944458, true, ['medium', 'small'], idUB, {"8:00 ~ 15: 00" : 'light', "15:00 ~ 17:00": 'heavy'})

    const idPA = PA._id.toString();
    //const idPB = PB._id.toString();

    const comm1 = await comment.create(
        false,
        'Harry pot',
        ['new driver friendly', 'small size'],
        '09/12/2020',
        idPA,
        idUA,
        'The best parklot ever',
        5
    );
    const comm2 = await comment.create(
        false,
        'Panda Smith',
        ['low fee'],
        '07/13/2022',
        idPA,
        idUA,
        'very nice parking lot ',
        4
    );

    const comment1Id = comm1._id;
    const comment2Id = comm2._id;

    //await comment.remove(comment1Id);
    // await comment.remove(comment2Id);

    await petrolStation.create('Hoboken', { Longitude: '137.6W', latitude: '50.1N' }, 'Thirsty station', [
        'gaslion',
        'diesel',
    ]);

    await user.addComment(idUA, comment1Id);
    await user.addComment(idUA, comment2Id);

    await user.getAll();

    await dbConnection.closeConnection();
}

main();
