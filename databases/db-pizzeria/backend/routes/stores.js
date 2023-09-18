let express = require('express');
let router = express.Router();
let cors = require('cors');
let storeController = require('../components/stores/controller');

router.get('/', cors(), storeController.getStores);
router.post('/', cors(), storeController.createStore);


module.exports = router;