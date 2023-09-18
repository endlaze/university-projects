package models;

import connection.DBConnection;

import java.sql.*;

public class Persona {
    private int cedula;
    private String nombre;
    private String apellido;
    private String correo;
    private int telefono;
    private String direccion;
    private DBConnection dbConnection;


    public Persona(int cedula, String nombre, String apellido, String correo, int telefono, String direccion) throws SQLException {
        dbConnection = DBConnection.getInstance();
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    public void registrarPerona () throws SQLException {
        Connection connection = dbConnection.getConnection();
        String spRegPersona = "EXEC [dbo].[usp_PersonaInsert] ?, ?, ?, ?, ?, ?";
        PreparedStatement ps = connection.prepareStatement(spRegPersona);

        ps.setEscapeProcessing(true);
        ps.setQueryTimeout(90);
        ps.setInt(1, this.cedula);
        ps.setString(2, this.nombre);
        ps.setString(3, this.apellido);
        ps.setString(4, this.correo);
        ps.setInt(5, this.telefono);
        ps.setString(6, this.direccion);

        ResultSet resultSet = ps.executeQuery();


    }

    public void obtenerUsuarios () throws SQLException {
        ResultSet resultSet = null;
        Statement statement = dbConnection.getConnection().createStatement();
        String selectSql = "SELECT * from INGREDIENTE";
        resultSet = statement.executeQuery(selectSql);

        while(resultSet.next()) {
            System.out.println(resultSet.getString(1) + " " + resultSet.getString(2));
        }

    }

}
