import AuthController from '../controllers/AuthController';
import { Router } from 'express';

export default class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.post('/', AuthController.login);
  }
}
