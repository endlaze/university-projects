let personalDataController = require('../../controllers/personalData.controller')
let cors = require('cors')

module.exports = (server) => {
  let root = '/api/personalData'
  let router = server.loopback.Router();
  router.options('/', cors())
  router.post(root, cors(), personalDataController.findById)
  server.use(router)
}