/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package disk;

import filesystem.nodes.FileNode;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.RandomAccessFile;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 *
 * @author Diego
 */
public class Disk {
    
    public int sectors;
    public int sectorSize;
    public int diskSize;
    public RandomAccessFile virtualDisk;
    
    /** Creates virtual disk file and initializes it with null values
     *
     * @param sectors
     * @param sectorSize 
     */
    public boolean create(int sectors, int sectorSize) {
        this.sectors = sectors - 1;
        this.sectorSize = sectorSize;
        this.diskSize = sectors * sectorSize;
        try {
            virtualDisk = new RandomAccessFile("disk", "rw");
            virtualDisk.setLength(0);
            for(int i = 0; i < this.diskSize; i++ ) {
                virtualDisk.write(0);
            }
            
            
            System.out.println("Disk created");
            return true;
        } catch (Exception e) {
            
            e.printStackTrace(System.out);
            return false;
        }

    }
    
    /** Writes to first empty byte it encounters 
     * 
     * @param data 
     */
    
    private int write(byte[] data)  {
        try {
            for(int i = 0; i < this.diskSize; i = i + (this.sectorSize) ) {
                virtualDisk.seek(i);
                if( virtualDisk.read() == 0) {
                    virtualDisk.seek(i);
                    virtualDisk.write(data);
                    return i;
                }
            }
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
        return 0;
        
    }
    
    public int[] writeLine(byte[] data){
        
        int times = roundUp(data.length, this.sectorSize);
        int[] pointers = new int[times];
        
        for(int i = 0; i < times; i++){
            byte[] chunk = new byte[this.sectorSize];
            for(int j = 0; j < this.sectorSize; j ++) {
                chunk[j] = data[ this.sectorSize * i + j];
            }
            pointers[i] = write(chunk);
        }
        
        return pointers;
    }
    
    public int[] writeLine(String data) {
        String[] lines = data.split(String.format("(?<=\\G.{%s})", this.sectorSize) );
        int[] pointers = new int[lines.length];
        for(int i = 0; i < lines.length; i++){
            pointers[i] = this.write(lines[i].getBytes());
        }
        return pointers;
        
    }
    
    private void delete(int line) {
        try {
            RandomAccessFile file = new RandomAccessFile("disk", "rw");
            file.seek(line);
            for(int i = 0; i < this.sectorSize; i++ ) {
                file.write(0);
            }
            
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
        
        
    }
    
    
    public void deleteLines(int[] lines) {
        for (int line : lines) {
            delete(line);
        }
    }
    
    public int[] editLines(int[] sectors, String newLines) {
        deleteLines(sectors);
        return writeLine(newLines);
    }
    
    
    public byte[] readBytes(FileNode file) {
        byte[] fileData = new byte[file.getSectPtrs().length * this.sectorSize];
        
        int chunkNumber = 0;
        for(int sector : file.getSectPtrs()){
            try {
                byte[] chunk = new byte[this.sectorSize];
                
                virtualDisk.seek(sector);
                virtualDisk.read(chunk);
                               
                System.arraycopy(chunk, 0, fileData, chunkNumber * this.sectorSize, this.sectorSize);
                chunkNumber++;
            } catch (Exception e) {
                System.out.println(e.fillInStackTrace());
            }
            
        }
        return fileData;
    }
    
    public static int roundUp(int num, int divisor) {
        return (num + divisor - 1) / divisor;
    }
    
    
    
}


