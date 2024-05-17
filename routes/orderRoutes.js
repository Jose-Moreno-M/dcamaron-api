const passport = require('passport');
const ordersController = require('../controllers/ordersController');

module.exports = (app) => {

    //401 UNAUTHORIZED
    app.post('/api/orders/create', passport.authenticate('jwt', {session:false}), ordersController.create);
    
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session:false}), ordersController.findByStatus);
    app.get('/api/orders/findByClientAndStatus/:id_client/:status', passport.authenticate('jwt', {session:false}), ordersController.findByClientAndStatus);
    
    app.put('/api/orders/updateToCooking', passport.authenticate('jwt', {session:false}), ordersController.updateToCooking);
    app.put('/api/orders/updateToReady', passport.authenticate('jwt', {session:false}), ordersController.updateToReady);
    app.put('/api/orders/updateToDelivered', passport.authenticate('jwt', {session:false}), ordersController.updateToDelivered);
}