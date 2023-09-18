/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package filesystem;

import disk.Disk;
import java.util.Arrays;
import org.apache.commons.io.FilenameUtils;

/**
 *
 * @author Diego
 */
public class Parser {
    
    Disk disk;
    public FS filesystem;
    
   
    public Parser() {
        this.disk = new Disk();
        this.filesystem = new FS(disk);
    }
      
    public String parseCommand(String command) {
        String[] tokens = command.split(" ");
        String cmd = tokens[0];
        
        switch (cmd) {
            case "init":
                initDisk(Integer.parseInt(tokens[1]), Integer.parseInt(tokens[2]));
                break;
            case "touch":
                touch(tokens[1], tokens[2]);
                break;
            case "mkdir":
                mkdir(tokens[1]);
                break;
            case "cd":
                changeDir(tokens[1]);
                break;
            case "ls":
                return list();
            case "edit":
                edit(tokens[1], tokens[2]);
                break;
            case "prop":
                return prop(tokens[1]);
            case "cat":
                return readFile(tokens[1]);
            case "cpy":
                copy(tokens);
                break;
            case "mv":
                move(tokens[1], tokens[2], tokens[3]);
                break;
            case "rm":
                removeFile(tokens[1]);
                break;
            case "rmdir":
                removeDir(tokens[1]);
                break;
            case "find":
                return find(tokens[1]);
            default:
                return cmd + " is not a command.\n";
           
                
        }
        return "\n";  
    }
    
    public boolean initDisk(int sectors, int sectorSize) {
        
        return disk.create(sectors, sectorSize);
    }
    
    public boolean touch(String filename, String content){
        return filesystem.createFileNode(FilenameUtils.getBaseName(filename), content, FilenameUtils.getExtension(filename));
    }
    
    public boolean mkdir(String dirname) {
        return filesystem.makeDir(dirname);
    }
    
    public boolean changeDir(String dirname){
        return filesystem.changeDir(dirname);
    }
    
    public String list() {
        return filesystem.listNodes().toString();
    }
    
    public boolean edit(String filename, String newContent) {
       return filesystem.editFile(filename, newContent);
    }
    
    public String prop(String filename) {
        return filesystem.fileProp(filename);
    }
    
    public String readFile(String filename) {
        return filesystem.readFile(filename);
    }
    
    public boolean copy(String[] tokens){
        if (tokens.length == 3 ) {
            return filesystem.copy(tokens[1], tokens[2]);
        }
        return filesystem.copy(tokens[1], tokens[2], tokens[3]);
    }
    
    public boolean move(String srcPath, String destPath, String newName) {
        return filesystem.move(srcPath, destPath, newName);
    }
    
    public String find(String pattern) {
        return filesystem.find(pattern, filesystem.getRoot());
    }
    
    public boolean removeFile(String filename) {
        return filesystem.deleteFileNode(filename, filesystem.getCurrentDir());
    }
    
    public void removeDir(String filename) {
        filesystem.deleteDir(filename, filesystem.getCurrentDir());
    }
    
    public String upDateTree(){
        return filesystem.printTree(0,filesystem.getRoot());
    }
    
    
}
