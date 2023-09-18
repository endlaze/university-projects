let router = require('express').Router();
let cors = require('cors');
let BidController = require('../controllers/BidController')

router.options('/', cors())
router.post('/', BidController.create)
router.get('/params/:Rol', BidController.params)
router.post('/params', BidController.updateParams)
router.get('/maxBid/:IdSubasta/:Rol', BidController.greatestBid)
router.get('/auction/:IdSubasta/:Alias/:Rol', BidController.bidByAuction)
router.get('/user/:AliasConsulta/:AliasComprador/:Rol', BidController.winnerBidsByUser)

module.exports = router