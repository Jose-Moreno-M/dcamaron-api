const categoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app) => {

    //401 UNAUTHORIZED
    app.post('/api/categories/create', passport.authenticate('jwt', {session:false}), categoriesController.create);
    app.get('/api/categories/getAll', passport.authenticate('jwt', {session:false}), categoriesController.getAll);

}