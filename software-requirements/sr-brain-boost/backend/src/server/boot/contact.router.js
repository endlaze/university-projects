let contactController = require('../../controllers/contact.controller')
let cors = require('cors')

module.exports = (server) => {
  let root = '/api/contact'
  let router = server.loopback.Router();
  router.options('/', cors())
  router.post(root + '/question', cors(), contactController.sendQuestion)
  server.use(router)
}