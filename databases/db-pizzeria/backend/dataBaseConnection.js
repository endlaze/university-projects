require('dotenv').config()
let ConnectionPool = require('tedious-connection-pool');
let poolConfig = {
	min: 1,
	max: 1,
};

let config = {
	server: 'localhost',
	userName: process.env.USER,
	password: process.env.PASSWORD,
	options: {
		database: 'PrograPizzeria',
	}
};

let connection = new ConnectionPool(poolConfig, config);

module.exports = connection;