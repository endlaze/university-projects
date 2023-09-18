import express from 'express';
import cors from 'cors';
import { employeeTypes, calculateSalary, login, createEmployee } from '../controllers/employeeController.js'

let router = express.Router();

router.options('/', cors());
router.post('/new', cors(), createEmployee)
router.post('/login', cors(), login)
router.post('/calculate-salary', cors(), calculateSalary)
router.post('/type', cors(), employeeTypes)

export default router;
