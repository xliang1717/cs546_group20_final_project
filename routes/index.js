const userRoutes = require('./user');
const parklotRoutes = require('./parklot');
const commentRoutes = require('./comment');
const petrolStationRoutes = require('./petrolStation');
const filterRoutes = require('./filter');
const myCollectionRoutes =  require('./myCollection');
const myComementsRoutes =  require('./myComments');
const myParkingLotsRoutes =  require('./myParkingLots');
const myCarRoutes =  require('./myCar');
const userRoute2 = require('./users');

const constructorMethod = (app) => {
    app.use('/user', userRoutes);
    app.use('/parklot', parklotRoutes);
    app.use('/comment', commentRoutes);
    app.use('/petrolStation', petrolStationRoutes);
    app.use('/filter', filterRoutes);
    app.use('/myCollection', myCollectionRoutes);
    app.use('/myComments', myComementsRoutes);
    app.use('/myParkingLots', myParkingLotsRoutes);
    app.use('/myCar', myCarRoutes);
    app.use('/', userRoute2);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });;
    });
};

module.exports = constructorMethod;