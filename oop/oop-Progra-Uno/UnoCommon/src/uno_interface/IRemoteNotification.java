/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package uno_interface;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 *
 * @author diesv
 */
public interface IRemoteNotification extends Remote{
    
    public String notification() throws RemoteException;
           
}
