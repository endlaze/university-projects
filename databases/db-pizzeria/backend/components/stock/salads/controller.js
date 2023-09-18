let TYPES = require('tedious').TYPES;
let { procToJson, procToJsonWithParams } = require('../../../connections/procToJson');

exports.stockSalad = (req, res) => {
  let ensaldaStock = procToJson('usp_GetEnsaladaStock');
  ensaldaStock.then((salads) => {
    Promise.all(salads.map(saladGetIng)).then((response) => {
      res.send(response);
    })
  });
}

saladGetIng = (salad) => {
  let params = [{
    p1: 'IdEnsaladaStock',
    p2: TYPES.Int,
    p3: salad.IdEnsaladaStock
  }]
  return procToJsonWithParams('usp_GetEnsaladaStockIng', params).then((ing) => {
    let finalSalad = {
      salad: salad,
      ingredients: ing
    }
    return finalSalad;
  })
}