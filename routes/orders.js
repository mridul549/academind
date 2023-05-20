const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');
const checkAuth = require('../middleware/check-auth')

router.get('/', checkAuth, orderController.getOrders)
router.post('/', checkAuth, orderController.makeOrder)

router.get('/:orderid', checkAuth, orderController.getOrderByID)
router.delete('/:orderid', checkAuth, orderController.deleteOrderByID)
 
module.exports = router;