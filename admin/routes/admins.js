const express = require('express');

const controller = require('../controllers/admin.controller');
const router = express.Router();


// router.get('/insertSample', controller.insertSample);
router.get('/', controller.index);

module.exports = router;