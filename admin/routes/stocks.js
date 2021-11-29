const express = require('express');
var path = require('path');
const multer  = require('multer');

//upload image to public/images
const upload = multer({ dest: path.join(path.dirname(__dirname), '/public/images') })

const controller = require('../controllers/product.controller');
const router = express.Router();


// router.get('/insertSample', controller.insertSample);
router.get('/detail', controller.getProductDetail);
router.post('/add', upload.single('img'), controller.addProduct);
router.post('/detail',  upload.single('img'), controller.updateProduct);
router.post('/delete', controller.deleteProduct);
router.get('/:page', controller.getProducts);
router.get('/', controller.index);




module.exports = router;
