import express from 'express';
import cors from 'cors';
import { getClientOnlineOrders, getClientOnSiteOrders, getPaymentTypes, getClientOrders, updateOrderState, newOnlineOrder, newOnsiteOrder } from '../controllers/orderController.js'

let router = express.Router();

router.options('/', cors());
router.post('/update_state', cors(), updateOrderState)
router.post('/new/online', cors(), newOnlineOrder)
router.post('/new/onsite', cors(), newOnsiteOrder)
router.post('/all/online',cors(), getClientOnlineOrders)
router.post('/all/onsite',cors(), getClientOnSiteOrders)
router.post('/all', cors(), getClientOrders)
router.get('/payment-types', cors(), getPaymentTypes)
export default router;
