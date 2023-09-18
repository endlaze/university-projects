import express from 'express';
import bodyParser from 'body-parser';
import Router from './routes/Router.js'

let server = express();

server.listen(5000, () => {
  console.log('App listening on port 5000');
});

server.use(bodyParser.json(({ limit:'1000mb' })));

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

Router(server);

export default server;
