const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');

module.exports = {

    async create(req, res) {

        const order = req.body;

        Order.create(order, async (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de crear la orden',
                    error: err
                });
            }

            for (const product of order.products) {
                await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                    if (err) {
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con la creacion de los productos en la orden',
                            error: err
                        });
                    }
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha creado correctamente',
                data: `${id}` // EL ID DE LA NUEVA CATEGORIA
            });

        });

    },

    findByStatus(req, res) {
        const status = req.params.status;

        Order.findByStatus(status, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de buscar la orden',
                    error: err
                });
            }

            return res.status(201).json(data);

        });
    },

    findByClientAndStatus(req, res) {
        const status = req.params.status;
        const id_client = req.params.id_client;

        Order.findByClientAndStatus(id_client,status, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de buscar la orden',
                    error: err
                });
            }

            return res.status(201).json(data);

        });
    },

    updateToCooking(req, res) {
        const order = req.body;

        Order.updateToCooking(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}`
            });
        });
    },

    updateToReady(req, res) {
        const order = req.body;
        console.log(`STATUS DE LA ORDEN ${order.status}`)

        Order.updateToReady(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}`
            });
        });
    },

    updateToDelivered(req, res) {
        const order = req.body;
        console.log(`STATUS DE LA ORDEN ${order.status}`)

        Order.updateToDelivered(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}`
            });
        });
    }
}