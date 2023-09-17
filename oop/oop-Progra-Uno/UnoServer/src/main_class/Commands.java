/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package main_class;

import game_logic.GameFlow;
import java.util.ArrayList;
import player.Player;

/**
 *
 * @author andpi
 */
public class Commands {
    private static Commands commands=new Commands();
    
    private Commands(){
        
    }
    public static Commands getCommandInstance(){
        return commands; 
    }
    
    public void executePlayersCommand() {

        GameFlow GF = GameFlow.getInstance();
        ArrayList<Player> players = GF.getPlayers();
        System.out.println("Lista de jugadores: \n");
        for (int i = 0; i < players.size(); i++) {
            System.out.println("Jugador: " + players.get(i).getName() + ", IP: " + players.get(i).getIp() + "\n");
        }
        System.out.println("\n");

    }
    
    public void executeEndCommand(){
        System.exit(0);
    }
    
    public void executeStartCommand(){
        GameFlow gFlow = GameFlow.getInstance();
 
        gFlow.dealFirstCards();
        
        System.out.println("Game started");
    }


    
    
}
