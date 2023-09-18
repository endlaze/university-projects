import * as express from 'express';
import ProductFactory from '../factories/product/ProductFactory'

class ProductController {
  public create(req: express.Request, res: express.Response, next: express.NextFunction): void {

    const { purchase, type } = req.body;

    ProductFactory.getProduct(type)
      .then((factProduct) => {
        factProduct.createProduct(purchase.email, purchase.product)
          .then((product) => {
            res.status(200).json({ code: 200, message: 'Se ha comprado el producto', product: product })
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));
  }

  public addToPlaylist(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const { transaction, type } = req.body;

    ProductFactory.getProduct(type)
      .then((factProduct) => {
        factProduct.addProductToPlaylist(transaction.email, transaction.playlist)
          .then((playlist) => {
            res.status(200).json({ code: 200, message: 'Se ha agregado el producto a la playlist', playlist: playlist })
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));
  }

  public createPlaylist(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const { transaction, type } = req.body;

    ProductFactory.getProduct(type)
      .then((factProduct) => {
        factProduct.createPlaylist(transaction.email, transaction.playlist)
          .then((newPlaylist) => {
            res.status(200).json({ code: 200, message: 'Se ha creado la playlist', playlist: newPlaylist })
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));
  }

  public fetchAllPlaylists(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const { email, type } = req.body;

    ProductFactory.getProduct(type)
      .then((factProduct) => {
        factProduct.fetchAllPlaylists(email)
          .then((playlists) => {
            res.status(200).json({ code: 200, playlists: playlists })
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));
  }
}

export default new ProductController();