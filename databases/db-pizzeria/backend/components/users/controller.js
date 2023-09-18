let TYPES = require('tedious').TYPES;
let connection = require('../../dataBaseConnection')
let Request = require('tedious').Request;
let { procToJsonWithParams } = require('../../connections/procToJson');

exports.login = (req, res) => {
  let params = [{
    p1: 'Email',
    p2: TYPES.VarChar,
    p3: req.body.email
  }]

  procToJsonWithParams('usp_login', params).then((user) => {
    res.send(user.pop())
  })
}

exports.register = (req, res) => {
  let { name, lastName, id, phoneNumber, address, email } = req.body;
  let params = [
    { p1: 'Cedula', p2: TYPES.Int, p3: id },
    { p1: 'Nombre', p2: TYPES.VarChar, p3: name },
    { p1: 'Apellido', p2: TYPES.VarChar, p3: lastName },
    { p1: 'Correo', p2: TYPES.VarChar, p3: email },
    { p1: 'Telefono', p2: TYPES.Int, p3: phoneNumber },
    { p1: 'Direccion', p2: TYPES.VarChar, p3: address },
  ]

  procToJsonWithParams('usp_PersonaInsert', params).then((user) => {
    res.send(user.pop())
  })
}