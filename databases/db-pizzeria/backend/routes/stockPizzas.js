let express = require('express');
let router = express.Router();
let cors = require('cors');
let stockPizzaController = require('../components/stock/pizzas/controller');

router.get('/', cors(), stockPizzaController.stockPizza);
router.post('/', stockPizzaController.registerStockPizza);

module.exports = router;