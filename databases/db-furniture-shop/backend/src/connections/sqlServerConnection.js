import dotenv from 'dotenv';
import tedious from 'tedious'

dotenv.config();
let Connection = tedious.Connection

let config = {
	server: process.env.SERVER,
	authentication: {
		type: "default",
		options: {
			userName: process.env.SQLUSR,
			password: process.env.PASSWORD
		}
	},
	options: {
		database: process.env.SQLDB,
		port: parseInt(process.env.PORT),
		encrypt: false
	}
};

let connection = new Connection(config);

connection.on('connect', function (err) {
	if (err) {
		console.log('Error: ', err)
	}

});

export default connection;