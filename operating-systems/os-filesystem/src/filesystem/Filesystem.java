/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package filesystem;

import java.util.Arrays;
import java.util.Enumeration;

import disk.Disk;
import ui.MainUI;
import filesystem.nodes.FileNode;
import filesystem.nodes.Directory;
import java.util.Enumeration;
import java.util.ArrayList;

/**
 *
 * @author Diego
 */
public class Filesystem {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
       MainUI mainUI = new MainUI();
       mainUI.setVisible(true);
    }

}
