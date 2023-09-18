let { procToJson } = require('../../../connections/procToJson')

exports.getPizzaSizes = (req, res) => {
  procToJson('usp_GetTamPizza').then(tam => res.status(200).send(tam))
}

exports.getDrinkSizes = (req, res) => {
  procToJson('usp_GetTamBebidas').then(tam => res.status(200).send(tam));
}

exports.getSaladSizes = (req, res) => {
  procToJson('usp_GetTamEnsaladas').then((salads) => { res.status(200).send(salads)})
}