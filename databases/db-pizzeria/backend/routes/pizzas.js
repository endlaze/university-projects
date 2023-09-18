let express = require('express');
let router = express.Router();
let cors = require('cors');
let pizzaController = require('../components/pizzas/controller');

router.options('/', cors());
router.get('/new', cors(), pizzaController.newPizza)

module.exports = router;
