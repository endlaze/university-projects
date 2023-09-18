let TYPES = require('tedious').TYPES;
let { procToJsonWithParams, procToJson } = require('../../connections/procToJson');

exports.getStores = (req, res) => {
  procToJson('usp_GetPuntosDeVenta').then((pvs) => res.status(200).send(pvs))
}

exports.createStore = (req, res) => {
  let { Nombre, Horario, Direccion, Telefono } = req.body
  params = [
    { p1: "Nombre", p2: TYPES.VarChar, p3: Nombre },
    { p1: "Horario", p2: TYPES.VarChar, p3: Horario },
    { p1: "Direccion", p2: TYPES.VarChar, p3: Direccion },
    { p1: "Telefono", p2: TYPES.Int, p3: Telefono },
  ]
  procToJsonWithParams('usp_PuntoVentaInsert', params).then(() => res.status(200).send())
}