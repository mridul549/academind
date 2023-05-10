const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).json({
        message: "Handling GET requests in the orders route"
    })
})

router.post('/', (req,res) => {
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    };
    res.status(200).json({
        message: "Handling POST requests in the orders route",
        order: order
    })
})

router.get('/:orderid', (req,res) => {
    res.status(200).json({
        message: "order details",
        orderID: req.params.orderid
    })
})

module.exports = router;