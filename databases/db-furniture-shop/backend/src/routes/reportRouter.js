import express from 'express';
import cors from 'cors';
import { salesByDate, salesByEmployee } from '../controllers/reportController.js'

let router = express.Router();

router.options('/', cors());
router.get('/by-date', cors(), salesByDate)
router.get('/by-employee', cors(), salesByEmployee)

export default router;