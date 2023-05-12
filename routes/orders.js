const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');

router.get('/', orderController.getOrders)
router.post('/', orderController.makeOrder)

router.get('/:orderid', orderController.getOrderByID)
router.delete('/:orderid', orderController.deleteOrderByID)
 
module.exports = router;