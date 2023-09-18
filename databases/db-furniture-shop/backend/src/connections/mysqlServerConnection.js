import dotenv from 'dotenv';
import mysql from 'mysql'

dotenv.config();

let config = {
    host: process.env.SERVER,
    user: process.env.MYSQLUSR,
    password: process.env.PASSWORD,
    database: process.env.MYSQLDB,
}

let mysqlConnection = mysql.createConnection(config);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

export default mysqlConnection;
