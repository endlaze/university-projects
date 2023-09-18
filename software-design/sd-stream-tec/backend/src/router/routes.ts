import * as express from 'express'
import { IServer } from '../interfaces/IServer'
import UserRouter from './UserRouter'
import AuthRouter from './AuthRouter';
import MembershipRouter from './MembershipRouter'
import ProductRouter from './ProductRouter'
import * as cors from "cors";

const options: cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false
};

export default class Routes {
  static init(server: IServer) {
    const router = express.Router();
    server.app.use('/', router);
    server.app.use('/auth', new AuthRouter().router);
    server.app.use('/user', new UserRouter().router);
    server.app.use('/membership', new MembershipRouter().router);
    server.app.use('/product', new ProductRouter().router);
    server.app.use(cors(options));
  }
}