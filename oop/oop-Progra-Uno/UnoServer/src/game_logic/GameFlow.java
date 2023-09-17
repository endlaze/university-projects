/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package game_logic;

import cards.Card;
import cards.ECardColor;
import cards.ECardType;
import deck.Deck;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import main_class.Commands;
import player.Player;
import uno_interface.IRemoteUno;
import main_class.MainServer;
import main_class.Notification;

/**
 *
 * @author andpi
 */
public class GameFlow implements IRemoteUno {
    private static GameFlow moves = new GameFlow();
    int noti;
    Notification notification=Notification.getInstance();
    int notifyCount;
    Deck deck = new Deck();
    ArrayList<Card> deckList = new ArrayList<Card>();
    ArrayList<Player> players = new ArrayList<Player>();
    ArrayList<Card> playedCards = new ArrayList<Card>();
    Card lastCard;

    boolean reverse = false;
    boolean isStarted=false;
    
    boolean isUno=false;
 
    int turno = 0;

    public void setIsStarted(boolean isStarted) {
        this.isStarted = isStarted;
    }

   
    


    ///// //////////Singleton //////////////
    private GameFlow() {
        this.deckList = deck.generateDeck();
        firstCard();
    }

 
    public static GameFlow getInstance() {
        return moves;
    }
    
 

    /////////////////////////////////////////
    @Override
    public boolean addPlayer(String name, String ip) throws RemoteException {
        boolean exists = false;

        if (validateName(name)) {
            exists = true;
        } else {
            players.add(new Player(name, ip));
        }
        return exists;
    }

    // Metodo para repartir 7 cartas a cada jugador al inicio
    public void dealFirstCards() {
        setIsStarted(true);
       
        
        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);
            for (int k = 0; k < 7; k++) {
                player.setCard(deckList.get(k));
                deckList.remove(k);
            }
        }
    }

    private void firstCard() {
        lastCard = deck.getCardFromDeck();
    }

    ///// Mecanismo para decir Uno //
    public String uno(Player player) {
        String uno = "";
        if (player.getHand().size() == 1) {
            uno = "Uno";
        }
        return uno;
    }

    ///// Pedir carta del deck //////////
   private Card drawCard() {
        Card retuCard;
        if (deckList.size() == 0) {
            deckList = deck.generateDeck();
        }
        retuCard = deckList.get(0);
        deckList.remove(0);

        return retuCard;
    }
   
   private void specialDrawCards(int quantity){
       nextTurn();
       Player player=players.get(turno);
       for(int x=0;x<quantity;x++){
           player.setCard(drawCard());
       }
       nextTurn();
   }
   
   private void executeSpecialCard(ECardType type){
       if(type.equals(ECardType.DRAW2)){
           specialDrawCards(2);
           
       }
       else if(type.equals(ECardType.WILDDRAW4)){
           specialDrawCards(4);
       }
       else if(type.equals(ECardType.SKIP)){
           skip();
       }
       else if(type.equals(ECardType.REVERSE)){
           setReverse();
       }
       
   }

    
    
    ///////////// Cambiar de turno ///////////////////
    public void nextTurn() {
        int prev=turno;
        if (reverse) {
            if (turno == 0) {
             
                turno = (players.size() - 1);
                
            } else {
                
                turno--;
                
            }
        } else {

            if (turno == players.size() - 1) {
                
                turno = 0;
            } else {
              
                turno++;
            }

        }
     
        setPlayerTurn(prev);
        setPlayerTurn(turno);
      
       
    }

    ///////////// skip /////////////////////
    private void skip() {
 
        nextTurn();
        String skippedname = players.get(turno).getName();
        notification.setMessage("Se ha saltado el turno de: "+skippedname);
        nextTurn();

    }
    
    

    ////// metodo para aplicar la reversa
    private void setReverse() {
        if (reverse) {
            this.reverse = false;

        } else {
            this.reverse = true;
        }
        for(int p=0;p<players.size();p++){
            nextTurn();
        }
        
    }

    private void setPlayerTurn(int index) {
        if(players.get(index).getTurn()){
            players.get(index).setTurn(false);
            
        }
        else{
            players.get(index).setTurn(true);
            
        }
        

    }


    private boolean validateTurn(String playerTurn) {
        boolean validTurn = false;
        Player player = players.get(turno);
       
        if (playerTurn.equals(player.getName())) {
            validTurn = true;
        }
        return validTurn;
    }


    @Override
    public void wildChangeColor(String color) throws RemoteException {
        String col="";
      

        if (color.startsWith("R")) {
            col="rojo";
            
            this.lastCard.setColor(ECardColor.RED);
       
        }
        if (color.startsWith("G")) {
            this.lastCard.setColor(ECardColor.GREEN);
            col="verde";
     

        }
        if (color.startsWith("B")) {
            this.lastCard.setColor(ECardColor.BLUE);
            col="azul";
       
        }
        if (color.startsWith("Y")) {
            this.lastCard.setColor(ECardColor.YELLOW);
            col="amarillo";
   
        }
        notification.setMessage("Se ha cambiado el color a "+col);

    }

    private Card getLastCard() {
        return lastCard;
    }
    //////////////////////////////////////////////////////////////
    @Override
    public ArrayList<String> getHand(String playerName) throws RemoteException {
        ArrayList<String> nombreCarta = new ArrayList<>();
        ArrayList<Card> hand = new ArrayList<>();
        for (int p = 0; p < players.size(); p++) {
            Player playerComp = players.get(p);
            if ((playerComp.getName()).equals(playerName)) {
                hand = playerComp.getHand();
                for (int i = 0; i < hand.size(); i++) {
                    nombreCarta.add(hand.get(i).getImageName());
                }
            }
        }

        return nombreCarta;

    }
////////////// metodo para obtener la lista de jugadores actuales

    public ArrayList<Player> getPlayers() {
        return players;
    }

    /////////////// Metodo para validad si un jugador existe  //////////////////////////////
    private boolean validateName(String player) {
        boolean compPlayer = false;
        if (players.size() != 0) {
            for (int c = 0; c < players.size(); c++) {

                if (players.get(c).getName().equals(player)) {
                    compPlayer = true;
                    break;
                }
            }
        }
        return compPlayer;
    }
////////////////////////Method para acceder a la posicion de un jugador /////////////

    private int getPlayerIndex(String wantedPlayer) {
        int index = -1;
        for (int c = 0; c < players.size(); c++) {
            if (players.get(c).getName().equals(wantedPlayer)) {
                index = c;
                break;
            }
        }
        return index;

    }

  
//////////////////// metodo para poner carta seleccionada en caso de que sea valida
    @Override
    public boolean validateLastCard(String nameComp, String playerComp) throws RemoteException {
        boolean compBool = false;
        if (validateTurn(playerComp)) {
            for (int c = 0; c < players.size(); c++) {
                if (players.get(c).getName().equals(playerComp)) {
                    if (validateCard(c, nameComp)) {
                        compBool = true;
                        
                       
                        break;
                    }
                    break;
                }
            }
        }
        return compBool;
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////

    private ArrayList<Card> getHandOfPlayer(int playerIndex) {
        ArrayList<Card> playerHand = players.get(playerIndex).getHand();
        return playerHand;
    }
/////////////////////////////////// Validar que la carta puede jugarse /////////////////////////////////////////////////////////////////////////////////////

    private boolean validateCard(int playerIndex, String cardNameComp) {
        Boolean special=false;
        ArrayList<Card> handOfPlayer = getHandOfPlayer(playerIndex);
        Card compCard = null;
      
        

        boolean compBool = false;
        for (int d = 0; d < (handOfPlayer.size()); d++) {

            compCard = handOfPlayer.get(d);

            char compChar = compCard.getName().charAt(compCard.getName().length() - 1);
            char lastChar = lastCard.getName().charAt(lastCard.getName().length() - 1);

            
            if (compCard.getName().equals(cardNameComp)) {
                special=isSpecial(compCard.getType());

                if (compCard.getType().equals(ECardType.WILD)) {
                    compBool = true;
                   
                   

                 
                } else if (compCard.getType().equals(ECardType.WILDDRAW4)) {
                  
                    compBool = true;
                   
                   

                   
                } else if (compCard.getColor() == lastCard.getColor()) {
                    compBool = true;
                }
                
              
                
                if (compChar == lastChar) {
                    compBool = true;
                }
             
                break;

            }
            /////////////////////////////////////////////////////////////////////////////////////////
        }
        //////// si la carta es especial, ejecuta el metodo segun el tipo
        
        
         if(special){
              executeSpecialCard(compCard.getType());
                    
          }
         else{
              nextTurn();
          }
         
        
        if (compBool == true) {
           
            setLastCard(compCard);
            handOfPlayer.remove(compCard);

            checkWin(playerIndex); 
        }
     
        
       
           
            
            
            
        
        
        
        return compBool;
    }

    public void setIsUno(boolean isUno) {
        this.isUno = isUno;
    }
    
    
    // Metodo para verificar si una carta es especial
    
    private boolean isSpecial(ECardType cardType){
        boolean condition=false;
        if((!cardType.equals(ECardType.NORMAL)) &&(!cardType.equals(ECardType.WILD))){
            condition=true;
        }
        return condition;
    }
    // Metodo para poner la ultima carta
    private void setLastCard(Card lastCard) {
        this.lastCard = lastCard;
    }
    
    //Metodo remoto que permite obtener la ultima carta

    @Override
    public String getLastCardPlayed() throws RemoteException {
        return lastCard.getImageName();
    }
    
    //Metodo remoto para dar una carta a un jugador en caso de que la pida

    @Override
    public String dealCardForPlayer(String playerName) throws RemoteException {
        String cardRet = "";
        if(isStarted){
       

       
            if (validateTurn(playerName)) {
                

                for (int pb = 0; pb < players.size(); pb++) {
                    if (players.get(pb).getName().equals(playerName)) {
                        Card reqCard = drawCard();
                        players.get(pb).setCard(reqCard);
                        cardRet = reqCard.getImageName();

                    }
                }
            }
        }
        

        return cardRet;
    }

    
//////////////////// Metodo remoto para obtener los nombres de los jugadores
    @Override
    public ArrayList<String> getPlayersNames() throws RemoteException {
        String playerInfo;
        ArrayList<String> cardsOfAllPlayers = new ArrayList<String>();
        for (int p = 0; p < players.size(); p++) {
            playerInfo = players.get(p).getName();
            cardsOfAllPlayers.add(playerInfo);
        }
        return cardsOfAllPlayers;
    }
    //Metodo remoto para obtener la cantidad de cartas de cada jugador 

    @Override
    public ArrayList<String> getPlayersNumberOfCards() throws RemoteException {
        String numberOfCards;
        ArrayList<String> cardsQuantity = new ArrayList<String>();
        for (int p = 0; p < players.size(); p++) {
            numberOfCards = Integer.toString(players.get(p).getHand().size());
            cardsQuantity.add(numberOfCards);
        }
        return cardsQuantity;

    }

    public void checkWin(int index){
        if (players.get(index).getHand().isEmpty()){
            String winner = players.get(index).getName();
            notification.setMessage("El ganador es: "+winner);
            Commands command = Commands.getCommandInstance();
            command.executeEndCommand();
        }
    }

    @Override
    public boolean uno(String playerName) throws RemoteException {
        boolean isOne=false;
        int index=getPlayerIndex(playerName);
        ArrayList<Card> playerHand=getHandOfPlayer(index);
        if(playerHand.size()==1){
           
            isOne=true;
        }
        return isOne;
        
        
    }
    

}
