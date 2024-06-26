const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) =>{
    const sql = `
        SELECT
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.phone,
            U.image,
            U.password,
            json_arrayagg(
                json_object(
                    'id', CONVERT(R.id, char),
                    'name', R.name,
                    'image', R.image,
                    'route', R.route
                )
            ) as roles
        FROM
            users AS U
        INNER JOIN
            user_has_roles AS UHR
        ON
            UHR.id_user = U.id
        INNER JOIN 
            roles AS R
        ON 
            UHR.id_rol = R.id
        WHERE
            U.id = ?
        group by U.id;
    `;

    db.query(

        sql,
        [id],
        (err, res)=>{
            if(err){
                console.log('Error: ',err);
                result(err, null);
            } else {
                console.log('Usuario obtenido: ', res)
                result(null, res);
            }
        }

    );
}

User.findByEmail = (email, result) =>{
    const sql = `
        SELECT
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.phone,
            U.image,
            U.password,
            json_arrayagg(
                json_object(
                    'id', CONVERT(R.id, char),
                    'name', R.name,
                    'image', R.image,
                    'route', R.route
                )
            ) as roles
        FROM
            users AS U
        INNER JOIN
            user_has_roles AS UHR
        ON
            UHR.id_user = U.id
        INNER JOIN 
            roles AS R
        ON 
            UHR.id_rol = R.id
        WHERE
            U.email = ?
        group by U.id;
    `;

    db.query(

        sql,
        [email],
        (err, res)=>{
            if(err){
                console.log('Error: ',err);
                result(err, null);
            } else {
                console.log('Usuario obtenido: ', res[0]);
                result(null, res[0]);
            }
        }

    );
}

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
    INSERT INTO users(
        email, 
        name, 
        lastname, 
        phone, 
        image, 
        password, 
        created_at, 
        updated_at)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user.email, 
            user.name, 
            user.lastname,
            user.phone, 
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res)=>{
            if(err){
                console.log('Error: ',err);
                result(err, null);
            } else {
                console.log('ID del nuevo usuario: ', res.insertId)
                result(null, res.insertId);
            }
        }
    );
}

module.exports = User;