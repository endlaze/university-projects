let bcrypt = require('bcrypt');
let { procToJsonWithParams } = require('../procToJson')
let TYPES = require('tedious').TYPES

exports.createAgent = (req, res) => {
  let agentParams = buildUserParams(req.body, 'Agente')

  procToJsonWithParams('usp_CreateAgente', agentParams, 'Admin').then((user) => {
    res.status(200).send()
  });
}

exports.createParticipante = (req, res) => {
  let agentParams = buildUserParams(req.body, 'Participante')

  procToJsonWithParams('usp_CreateParticipante', agentParams, 'Agente').then((user) => {
    res.status(200).send()
  });
}

exports.createAdmin = (req, res) => {
  let agentParams = buildUserParams(req.body, 'Administrador')

  procToJsonWithParams('usp_CreateAdmin', agentParams, 'Admin').then((user) => {
    res.status(200).send()
  });
}

exports.getUsersByRole = (req, res) => {
  let reqParams = [{ p1: 'Alias', p2: TYPES.VarChar, p3: req.params.alias }]

  procToJsonWithParams('usp_GetUsersByRole', reqParams, 'Admin').then((users) => {
    res.status(200).send(users)
  });
}

buildUserParams = (user, userType) => {
  let userParams = [
    { p1: 'Alias', p2: TYPES.VarChar, p3: user.Alias },
    { p1: 'Cedula', p2: TYPES.Int, p3: user.Cedula },
    { p1: 'NombreApellidos', p2: TYPES.VarChar, p3: user.NombreApellidos },
    { p1: 'Direccion', p2: TYPES.VarChar, p3: user.Direccion },
    { p1: 'PasswordHash', p2: TYPES.VarChar, p3: hashPassword(user.password) },
    { p1: 'Correo', p2: TYPES.VarChar, p3: user.Correo },
    { p1: 'Telefono', p2: TYPES.VarChar, p3: user.Telefono }
  ]

  if (userType === 'Participante') {
    userParams.push({ p1: 'ConTarjeta', p2: TYPES.VarChar, p3: user.ConTarjeta })
  }

  return userParams;
}

exports.activateAgent = (req, res) => {
  const { Alias, Rol } = req.body;

  console.log('cholo')
  let params = [{ p1: 'Alias', p2: TYPES.VarChar, p3: Alias }]

  procToJsonWithParams('usp_ReactivarAgente', params, Rol).then((val) => {
    res.status(200).send(val)
  }).catch((error) => { res.send(error).status(500) })
}

exports.activateParticipant = (req, res) => {
  const { Alias, Rol } = req.body;
  let params = [
    { p1: 'Alias', p2: TYPES.VarChar, p3: Alias }
  ]
  procToJsonWithParams('usp_ReactivarParticipante', params, Rol).then((val) => {
    res.status(200).send(val)
  }).catch((error) => { res.send(error).status(500) })
}

exports.banAgent = (req, res) => {
  const { Alias, Rol } = req.body;
  let params = [
    { p1: 'Alias', p2: TYPES.VarChar, p3: Alias }
  ]
  procToJsonWithParams('usp_SuspenderAgente', params, Rol).then((val) => {
    res.status(200).send(val)
  }).catch((error) => { res.send(error).status(500) })
}

exports.banParticipant = (req, res) => {
  const { Alias, Rol } = req.body;
  let params = [
    { p1: 'Alias', p2: TYPES.VarChar, p3: Alias }
  ]
  procToJsonWithParams('usp_SuspenderParticipante', params, Rol).then((val) => {
    res.status(200).send(val)
  }).catch((error) => { res.send(error).status(500) })
}

exports.update = (req, res) => {
  let user = req.body
  let passwordH = (user.password !== '' && user.password != undefined && user.password != null) ? hashPassword(user.password) : ''

  let userParams = [
    { p1: 'Alias', p2: TYPES.VarChar, p3: user.Alias },
    { p1: 'NombreApellidos', p2: TYPES.VarChar, p3: user.NombreApellidos },
    { p1: 'Direccion', p2: TYPES.VarChar, p3: user.Direccion },
    { p1: 'PasswordHash', p2: TYPES.VarChar, p3: passwordH },
    { p1: 'Correo', p2: TYPES.VarChar, p3: user.Correo },
    { p1: 'NuevoAlias', p2: TYPES.VarChar, p3: user.NuevoAlias },
    { p1: 'Telefono', p2: TYPES.Int, p3: user.Telefono }
  ]
  if (user.Rol === 'Admin') {
    procToJsonWithParams('usp_UpdateAgente', userParams, 'Administrador').then((user) => { res.send(user).status(200) });
  } else {
    procToJsonWithParams('usp_UpdateParticipante', userParams, 'Agente').then((user) => { res.send(user).status(200) });
  }
}

exports.updateCreditCard = (req, res) => {
  let user = req.body
  let userParams = [
    { p1: 'Alias', p2: TYPES.VarChar, p3: user.Alias },
    { p1: 'NuevoRegistro', p2: TYPES.Bit, p3: user.NuevoRegistro }
  ]

  procToJsonWithParams('usp_UpdateTarjeta', userParams, 'Agente').then((user) => { res.send(user).status(200) });
}

hashPassword = (password) => bcrypt.hashSync(password, 10) 
