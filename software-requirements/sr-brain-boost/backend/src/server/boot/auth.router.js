let authController = require('../../controllers/auth.controller')
let cors = require('cors')


module.exports = (server) => {
  let root = '/api/auth'
  let router = server.loopback.Router();
  router.options('/', cors())
  server.use(router)
}