let router = require('express').Router()
let UserController = require('../controllers/UserController')
let cors = require('cors');

router.options('/', cors())
router.post('/agent', UserController.createAgent)
router.post('/admin', UserController.createAdmin)
router.get('/by-role/:alias', UserController.getUsersByRole)
router.post('/part', UserController.createParticipante)
router.post('/agent/activate', UserController.activateAgent)
router.post('/part/activate', UserController.activateParticipant)
router.post('/agent/ban', UserController.banAgent)
router.post('/part/ban', UserController.banParticipant)
router.post('/agent/update', UserController.update)
router.post('/part/update', UserController.update)
router.post('/part/update/card', UserController.updateCreditCard);

module.exports = router;