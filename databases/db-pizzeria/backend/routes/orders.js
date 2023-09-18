let express = require('express');
let router = express.Router();
let cors = require('cors');
let orderController = require('../components/orders/controller');

router.options('/', cors());
router.post('/register', cors(), orderController.registerOrder)

module.exports = router;
