const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');

/*
    Routes import
*/
const usersRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const productsRoutes = require('./routes/productRoutes');
const ordersRoutes = require('./routes/orderRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by')

app.set('port', port);

const upload = multer({
    storage: multer.memoryStorage()
});

/*
    Calling routes
*/
usersRoutes(app, upload);
categoriesRoutes(app);
productsRoutes(app, upload);
ordersRoutes(app);

server.listen(3000, '192.168.1.66' || 'localhost', function(){
    console.log('Aplicacion de NodeJS ' + process.pid + ' iniciada...');
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend')
});

//Error management
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

//200 es una respuesta exitosa
//404 significa que la URL no existe
//500 error interno del servidor