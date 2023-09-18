/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package filesystem.nodes;

import utils.Utils;
import java.util.Calendar;
import java.util.Date;

/**
 *
 * @author asanc
 */
public class Node {

    private NodeType type;
    private String name;
    private String route;
    private String createdAt;
    private String updatedAt;
    private Node parent;

    protected Node(NodeType type, String name, String route, Node parent) {
        this.type = type;
        this.name = name;
        this.route = route;
        this.parent = parent;

        Date date = Calendar.getInstance().getTime();
        this.createdAt = Utils.formatDate(date);
        this.updatedAt = Utils.formatDate(date);
    }

    public NodeType getType() {
        return type;
    }

    public void setType(NodeType type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public Node getParent() {
        return parent;
    }

    public void setParent(Node parent) {
        this.parent = parent;
    }
    
    public String getProperties(){
        return "name: " + this.name + "\n" +
                "route: " + this.route + "\n" +
                "created at: " + this.createdAt + "\n" +
                "updated at: " + this.updatedAt + "\n";
    }
}
