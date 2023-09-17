package uno_interface;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.rmi.Remote;
import java.rmi.RemoteException;
/**
 *
 * @author andpi
 */
public interface IRMIService extends Remote{
    void addObserver(IRemoteObserver o) throws RemoteException;
}
