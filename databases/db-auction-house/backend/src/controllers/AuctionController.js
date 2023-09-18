let { procToJsonWithParams, procToJson } = require('../procToJson')
let TYPES = require('tedious').TYPES
// IMPLEMENTAR FECHA
exports.create = (req, res) => {
  let { FechaFinal, PrecioBase, Alias, Nombre, Descripcion, IdSubcategoria, Foto, Rol } = req.body;
  console.log(FechaFinal, PrecioBase, Alias, Nombre, Descripcion, IdSubcategoria, Foto, Rol)
  let params = [
    { p1: 'FechaFinal', p2: TYPES.Int, p3: toUTC(FechaFinal) },
    { p1: 'PrecioBase', p2: TYPES.Decimal, p3: parseInt(PrecioBase) },
    { p1: 'Alias', p2: TYPES.VarChar, p3: Alias },
    { p1: 'Nombre', p2: TYPES.VarChar, p3: Nombre },
    { p1: 'Descripcion', p2: TYPES.VarChar, p3: Descripcion },
    { p1: 'IdSubcategoria', p2: TYPES.Int, p3: parseInt(IdSubcategoria) },
    { p1: 'Foto', p2: TYPES.VarChar, p3: Foto }
  ]
  procToJsonWithParams('usp_CreateSubasta', params, Rol).then((val) => {
    res.status(200).send(val)
  }).catch((error) => { res.send(error).status(500) })

}

exports.auctionBySubcategory = (req, res) => {
  let { IdSubcategoria, Alias, Rol } = req.params;
  let params = [
    { p1: 'IdSubcategoria', p2: TYPES.Int, p3: parseInt(IdSubcategoria) },
    { p1: 'Alias', p2: TYPES.VarChar, p3: Alias }
  ]
  procToJsonWithParams('usp_GetSubastasActivasXSub', params, Rol).then((val) => {
    console.log(val)
    res.status(200).send(val)
  }).catch((error) => { res.send(error).status(500) })
}

toUTC = (date) => {
  return Math.floor((new Date(date)).getTime() / 1000);
}

exports.auctionByUser = (req, res) => {
  let params = [
    { p1: 'AliasConsulta', p2: TYPES.VarChar, p3: req.params.AliasConsulta },
    { p1: 'AliasVendedor', p2: TYPES.VarChar, p3: req.params.AliasVendedor }
  ]

  procToJsonWithParams('usp_UsuarioXSubastas', params, req.params.Rol).then((val) => {
    res.status(200).send(val)
  }).catch((error) => { res.send(error).status(500) })
}

exports.categories = (req, res) => {
  procToJson('usp_GetSubcategorias', "Administrador").then((categories) => {
    res.send(categories).status(200)
  }).catch((error) => { res.send(error).status(500) })
}

exports.expAuctionsByUser = (req, res) => {
  let params = [
    { p1: 'Alias', p2: TYPES.VarChar, p3: req.params.Alias }]
  procToJsonWithParams('usp_GetSubExpXUsuario', params, "Administrador").then((expiredAuctions) => {
    res.status(200).send(expiredAuctions)
  }).catch((error) => { res.send(error).status(500) })
}

exports.restartExpAuction = (req, res) => {
  let { FechaFinal, PrecioBase, IdSubasta } = req.body;
  let params = [
    { p1: 'FechaFinal', p2: TYPES.Int, p3: toUTC(FechaFinal) },
    { p1: 'PrecioBase', p2: TYPES.Decimal, p3: parseInt(PrecioBase) },
    { p1: 'IdSubasta', p2: TYPES.Int, p3: parseInt(IdSubasta) }
  ]
  procToJsonWithParams('usp_ReiniciarSubasta', params, "Administrador").then((expiredAuctions) => {
    res.status(200).send(expiredAuctions)
  }).catch((error) => { res.send(error).status(500) })
}