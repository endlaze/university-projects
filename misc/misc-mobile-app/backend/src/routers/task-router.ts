import { Router } from 'express';
import cors from 'cors';
import TaskController from '../controllers/task-controller';

class TaskRouter {

  router: Router;
  constructor() {
    this.router = Router();

    this.router.options('/', cors());
    this.router.post('/create', cors(), TaskController.createTask);
    this.router.get('/read', cors(), TaskController.readTasks);
    this.router.post('/update', cors(), TaskController.updateTask);
    this.router.post('/delete', cors(), TaskController.deleteTask);
  };
};

export default new TaskRouter().router;
