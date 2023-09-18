import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction, Application } from 'express';

export default class Middleware {

  static init(app: Application) {
    this.bodyParserConfig(app);
    this.corsConfig(app);
  };

  private static bodyParserConfig = (app: Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  };

  private static corsConfig = (app: Application) => {

    app.use(cors());

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
  };
};
