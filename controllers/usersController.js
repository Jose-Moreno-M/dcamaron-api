const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Rol = require('../models/rol');

module.exports = {

    login(req, res){

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la búsqueda del usuario',
                    error: err
                });
            }
            
            if(!myUser){
                return res.status(401).json({ //El cliente no tiene autorización para la petición
                    success: false,
                    message: 'El email no fue encontrado',
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if(isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});
                const data = {
                    id: `${myUser.id}`,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    password: myUser.password,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                };

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data //ID del usuario registrado
                });

            } else {
                return res.status(401).json({ //El cliente no tiene autorización para la petición
                    success: false,
                    message: 'La contraseña es incorrecta',
                });
            }           
        });

    },

    register(req, res){
        const user = req.body; //Capturar datos enviados por el usuario
        User.create(user, (err, data) => {

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            

            user.id = data; //id del usuario
            const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
            user.session_token = `JWT ${token}`;

            Rol.create(user.id, 2, (err, data) => {
                
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del rol de usuario',
                        error: err
                    });
                }
                
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizó correctamente',
                    data: user
                });

            });
            
        });
    }
}