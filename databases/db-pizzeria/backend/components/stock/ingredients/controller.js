let { procToJson } = require('../../../connections/procToJson')

exports.getPizzaIngredients = (req, res) => {
  procToJson('usp_GetIngPizza').then(ingPizzas => res.status(200).send(ingPizzas));
}

exports.getDrinks = (req, res) => {
  procToJson('usp_GetBebidas').then(drinks => res.status(200).send(drinks));
}

exports.getFlavorings = (req, res) => {
  procToJson('usp_GetSaborizantes').then((flavorings) => { res.status(200).send(flavorings) });
}

exports.getExtras = (req, res) => {
  procToJson('usp_GetExtras').then((extras) => { res.status(200).send(extras) });
}