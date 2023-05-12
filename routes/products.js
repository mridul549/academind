const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const multer = require('multer');

const Product = require('../models/products');
const { default: mongoose } = require('mongoose');

// implementing all the below functions to manage file uploads
// cb -> callback
// where and how files are stored
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

// filters files
const fileFilter = (req, file, cb) => {
    // if -> accept a file, else -> reject
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// uploads files with custom settings
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5 // 5MB limit
    },
    fileFilter: fileFilter
})

router.get('/', productController.getAllProducts)
router.post('/', upload.single('productImage') ,productController.createNewProduct)

router.get('/:productid', productController.getProductId);
router.delete('/:productId', productController.deleteProductByID);
router.patch('/:productID', productController.patchProductByID);

module.exports = router;