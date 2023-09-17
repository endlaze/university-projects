/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package main_class;

import game_logic.GameFlow;
import java.rmi.RemoteException;
import java.util.Observable;
import uno_interface.IRemoteNotification;

/**
 *
 * @author diesv
 */
public class Notification extends Observable implements IRemoteNotification {
     
    private static Notification noti = new Notification();
    String message="";
    int count=0;

    public static Notification getInstance() {
        return noti;
    }

    private Notification() {

    }

    public void setMessage(String message) {
        this.message = message;
    }
    

    @Override
    public String notification() throws RemoteException {
        int amount=GameFlow.getInstance().getPlayers().size();
        
        String retMessage=this.message;
        
        if(count==(amount-1)){
            setMessage("");
            count=0;
        }
        if(!retMessage.equals("")){
            count++;
        }
        
        return retMessage;
        
        
    }
    
    
}
