import { IProduct } from '../../interfaces/IProduct'
import Video from './Video'
import Music from './Music'

class ProductFactory {

  getProduct = (type) => {
    return new Promise<IProduct>((resolve, reject) => {
      switch (type) {
        case 1:
          resolve(new Video());
          break;
        case 2:
          resolve(new Music());
          break;
        default:
          break;
      }
    })
  }
}

export default new ProductFactory();