/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package filesystem.nodes;

import java.util.Calendar;
import java.util.Date;
import utils.Utils;

/**
 *
 * @author asanc
 */
public class FileNode extends Node {

    private String content;
    private String ext;
    private int[] sectPtrs;

    public FileNode(String name, String content, String ext, String route, int[] sectPtrs, Directory parent) {
        super(NodeType.FILE, String.format("%s.%s", name, ext), String.format("%s/%s.%s", route, name, ext), parent);
        this.ext = ext;
        this.sectPtrs = sectPtrs;
    }

    public void setSectPtrs(int[] sectPtrs) {
        this.sectPtrs = sectPtrs;
    }



    public String getExt() {
        return ext;
    }

    public int[] getSectPtrs() {
        return sectPtrs;
    }
}
