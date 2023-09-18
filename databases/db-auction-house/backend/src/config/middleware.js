let cors = require('cors')
let bodyParser = require('body-parser')

class Middleware {
  static init(app) {
    app.listen(3000, () => {
      console.log('App listening on port 3000');
    });
    app.use(cors());
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', "*");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }
}

module.exports = Middleware
