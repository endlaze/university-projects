import connection.DBConnection;
import views.LogIn;

import javax.swing.*;
import java.sql.Connection;
import java.sql.SQLException;

public class MainProgram {
    public static void main(String[] args) throws SQLException, ClassNotFoundException, UnsupportedLookAndFeelException, InstantiationException, IllegalAccessException {
        Connection connection = DBConnection.getInstance().getConnection();
        UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                LogIn logIn = new LogIn();
                logIn.setVisible(true);
            }
        });
    }
}
