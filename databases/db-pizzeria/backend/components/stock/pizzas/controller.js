let TYPES = require('tedious').TYPES;
let { procToJson, procToJsonWithParams } = require('../../../connections/procToJson');

exports.stockPizza = (req, res) => {
  let pizzaStock = procToJson('usp_GetPizzaStock');
  pizzaStock.then((pizzas) => {
    Promise.all(pizzas.map(getIng)).then((response) => {
      res.send(response);
    })
  });
}

getIng = (pizza) => {
  let params = [{
    p1: 'IdPizzaStock',
    p2: TYPES.Int,
    p3: pizza.IdPizzaStock
  }]
  return procToJsonWithParams('usp_GetPizzaStockIng', params).then((ing) => {
    let finalPizza = {
      pizza: pizza,
      ingredients: ing
    }
    return finalPizza;
  })
}

exports.registerStockPizza = (req, res) => {
  let { name, ingredients } = req.body;
  let pizzaParam = [{ p1: 'Nombre', p2: TYPES.VarChar, p3: name }]
  procToJsonWithParams('usp_PizzaStockInsert', pizzaParam).then((returnedPizza) => {
    let { IdPizzaStock } = returnedPizza.pop();
    ingredients.forEach(ingredient => {
      postIng(IdPizzaStock, ingredient);
    });
    res.status(200).send()
  })
}

postIng = (idPizza, ingredient) => {
  let params = [
    { p1: 'IdPizza', p2: TYPES.Int, p3: idPizza },
    { p1: 'IdIngrediente', p2: TYPES.Int, p3: ingredient.IdIngrediente }
  ]

  procToJsonWithParams('usp_RegistrarPizzaXIngredienteStock', params).then((returnedIng) => {
    console.log(returnedIng)
  })
}
