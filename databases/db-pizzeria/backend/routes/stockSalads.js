let express = require('express');
let router = express.Router();
let cors = require('cors');
let stockSaladController = require('../components/stock/salads/controller');

router.get('/', cors(), stockSaladController.stockSalad);

module.exports = router;