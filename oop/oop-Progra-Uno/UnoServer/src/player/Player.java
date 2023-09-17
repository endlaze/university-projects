/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package player;

import cards.Card;
import java.util.ArrayList;

/**
 *
 * @author diesv
 */
public class Player {
   ArrayList<Card> hand=new ArrayList<Card>();
   String name;
   String ip;
   Boolean turn;
   
   public Player(String name, String ip ){
       this.name=name;
       this.ip=ip;
       this.turn=false;
       
   }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }
    
    public void setCard(Card card){
        hand.add(0,card);
        
    }    
    public ArrayList<Card> getHand(){
        return hand;
        
    }

    public Boolean getTurn() {
        return turn;
    }

    public void setTurn(Boolean turn) {
        this.turn = turn;
    }
}
