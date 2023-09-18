let TYPES = require('tedious').TYPES;
let Request = require('tedious').Request;
let { procToJson, procToJsonWithParams } = require('../../connections/procToJson')

exports.registerOrder = (req, res) => {
	let { order, pizzas, salads, drinks } = req.body;
  let orderParams = [
    { p1: 'IdPuntoVenta', p2: TYPES.Int, p3: order.storeId },
    { p1: 'Cedula', p2: TYPES.Int, p3: order.id },
    { p1: 'PrecioTotal', p2: TYPES.Int, p3: order.totalPrice }
  ]
  procToJsonWithParams('usp_OrdenInsert', orderParams).then((returnedOrder) => {
    let { NumeroOrden, IdPuntoVenta } = returnedOrder.pop();
    pizzas.forEach((obj) => {
      let { Precio, Cantidad, ing, size, flavoring } = obj;
      registerPizza(NumeroOrden, IdPuntoVenta, Precio, Cantidad, ing, size, flavoring);
    });
    salads.forEach((obj) => {
      let { Precio, Cantidad, ing, size, Nombre, extra } = obj;
      registerSalad(NumeroOrden, IdPuntoVenta, Precio, Cantidad, Nombre, ing, size, extra)
    })
    drinks.forEach((obj) => {
      let { Precio, Cantidad, size, Nombre } = obj;
      console.log(Precio, Cantidad, size, Nombre);
      registerDrink(NumeroOrden, IdPuntoVenta, Precio, Cantidad, Nombre, size)
    })
    res.status(200).send();
  })
}

registerPizza = (orderId, storeId, precio, cantidad, ing, size, flavoring) => {
  let { Tam, PrecioBase, PrecioIngReg, PrecioIngDeluxe } = size;
  let sizeParams = [
    { p1: 'Tam', p2: TYPES.VarChar, p3: Tam },
    { p1: 'PrecioBase', p2: TYPES.Int, p3: PrecioBase },
    { p1: 'PrecioIngReg', p2: TYPES.Int, p3: PrecioIngReg },
    { p1: 'PrecioIngDeluxe', p2: TYPES.Int, p3: PrecioIngDeluxe }
  ]
  procToJsonWithParams('usp_TamPizzaInsert', sizeParams).then((returnedSize) => {
    let { IdTamPizza } = returnedSize.pop();
    let pizzaParams = [
      { p1: 'IdTamPizza', p2: TYPES.Int, p3: IdTamPizza },
      { p1: 'NumeroOrden', p2: TYPES.Int, p3: orderId },
      { p1: 'IdPuntoVenta', p2: TYPES.Int, p3: storeId },
      { p1: 'Precio', p2: TYPES.Int, p3: precio },
      { p1: 'IdSaborizante', p2: TYPES.Int, p3: flavoring.IdSaborizante },
      { p1: 'Cantidad', p2: TYPES.Int, p3: cantidad },
    ]
    procToJsonWithParams('usp_PizzaInsert', pizzaParams).then((returnedPizza) => {
      let { IdPizza } = returnedPizza.pop();
      ing.forEach((ingredient) => {
        postPizzaIng(IdPizza, ingredient);
      });
    })
  })
}

postPizzaIng = (idPizza, ingredient) => {
  let params = [
    { p1: 'IdPizza', p2: TYPES.Int, p3: idPizza },
    { p1: 'Nombre', p2: TYPES.VarChar, p3: ingredient.Nombre },
    { p1: 'MitadIngrediente', p2: TYPES.Int, p3: ingredient.MitadIngrediente },
    { p1: 'Cantidad', p2: TYPES.Int, p3: ingredient.Cantidad },
    { p1: 'Deluxe', p2: TYPES.Bit, p3: ingredient.Deluxe },
  ]
  procToJsonWithParams('usp_IngPizzaInsert', params).then((returnedIng) => {
    console.log(returnedIng)
  })
}

registerSalad = (orderId, storeId, precio, cantidad, nombre, ing, size, extra) => {
  let { Tam, Precio } = size;
  let sizeParams = [
    { p1: 'Tam', p2: TYPES.VarChar, p3: Tam },
    { p1: 'PrecioBase', p2: TYPES.Int, p3: Precio }
  ]
  procToJsonWithParams('usp_TamEnsaladaInsert', sizeParams).then((returnedSize) => {
    let { IdTamEnsalada } = returnedSize.pop();
    let saladParams = [
      { p1: 'IdTamEnsalada', p2: TYPES.Int, p3: IdTamEnsalada },
      { p1: 'NumeroOrden', p2: TYPES.Int, p3: orderId },
      { p1: 'IdPuntoVenta', p2: TYPES.Int, p3: storeId },
      { p1: 'Precio', p2: TYPES.Int, p3: precio },
      { p1: 'Cantidad', p2: TYPES.Int, p3: cantidad },
      { p1: 'Nombre', p2: TYPES.VarChar, p3: nombre }
    ]
    procToJsonWithParams('usp_EnsaladaInsert', saladParams).then((returnedSalad) => {
      let { IdEnsalada } = returnedSalad.pop();
      ing.forEach((ingredient) => {
        postSaladIng(IdEnsalada, ingredient);
      });
      extra.forEach((ex) => {
        postSaladExtra(IdEnsalada, ex);
      })
    })
  });
}

postSaladIng = (idSalad, ingredient) => {
  let params = [
    { p1: 'IdEnsalada', p2: TYPES.Int, p3: idSalad },
    { p1: 'Nombre', p2: TYPES.VarChar, p3: ingredient.Nombre },
    { p1: 'Cantidad', p2: TYPES.Int, p3: ingredient.Cantidad },
  ]
  procToJsonWithParams('usp_IngEnsaladaInsert', params).then((returnedIng) => {
    console.log(returnedIng)
  })
}

postSaladExtra = (idSalad, extra) => {
  let params = [
    { p1: 'IdEnsalada', p2: TYPES.Int, p3: idSalad },
    { p1: 'Nombre', p2: TYPES.VarChar, p3: extra.Nombre },
    { p1: 'Precio', p2: TYPES.Int, p3: extra.Precio },
  ]
  procToJsonWithParams('usp_ExtraInsert', params).then((returnedIng) => {
    console.log(returnedIng)
  })
}

registerDrink = (orderId, storeId, precio, cantidad, nombre, size) => {
  let { Tam, PrecioBase } = size;
  let sizeParams = [
    { p1: 'Tam', p2: TYPES.VarChar, p3: Tam },
    { p1: 'PrecioBase', p2: TYPES.Int, p3: PrecioBase }
  ]
  procToJsonWithParams('usp_TamBebidaInsert', sizeParams).then((returnedSize) => {
    let { IdTamBebida } = returnedSize.pop();
    let drinkParams = [
      { p1: 'IdTamBebida', p2: TYPES.Int, p3: IdTamBebida },
      { p1: 'NumeroOrden', p2: TYPES.Int, p3: orderId },
      { p1: 'IdPuntoVenta', p2: TYPES.Int, p3: storeId },
      { p1: 'Precio', p2: TYPES.Int, p3: precio },
      { p1: 'Cantidad', p2: TYPES.Int, p3: cantidad },
      { p1: 'Nombre', p2: TYPES.VarChar, p3: nombre }
    ]
    procToJsonWithParams('usp_BebidaInsert', drinkParams).then((returnedDrink) => {
      let { IdBebida } = returnedDrink.pop();
    })
  });
}