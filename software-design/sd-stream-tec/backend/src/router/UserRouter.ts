import UserController from '../controllers/UserController'
import { Router } from 'express'

export default class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes = () => {
    this.router.get('/', UserController.getUsers);
    this.router.post('/create', UserController.createUser);
    this.router.post('/1:id', UserController.getUserById);
    this.router.put('/', UserController.updateUser)
    this.router.delete('/', UserController.deleteUser);
  }
}