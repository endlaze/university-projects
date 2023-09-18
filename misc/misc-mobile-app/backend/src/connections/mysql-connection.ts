import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

class MySQLConnection {
  config: mysql.ConnectionConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USR,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: 3306
  };

  connection: mysql.Connection | any;

  constructor() {
    this.handleConnection();
  };

  handleConnection = () => {
    this.connection = mysql.createConnection(this.config); // Creates the connection

    this.connection.connect((err: any) => {
      if (err) { // The server is down or restarting
        console.error('error connecting: ' + err.stack);
        setTimeout(this.handleConnection, 2000) //Attemps to recreate the connection
      }
    });

    this.connection.on('error', (err: any) => {
      console.log('database error', err.stack);
      if (err.code = 'PROTOCOL_CONNECTION_LOST') { // Check if connection with server is lost
        this.handleConnection(); // Attempts to recreate the connection
      } else {
        throw err;
      };
    });
  };
};

export default new MySQLConnection().connection;
