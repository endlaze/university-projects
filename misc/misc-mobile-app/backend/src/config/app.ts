import express from 'express';
import Middleware from './middleware';
import Router from '../routers/router';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    Middleware.init(this.app);
    Router.init(this.app);
  };
};

export default new App().app;