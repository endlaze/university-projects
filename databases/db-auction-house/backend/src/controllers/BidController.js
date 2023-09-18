let { procToJsonWithParams, procToJson } = require('../procToJson')
let TYPES = require('tedious').TYPES

exports.create = (req, res) => {
  let { AliasParticipante, Oferta, IdSubasta, Rol } = req.body;
  let params = [
    { p1: 'AliasParticipante', p2: TYPES.VarChar, p3: AliasParticipante },
    { p1: 'Oferta', p2: TYPES.Decimal, p3: parseInt(Oferta) },
    { p1: 'IdSubasta', p2: TYPES.Int, p3: parseInt(IdSubasta) }
  ]
  procToJsonWithParams('usp_CreatePuja', params, Rol).then((val) => {
    res.status(200).send(value)
  }).catch((error) => { res.send(error).status(500) })

}

exports.params = (req, res) => {
  const { Rol } = req.params
  procToJson('usp_GetParametros', Rol).then((par) => { 
    res.send(par).status(200) })
}

exports.updateParams = (req, res) => {
  let params = [
    { p1: 'AumentoMinimo', p2: TYPES.Decimal, p3: parseInt(req.body.AumentoMinimo) },
    { p1: 'Comision', p2: TYPES.Decimal, p3: parseInt(req.body.Comision) },
  ]

  procToJsonWithParams('usp_UpdateParametros', params, 'Administrador').then((par) => { res.send(par).status(200) })
}

exports.greatestBid = (req, res) => {
  let { Rol, IdSubasta } = req.params
  let params = [{ p1: 'IdSubasta', p2: TYPES.Int, p3: parseInt(IdSubasta) }]
  procToJsonWithParams('usp_GetMayorPuja', params, Rol).then((par) => { res.send(par).status(200) })
}

exports.bidByAuction = (req, res) => {
  let { IdSubasta, Alias, Rol } = req.params;
  let params = [
    { p1: 'IdSubasta', p2: TYPES.Int, p3: parseInt(IdSubasta) },
    { p1: 'Alias', p2: TYPES.VarChar, p3: Alias }
  ]
  procToJsonWithParams('usp_GetPujasXSubasta', params, Rol).then((val) => {
    res.status(200).send(val)
  }).catch((error) => { res.send(error).status(500) })

}

exports.winnerBidsByUser = (req, res) => {
  let params = [
    { p1: 'AliasConsulta', p2: TYPES.VarChar, p3: req.params.AliasConsulta },
    { p1: 'AliasComprador', p2: TYPES.VarChar, p3: req.params.AliasComprador }
  ]

  procToJsonWithParams('usp_UsuarioXPujasGanadoras', params, req.params.Rol).then((val) => {
    res.status(200).send(val)
  }).catch((error) => { res.send(error).status(500) })
}