const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

const Product = require('../models/products');
const { default: mongoose } = require('mongoose');

router.get('/', productController.homeGet)
router.post('/', productController.homePost)

router.get('/:productid', productController.getProductId);
router.delete('/:productId', productController.deleteProductByID);
router.patch('/:productID', productController.patchProductByID);
module.exports = router;