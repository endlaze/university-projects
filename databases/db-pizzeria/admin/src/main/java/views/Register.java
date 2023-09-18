package views;

import models.Persona;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.SQLException;

public class Register extends JFrame {
    private JPanel mainPanel;
    private JLabel nombreLabel;
    private JFormattedTextField nombreTexBox;
    private JLabel apellidoLabel;
    private JFormattedTextField apellidoTextBox;
    private JLabel telefonoLabel;
    private JFormattedTextField telefonoTextBox;
    private JLabel direccionLabel;
    private JFormattedTextField direccionTextBox;
    private JLabel correoLabel;
    private JLabel correoRepLabel;
    private JFormattedTextField correoTextBox;
    private JFormattedTextField correoRepTextBox;
    private JButton registerButton;
    private JFormattedTextField cedulaTextBox;
    private JLabel cedulaLabel;

    public Register()  {
        add(mainPanel);
        setTitle("Registrarse");
        setSize(300,300);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);


        registerButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (!correoTextBox.getText().equals(correoRepTextBox.getText())){
                    System.out.println(correoTextBox.getText() + correoRepTextBox.getText() );
                    JOptionPane.showMessageDialog(null, "Los correos no son iguales, por favor verifique que los correos sean iguales");
                }
                else {
                    try {
                        registrar();
                    } catch (SQLException ex) {
                        ex.printStackTrace();
                    }
                    close();
                }
            }
        });
    }

    public void registrar() throws SQLException {
        Persona persona = new Persona(Integer.parseInt(cedulaTextBox.getText()),
                nombreTexBox.getText(),
                apellidoTextBox.getText(),
                correoTextBox.getText(),
                Integer.parseInt(telefonoTextBox.getText()),
                direccionTextBox.getText());

        persona.registrarPerona();
    }

    public void close() {
        this.setVisible(false);
    }
}
