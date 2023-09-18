import ProductController from '../controllers/ProductController'
import { Router } from 'express'

export default class ProductRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes = () => {
    this.router.post('/create', ProductController.create);
    this.router.post('/playlist/add', ProductController.addToPlaylist);
    this.router.post('/playlist/create', ProductController.createPlaylist);
    this.router.post('/playlist/findAll', ProductController.fetchAllPlaylists);
  }
}