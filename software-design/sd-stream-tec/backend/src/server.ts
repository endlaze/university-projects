import * as express from 'express'
import Routes from './router/routes'
import * as bodyParser from 'body-parser'
import * as cors from "cors";

export class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    Routes.init(this);
  }

  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors())
  }
}

export default new Server().app