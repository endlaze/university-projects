let express = require('express');
let bodyParser = require('body-parser')
let server = express();

let pizzaRouter = require('./routes/pizzas');
let userRouter = require('./routes/users');
let stockIngRouter = require('./routes/stockIngredients')
let stockSizeRouter = require('./routes/stockSizes')
let stockPizzaRouter = require('./routes/stockPizzas')
let stockSaladRouter = require('./routes/stockSalads')
let orderRouter = require('./routes/orders')
let storeRouter = require('./routes/stores')


server.listen(3000, () => {
  console.log('App listening on port 3000');
});

server.use(bodyParser.json());

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

server.use('/pizza', pizzaRouter);
server.use('/user', userRouter); 
server.use('/stockIng',stockIngRouter);
server.use('/stockSize', stockSizeRouter);
server.use('/stock-pizzas', stockPizzaRouter);
server.use('/stock-salads', stockSaladRouter);
server.use('/orders', orderRouter);
server.use('/stores', storeRouter);

module.exports = server;
