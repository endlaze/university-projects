let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let { procToJsonWithParams } = require('../procToJson')
let TYPES = require('tedious').TYPES;

exports.login = (req, res) => {
  const { alias, password } = req.body;

  let userParams = [{ p1: 'Alias', p2: TYPES.VarChar, p3: alias }]
  procToJsonWithParams('usp_GetLoginData', userParams, 'login').then((returnedData) => {
    let userData = returnedData.pop()
    console.log(userData)

    if (userData === undefined) {
      res.status(404).send({ reason: 'Usuario no encontrado' });
      return
    }

    if (bcrypt.compareSync(password, userData.PasswordHash)) {

      let resUser = { alias: userData.Alias, role: userData.Nombre, suspendido: userData.Suspendido, conTarjeta: userData.ConTarjeta }
      res.status(200).json({ token: jwt.sign({ alias: userData.Alias, password: password }, 'casa-subastas'), user: resUser });
    } else {
      res.status(401).send({ reason: 'Contraseña incorrecta ' })
    }
  });
}
