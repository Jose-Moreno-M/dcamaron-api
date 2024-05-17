const db = require('../config/config');

const Order = {};

Order.create = (order, result) => {

    const sql = `
    INSERT INTO orders(
        id_client,
        status,
        timestamp,
        created_at,
        updated_at
    )
    VALUES(?, ?, ?, ?, ?);
    `;

    db.query(
        sql,
        [
            order.id_client,
            'PAGADO', //1.PAGADO, 2.COCINANDO, 3.LISTO, 4.ENTREGADO
            Date.now(),
            new Date(),
            new Date()
        ],
        (err, res)=>{
            if(err){
                console.log('Error: ',err);
                result(err, null);
            } else {
                console.log('ID de la nueva orden: ', res.insertId)
                result(null, res.insertId);
            }
        }
    );

}

Order.findByStatus = (status, result) => {
    const sql = `
    SELECT 
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        O.status, 
        O.timestamp,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'phone', U.phone
        ) AS client,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) AS products
    FROM 
        orders as O
    INNER JOIN
        users as U
    ON 
        U.id = O.id_client
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN 
        products AS P
    ON
        P.id = OHP.id_product
    WHERE status = ?
    GROUP BY O.id
    ORDER BY O.timestamp desc;
    `;

    db.query(
        sql, 
        status,
        (err, data)=>{
            if(err){
                console.log('Error: ',err);
                result(err, null);
            } else {
                result(null, data);
            }
        }
    );
}

Order.findByClientAndStatus = (id_client, status, result) => {
    const sql = `
    SELECT 
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        O.status, 
        O.timestamp,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'phone', U.phone
        ) AS client,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) AS products
    FROM 
        orders as O
    INNER JOIN
        users as U
    ON 
        U.id = O.id_client
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN 
        products AS P
    ON
        P.id = OHP.id_product
    WHERE O.id_client = ? AND O.status = ?
    GROUP BY O.id
    ORDER BY O.timestamp desc;
    `;

    db.query(
        sql, 
        [
            id_client, 
            status
        ],
        (err, data)=>{
            if(err){
                console.log('Error: ',err);
                result(err, null);
            } else {
                result(null, data);
            }
        }
    );
}

Order.updateToCooking = (id_order, result) => {

    const sql = `
        UPDATE
            orders
        SET
            updated_at = ?,
            status = ?
        WHERE 
            id = ?
    `;

    db.query(
        sql,
        [
            new Date(),
            'COCINANDO',
            id_order
        ],
        (err, data)=>{
            if(err){
                console.log('Error: ',err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    );
}

Order.updateToReady = (id_order, result) => {

    const sql = `
        UPDATE
            orders
        SET
            updated_at = ?,
            status = ?
        WHERE 
            id = ?
    `;

    db.query(
        sql,
        [
            new Date(),
            'LISTO',
            id_order
        ],
        (err, data)=>{
            if(err){
                console.log('Error: ',err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    );
}

Order.updateToDelivered = (id_order, result) => {

    const sql = `
        UPDATE
            orders
        SET
            updated_at = ?,
            status = ?
        WHERE 
            id = ?
    `;

    db.query(
        sql,
        [
            new Date(),
            'ENTREGADO',
            id_order
        ],
        (err, data)=>{
            if(err){
                console.log('Error: ',err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    );
}

module.exports = Order;