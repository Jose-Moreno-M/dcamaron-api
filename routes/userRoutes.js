const usersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {

    //401 UNAUTHORIZED
    app.post('/api/users/create', usersController.register);
    app.post('/api/users/login', usersController.login);
}