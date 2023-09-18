/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package filesystem;

import disk.Disk;
import filesystem.nodes.Directory;
import filesystem.nodes.FileNode;
import filesystem.nodes.Node;
import filesystem.nodes.NodeType;
import java.io.File;
import java.io.RandomAccessFile;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.Optional;
import java.util.Scanner;
import org.apache.commons.io.FilenameUtils;
import utils.Utils;

/**
 *
 * @author asanc
 */
public class FS {

    /*private static FS INSTANCE;
    
    public static FS getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new FS();
        }
        return INSTANCE;
    }*/
    private Directory root;
    private Directory currentDir;
    private Disk disk;

    public FS(Disk disk) {
        this.root = new Directory("~", "", null);
        this.currentDir = this.root;
        this.disk = disk;
    }

    public boolean createFileNode(String name, String content, String ext) {
        int[] sectPtrs = this.disk.writeLine(content);

        if (sectPtrs.length == 0) {
            return false;
        }

        FileNode newFileNode = new FileNode(name, content, ext, this.currentDir.getRoute(), sectPtrs, this.currentDir);
        return this.currentDir.pushNode(newFileNode.getName(), newFileNode);
    }

    public boolean makeDir(String name) {
        Directory newDir = new Directory(name, this.currentDir.getRoute(), this.currentDir);
        return this.currentDir.pushNode(newDir.getName(), newDir);
    }

    public boolean deleteFileNode(String filename, Directory dir) {
        FileNode file = (FileNode) dir.getNodes().get(filename);
        disk.deleteLines(file.getSectPtrs());
        return dir.deleteNode(filename);
    }

    public void deleteDir(String dirname, Directory currDir) {
        Directory dirToDel = (Directory) currDir.getNodes().get(dirname);
        Enumeration enu = dirToDel.getNodes().keys();

        while (enu.hasMoreElements()) {

            Object ne = enu.nextElement();
            Node currentNode = (Node) dirToDel.getNodes().get(ne);

            if (currentNode.getType() == NodeType.DIR) {
                deleteDir(currentNode.getName(), dirToDel);
            } else {
                this.deleteFileNode(currentNode.getName(), dirToDel);
            }
        }

        currDir.getNodes().remove(dirname);
    }

    public Directory getRoot() {
        return root;
    }

    public Directory getCurrentDir() {
        return currentDir;
    }

    public void setCurrentDir(Directory newCurrDir) {
        this.currentDir = newCurrDir;
    }

    public boolean changeDir(String path) {
        String directories[] = path.split("/");

        for (String dir : directories) {

            if (dir.equals("..")) {
                this.currentDir = (Directory) this.currentDir.getParent();
            } else if (dir.equals("~")) {
                this.currentDir = this.root;
            } else if (dir.equals("") || dir.equals(".")) {
                ;
            } else {

                Directory nDir = (Directory) this.currentDir.getNodes().get(dir);

                if ((nDir == null) || (nDir.getType() == NodeType.FILE)) {
                    return false;
                }

                this.currentDir = nDir;
            }
        }

        return true;
    }

    public boolean copy(String type, String from) {

        switch (type) {
            case "REAL-VIRTUAL":
                return realToVirtualCopy(from);
            case "VIRTUAL-VIRTUAL":
                return virtualToVirtualCopy(from);
            default:
                System.out.println("Invalid copy strategy");

        }

        return false;
    }

    public boolean copy(String type, String from, String to) {
        switch (type) {
            case "VIRTUAL-REAL":
                return virtualToRealCopy(from, to);
            default:
                System.out.println("Invalid copy strategy");

        }

        return false;
    }

    private boolean realToVirtualCopy(String from) {
        String firstDir = this.currentDir.getRoute();
        File dir = new File(from);
        if (dir.isDirectory()) {
            makeDir(dir.getName());
            changeDir(dir.getName());
            File[] files = dir.listFiles();
            if (files != null && files.length > 0) {
                for (File file : files) {     
                    realToVirtualCopy(file.getAbsolutePath());
                }
            }

        } else {
            try {
                String fileData = "";
                Scanner myReader = new Scanner(dir);
                while (myReader.hasNextLine()) {
                    String data = myReader.nextLine();
                    fileData = new StringBuilder(fileData).append(data).toString();
                }

                createFileNode(FilenameUtils.getBaseName(dir.getName()), fileData, FilenameUtils.getExtension(dir.getName()).toString());
            } catch (Exception e) {
                e.printStackTrace(System.out);
                return false;
            }

        }
        changeDir(firstDir);

        return true;
    }

    private boolean virtualToVirtualCopy(String from) {
        String firstDir = this.currentDir.getRoute();
        Node node = fetchNode(from, this.currentDir);
        if (node.getType() == NodeType.DIR) {
            Directory dir = (Directory) node;
            makeDir(dir.getName());
            changeDir(dir.getName());
            final String route = this.currentDir.getRoute() + "/" + dir.getName();
            dir.getNodes().forEach((key, val) -> {
                virtualToVirtualCopy(val.getRoute());
            });
        } else {
            FileNode f = (FileNode) node;
            byte[] content = disk.readBytes(f);
            createFileNode(FilenameUtils.getBaseName(f.getName()), new String(content, StandardCharsets.UTF_8) , f.getExt());
        }
        changeDir(firstDir);
        return true;

    }

    private boolean virtualToRealCopy(String from, String to) {
        try {

            Node node = fetchNode(from, this.currentDir);
            if (node.getType() == NodeType.DIR) {
                Directory dir = (Directory) node;
                final String route = to + "/" + dir.getName();
                dir.getNodes().forEach((key, val) -> {
                    virtualToRealCopy(val.getRoute(), route);
                });
            } else {
                FileNode f = (FileNode) node;
                byte[] content = disk.readBytes(f);
                File path = new File(to, "rw");
                path.getParentFile().mkdirs();
                RandomAccessFile file = new RandomAccessFile(to + "/" + f.getName() + "." + f.getExt(), "rw");
                file.write(content);
            }

            return true;

        } catch (Exception e) {
            e.printStackTrace(System.out);
            return false;
        }
    }

    // ~/dir/file.txt/dir2/cualquiercosa.txt
    public Node fetchNode(String path, Directory baseDir) {
        String pathChunks[] = path.split("/");
        Node resDir = baseDir;

        for (String chunk : pathChunks) {

            if (chunk.equals("..")) {
                resDir = resDir.getParent();
            } else if (chunk.equals("~")) {
                resDir = this.root;
            } else if (chunk.equals("") || chunk.equals(".")) {
                ;
            } else {
                if (resDir.getType() == NodeType.DIR) {
                    Directory tempDir = (Directory) resDir;
                    resDir = tempDir.getNode(chunk);
                }

                if (resDir == null || resDir.getType() == NodeType.FILE) {
                    break;
                }
            }
        }
        return resDir;
    }

    public boolean move(String srcPath, String destPath, String newName) {
        Node srcNode = fetchNode(srcPath, this.currentDir);
        Node destNode = fetchNode(destPath, this.currentDir);

        if (srcNode == null || destNode == null || destNode.getType() != NodeType.DIR) {
            return false;
        }

        Directory destDir = (Directory) destNode;

        // Checks if the node is already in the HashTable
        String nodeNameAux = (newName == null) ? srcNode.getName() : newName;

        if (newName != null && srcNode.getType() == NodeType.FILE) {
            FileNode tempF = (FileNode) srcNode;
            nodeNameAux = String.format("%s.%s", nodeNameAux, tempF.getExt());
        }

        String finalName = nodeNameAux;

        int copyCount = 0;
        // Increases the copy count for the new node
        while (destDir.containsNode(finalName)) {
            copyCount++;
            finalName = nodeNameAux + "-Copy(" + copyCount + ")";
        }

        Directory srcNodeParent = (Directory) srcNode.getParent();
        srcNodeParent.deleteNode(srcNode.getName());

        srcNode.setName(nodeNameAux);
        return destDir.pushNode(finalName, srcNode);
    }

    public ArrayList<String> listNodes() {
        ArrayList<String> nodes = new ArrayList<String>();

        this.currentDir.getNodes().forEach((key, val) -> {
            String nName = String.format("%s [%s]", val.getName(), val.getType().toString());
            System.out.println(nName);
            nodes.add(nName);
        });

        return nodes;
    }

    public String find(String pattern, Directory dir) {

        ArrayList<String> foundNodes = new ArrayList<String>();
        ArrayList<String> dirs = new ArrayList<String>();
        String result = "";

        for (String key : dir.getNodes().keySet()) {
            Node val = dir.getNode(key);
            if (val.getType() == NodeType.DIR) {
                if (val.getName().contains(pattern)) {
                    result += val.getRoute() + "\n";
                }
                dirs.add(key);
            } else {
                if (key.contains(pattern)) {
                    result += val.getRoute() + "\n";
                }
            }
        }

        for (String dirKey : dirs) {
            result += find(pattern, (Directory) dir.getNode(dirKey));
        }

        return result;
    }

    public String printTree(int tabCount, Directory dir) {

        String tab = "  ";
        ArrayList<String> dirs = new ArrayList<String>();
        String tree = "";

        for (String key : dir.getNodes().keySet()) {
            Node n = dir.getNode(key);
            if (n.getType() == NodeType.DIR) {
                dirs.add(key);
            } else {
                tree += tab.repeat(tabCount) + "> " + n.getName() + "\n";
            }
        }

        for (String d : dirs) {
            tree += tab.repeat(tabCount) + "+ " + d + "\n";
            tree += printTree(tabCount + 1, (Directory) dir.getNode(d));
        }

        return tree;
    }

    public boolean editFile(String filename, String newContent) {
        try {
            FileNode file = (FileNode) fetchNode(filename, this.currentDir);
            int[] newSectors = disk.editLines(file.getSectPtrs(), newContent);
            file.setSectPtrs(newSectors);
            Date date = Calendar.getInstance().getTime();
            file.setUpdatedAt(Utils.formatDate(date));
            return true;
        } catch (Exception e) {
            e.printStackTrace(System.out);
            return false;
        }
    }

    public String fileProp(String filename) {
        FileNode file = (FileNode) fetchNode(filename, this.currentDir);
        return file.getProperties();
    }

    public String readFile(String filename) {
        FileNode file = (FileNode) fetchNode(filename, this.currentDir);
        byte[] fileData = disk.readBytes(file);
        return new String(fileData, StandardCharsets.UTF_8);
    }

}
