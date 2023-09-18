let TYPES = require('tedious').TYPES;
let Request = require('tedious').Request;
let { procToJson } = require('../../connections/procToJson')

exports.newPizza = (req, res) => {
	let pizzaIng = procToJson('usp_GetIngPizza');
	let pizza = {}
	pizzaIng.then((ing) => {
		pizza['ingredients'] = ing;
		let pizzaSize = procToJson('usp_GetTamPizza');
		pizzaSize.then((size) => {
			pizza['sizes'] = size;
			res.status(200).send(pizza);
		})
	});
}

exports.createPizza = (req, res) => {
	let pizza = req.body
}
