let router = require('express').Router();
let cors = require('cors');

let AuthController =  require('../controllers/AuthController')

router.options('/', cors());
router.post('/', AuthController.login)
module.exports = router