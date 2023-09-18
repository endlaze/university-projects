let express = require('express');
let router = express.Router();
let cors = require('cors');
let userController = require('../components/users/controller');

router.options('/', cors());
router.post('/login', cors(), userController.login);
router.post('/register', cors(), userController.register);
module.exports = router;