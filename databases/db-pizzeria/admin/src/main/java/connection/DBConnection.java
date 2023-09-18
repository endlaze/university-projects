package connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import io.github.cdimascio.dotenv.Dotenv;


public class DBConnection {
    private static DBConnection dbConnection = null;
    // Connect to your database.
    // Replace server name, username, and password with your credentials
    private Connection connection;
    private DBConnection() throws SQLException {
        Dotenv dotenv = Dotenv.load();
        String connectionUrl =
                "jdbc:sqlserver://localhost:1433;"
                        + "database=PrograPizzeria;"
                        + "user=" + dotenv.get("USER") + ";"
                        + "password=" + dotenv.get("PASSWORD") + ";";
        this.connection = DriverManager.getConnection(connectionUrl);
    }
    public static DBConnection getInstance() throws SQLException {
        dbConnection = (dbConnection == null)? new DBConnection():dbConnection;
        return dbConnection;
    }

    public Connection getConnection() {
        return connection;
    }
}