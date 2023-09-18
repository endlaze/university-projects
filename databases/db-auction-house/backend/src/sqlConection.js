require('dotenv').config()
let ConnectionPool = require('tedious-connection-pool');

let poolConfig = {
  min: 1,
  max: 1,
};

let config = {
	server: 'petrux25.database.windows.net',
	userName: process.env.USER,
	password: process.env.PASSWORD,
	options: {
    database: 'PrograCasaSubastas',
    encrypt: true
	}
};

// let config = {
//   server: 'localhost',
//   userName: process.env.USER,
//   password: process.env.PASSWORD,
//   options: {
//     database: 'PrograCasaSubastas',
//     encrypt: true
//   }
// };

createConfig = (user, password) => {
  config.userName = user
  config.password = password
}

class SQLConnection {
  constructor(user) {
    if (user === "Administrador") {
      createConfig(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD)
    }
    else if (user === "Agente") {
      createConfig(process.env.AGENT_USER, process.env.AGENT_PASSWORD)
    }
    else if (user === "Participante") {
      createConfig(process.env.PARTICIPANT_USER, process.env.PARTICIPANT_PASSWORD)
    }
    else {
      createConfig(process.env.USER, process.env.PASSWORD)
    }
    this.connection = new ConnectionPool(poolConfig, config)
  }

}

module.exports = {
  SQLConnection
};