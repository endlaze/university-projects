/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package filesystem.nodes;

import java.util.Hashtable;

/**
 *
 * @author asanc
 */
public class Directory extends Node {

    private Hashtable<String, Node> nodes;

    public Directory(String name, String route, Directory parent) {
        super(NodeType.DIR, name, String.format("%s/%s", route, name), parent);
        this.nodes = new Hashtable<String, Node>();
    }

    public Hashtable<String, Node> getNodes() {
        return nodes;
    }

    public boolean pushNode(String key, Node node) {
        if (this.nodes.containsKey(key)) {
            return false;
        }

        this.nodes.put(key, node);
        return true;
    }

    public boolean containsNode(String key) {
        return this.nodes.containsKey(key);
    }

    public Node getNode(String key) {
        return this.nodes.get(key);
    }

    public boolean deleteNode(String key) {

        if (this.nodes.remove(key) == null) {
            return false;
        }

        return true;
    }
}
