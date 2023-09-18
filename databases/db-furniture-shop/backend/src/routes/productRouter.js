import express from 'express';
import cors from 'cors';
import { newProduct, allProducts, addReview, getProdReviews} from '../controllers/productController.js'

let router = express.Router();

router.options('/', cors());
router.post('/new', cors(), newProduct)
router.get('/all', cors(), allProducts)
router.post('/review/new', cors(), addReview)
router.post('/review/all', cors(), getProdReviews)

export default router;