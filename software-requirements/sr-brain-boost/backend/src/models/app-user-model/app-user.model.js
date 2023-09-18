'use strict';

const bcrypt = require('bcrypt');
const authController = require('../../controllers/auth.controller');
let jwt = require('jsonwebtoken');

module.exports = function (AppUser) {

  //Create user

  AppUser.createUser = (req, callback) => {

    let { id, name, first_last_name, second_last_name, email, address, password, phone_number, user_role, birthday, user_subroles } = req.body
    password = bcrypt.hashSync(password, 10)

    let ds = AppUser.dataSource
    let sql = 'select create_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
    ds.connector.execute(sql, [id, name, first_last_name, second_last_name, email, address, password, phone_number, user_role, birthday], (err, data) => {

      if (err) { return }

      let subrolesSQL = "select create_user_subrole($1, $2)"

      user_subroles.forEach(subrole => {
        let { subrole_id } = subrole
        ds.connector.execute(subrolesSQL, [id, subrole_id], (err, data) => { })
      });
    })

    callback(null, 'test')
  }

  AppUser.remoteMethod('createUser', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/create', verb: 'post' },
    returns: { arg: 'message', type: 'string' },
  })

  //Login

  AppUser.auth = (req, callback) => {
    let { username, password, username_type } = req.body

    let ds = AppUser.dataSource
    let queryParam = (username_type === 0) ? 'id' : 'email'

    let sql = `select * from get_login_info_by_${queryParam}($1)`

    ds.connector.execute(sql, [username], (err, data) => {
      let callbackMsg = { status: 0, message: '' }

      if (data && data !== undefined && data.length !== 0) {
        let user = data.pop()

        if (authController.comparePassword(password, user.user_pw)) {
          let resToken = jwt.sign({ user_id: user.user_id, password: password }, 'brain-boost')
          let resUser = { user_id: user.user_id }
          callbackMsg = { status: 200, message: 'Usuario autenticado', token: resToken, user: resUser }
        } else {
          callbackMsg = { status: 401, message: 'Contraseña incorrecta' }
        }

      } else {
        callbackMsg = { status: 404, message: 'El usuario no existe' }
      }

      callback(null, callbackMsg)
    })
  }

  AppUser.remoteMethod('auth', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/auth', verb: 'post' },
    returns: { arg: 'response', type: 'any' },
  })

  AppUser.getRoles = (req, callback) => {
    let { user_id } = req.body
    let ds = AppUser.dataSource

    let sql = 'select * from get_user_role($1)'
    ds.connector.execute(sql, [user_id], (err, role) => {

      let rolesXSubroles = {
        user_role: role.pop()
      }

      if (err) { return }

      let subrolesSQL = "select * from get_user_subroles($1)"
      ds.connector.execute(subrolesSQL, [user_id], (err, subroles) => {
        if (err) { return }
        rolesXSubroles['user_subroles'] = subroles
        callback(null, rolesXSubroles)
      })
    })
  }

  AppUser.remoteMethod('getRoles', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/roles', verb: 'post' },
    returns: { arg: 'response', type: 'any' },
  })

  AppUser.getUserInfo = (req, callback) => {
    let { user_id } = req.body
    let ds = AppUser.dataSource

    let sql = 'select * from get_user_info($1)'

    ds.connector.execute(sql, [user_id], (err, user_info) => {
      if (err) { return }
      callback(null, user_info.pop())
    });
  }

  AppUser.remoteMethod('getUserInfo', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/get_info', verb: 'post' },
    returns: { arg: 'response', type: 'any' },
  })

  AppUser.createRelatedAccount = (req, callback) => {
    let { main_user_id, liked_user_id, user_token } = req.body
    let ds = AppUser.dataSource

    let sql = 'select * from link_accounts($1, $2, $3)'

    ds.connector.execute(sql, [main_user_id, liked_user_id, user_token], (err, resp) => {
      if (err) { return }
      callback(null, resp.pop())
    });
  }

  AppUser.remoteMethod('createRelatedAccount', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/link_acc', verb: 'post' },
    returns: { arg: 'response', type: 'any' },
  })

  AppUser.getRelatedAccs = (req, callback) => {
    let { user_id, current_user_role } = req.body
    let ds = AppUser.dataSource
    let func = (current_user_role === 1) ? 'get_rel_medcare' : 'get_related_patients'
    let sql = `select * from ${func}($1)`
    ds.connector.execute(sql, [user_id], (err, resp) => {
      if (err) { return }
      callback(null, resp)
    });
  }

  AppUser.remoteMethod('getRelatedAccs', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/get_rel_acc', verb: 'post' },
    returns: { arg: 'response', type: 'any' },
  })
};
