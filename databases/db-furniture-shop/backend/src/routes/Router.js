import productRouter from './productRouter.js';
import orderRouter from './orderRouter.js';
import employeeRouter from './employeeRouter.js';
import clientRouter from './clientRouter.js';
import reportRouter from './reportRouter.js';



const Router = (server) => {
  server.use('/product', productRouter);
  server.use('/order', orderRouter);
  server.use('/client', clientRouter);
  server.use('/employee', employeeRouter);
  server.use('/report', reportRouter);
}


export default Router