let router = require('express').Router();
let cors = require('cors');
let AuctionController = require('../controllers/AuctionController')

router.options('/', cors())
router.post('/', AuctionController.create)
router.get('/subcategory/:IdSubcategoria/:Alias/:Rol', AuctionController.auctionBySubcategory)
router.get('/user/:AliasConsulta/:AliasVendedor/:Rol', AuctionController.auctionByUser)
router.get('/expired/:Alias', AuctionController.expAuctionsByUser)
router.post('/expired', AuctionController.restartExpAuction)
router.get('/allCategories', AuctionController.categories)


module.exports = router