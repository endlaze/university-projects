import { Application } from 'express';
import TaskRouter from './task-router';

export default class Router {
  static init(app: Application) {
    app.use('/task', TaskRouter);
  }
}
