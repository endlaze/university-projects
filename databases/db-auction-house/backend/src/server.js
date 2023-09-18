let express = require('express')
let Middleware = require('./config/middleware')
let Routes = require('./router/routes')

class Server {
  constructor() {
    this.app = express()
    Middleware.init(this.app)
    Routes.init(this.app)
  }
}

module.exports = new Server().app

