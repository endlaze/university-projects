package main_class;


import cards.Card;
import game_logic.GameFlow;
import java.io.Serializable;
import java.rmi.RMISecurityManager;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import static java.rmi.server.RemoteServer.getClientHost;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.Date;
import java.util.Observable;
import java.util.Observer;
import player.Player;
import uno_interface.IRemoteUno;
import uno_interface.IRMIService;
import uno_interface.IRemoteObserver;
import java.util.Scanner;
import uno_interface.IRemoteNotification;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author andpi
 */
public class MainServer extends Observable implements IRMIService {
    private class WrappedObserver implements Observer, Serializable {

        private static final long serilVersionUID = 1L;
        private IRemoteObserver remoteObserver = null;
        

        public WrappedObserver(IRemoteObserver remoteObserver) {
            this.remoteObserver = remoteObserver;

        }

        @Override
        public void update(Observable o, Object arg) {
            try {
                remoteObserver.update(o.toString(), arg);

            } catch (Exception e) {
                System.out.println("Remote exception removing observer:" + this);
                o.deleteObserver(this);

            }
        }

    }

    /**
     * @param args the command line arguments
     */
    @Override
    public void addObserver(IRemoteObserver o) throws RemoteException {
        WrappedObserver mObserver = new WrappedObserver(o);
        addObserver(mObserver);
        
        System.out.println("Added observer" + mObserver);
    }

    Thread thread = new Thread() {

        @Override
        public void run() {
            while (true) {
                try {
                    Thread.sleep(3*1000);
                } catch (Exception e) {
                    //

                }
                setChanged();
                notifyObservers(new Date());
            }
        }
    ;

    };
    public MainServer() {
        thread.start();

    }

    public static void main(String[] args) {
        System.setProperty("java.security.policy", "file:./java.policy");

        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new RMISecurityManager());
        }

        try {
            Registry rmiRegistry = LocateRegistry.createRegistry(9999);

            IRMIService rmiService = (IRMIService) UnicastRemoteObject.exportObject(new MainServer(), 9999);
            rmiRegistry.bind("IRMIService", rmiService);
            
            
            
          
            GameFlow sendGame = GameFlow.getInstance();
          

            ///////////////////////////////////////////////////////////////////
            Registry r = LocateRegistry.createRegistry(9998);
            IRemoteUno uno = (IRemoteUno) UnicastRemoteObject.exportObject(sendGame, 9998);
            r.bind("Uno", uno);
            
            
            Notification notif=Notification.getInstance();
            Registry remNoti = LocateRegistry.createRegistry(9997);
            IRemoteNotification rmNoti=(IRemoteNotification)UnicastRemoteObject.exportObject(notif, 9997);
            remNoti.bind("Noti", rmNoti);
            
            
            
            
            

            System.out.println("Server running");
            Commands();

        } catch (Exception e) {
            e.printStackTrace();
        }
       
    }
    public static void Commands(){
        Notification not =Notification.getInstance();
        Commands com=Commands.getCommandInstance();
        while (true){
            Scanner sccommand = new Scanner(System.in);
            String command;
            command= sccommand.nextLine();
            if ("players".equals(command)){
             com.executePlayersCommand();
            }
            else if("end".equals(command)){
                com.executeEndCommand();
            }
            else if("start".equals(command)){
               com.executeStartCommand();
               not.setMessage("El juego ha comenzado");
               
              
               
            }      
            
        }
    }
   
           
   
}
