let express = require('express');
let router = express.Router();
let cors = require('cors');
let stockIngController = require('../components/stock/ingredients/controller');

router.get('/pizza', cors(), stockIngController.getPizzaIngredients);
router.get('/drink', cors(), stockIngController.getDrinks);
router.get('/flavoring', cors(), stockIngController.getFlavorings);
router.get('/extras', cors(), stockIngController.getExtras);

module.exports = router;