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
 * @author diego
 */
public interface IRemoteObserver extends Remote {
    void update(Object observable, Object updateMsg) throws RemoteException;

}
