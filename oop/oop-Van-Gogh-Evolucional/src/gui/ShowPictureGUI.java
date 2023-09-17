package gui;


import javax.swing.JFrame;
import javax.swing.ImageIcon;
import javax.swing.JLabel;

public class ShowPictureGUI {

    public static void ShowPicture(){
        JFrame frame = new JFrame();
        ImageIcon icon = new ImageIcon("image.jpg");
        JLabel label = new JLabel(icon);
        JLabel label2 = new JLabel(icon);
        frame.add(label);
        frame.setDefaultCloseOperation
                (JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}
