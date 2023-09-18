let express = require('express');
let router = express.Router();
let cors = require('cors');
let sizeController = require('../components/stock/sizes/controller');

router.get('/pizza', cors(), sizeController.getPizzaSizes);
router.get('/drink', cors(), sizeController.getDrinkSizes);
router.get('/salad', cors(), sizeController.getSaladSizes);
module.exports = router;