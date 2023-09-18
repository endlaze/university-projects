import express from 'express';
import cors from 'cors';
import { newAddress, validateCoupon, createClient, authClient, checkClientExists, createCoupon, getAllUserCoupons, getUsrInfo} from '../controllers/clientController.js'

let router = express.Router();

router.options('/', cors());
router.post('/create', cors(), createClient)
router.post('/auth', cors(), authClient)
router.post('/exists', cors(), checkClientExists)
router.post('/coupon/new', cors(), createCoupon)
router.post('/coupon/getAll', cors(), getAllUserCoupons)
router.post('/coupon/validate', cors(), validateCoupon)
router.post('/address/new', cors(), newAddress)
router.post('/find', cors(), getUsrInfo)

export default router;
