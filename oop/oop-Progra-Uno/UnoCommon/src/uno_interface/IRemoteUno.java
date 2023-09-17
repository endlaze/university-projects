package uno_interface;


import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author andpi
 */
public interface IRemoteUno extends Remote{
   
    public ArrayList<String> getHand(String playerName) throws RemoteException; 
    public boolean addPlayer(String name,String ip) throws RemoteException;
    public boolean validateLastCard(String nameComp,String playerComp) throws RemoteException;
    public String getLastCardPlayed()throws RemoteException;
    public String dealCardForPlayer(String playerName)throws RemoteException;
    public void wildChangeColor(String color) throws RemoteException;
  
    public ArrayList<String> getPlayersNames() throws RemoteException;
    public ArrayList<String> getPlayersNumberOfCards() throws RemoteException;
    
    public boolean uno(String playerName) throws RemoteException;
    
    
        
        
        
    
     
 
        
    
    
    
        
    
    
    
    
    
}
