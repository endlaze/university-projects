/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package deck;

import cards.Card;
import cards.ECardType;
import java.util.ArrayList;
import java.util.Collections;

/**
 *
 * @author andpi
 */
public class Deck {

    private static final int maxColorCards = 9;
    ArrayList<Card> fullDeck = new ArrayList<Card>();

    //////////// Constructor de la clase /////////////
    public Deck() {
        this.fullDeck = generateDeck();

    }

    ///////////////// Funcion para barajar el deck /////////////////////////
    public void shuffleDeck(ArrayList<Card> deckToShuffle) {
        for (int s = 0; s < 4; s++) {
            Collections.shuffle(deckToShuffle);
        }

    }

    ////////////////////////////  Funcion para generar nombres de carta de color //////////////////////////////////////////////////////////////
    private ArrayList<String> generateColorCardsNames() {
        ArrayList<String> colorArray = new ArrayList<String>();

        colorArray.add("Blue");colorArray.add("BlueR");colorArray.add("BlueS");colorArray.add("BlueD");
        colorArray.add("Red");colorArray.add("RedR");colorArray.add("RedS");colorArray.add("RedD");
        colorArray.add("Yellow");colorArray.add("YellowR");colorArray.add("YellowS");colorArray.add("YellowD");
        colorArray.add("Green");colorArray.add("GreenR");colorArray.add("GreenS");colorArray.add("GreenD");
        return colorArray;
    }

    //////////////////////////////// Funcion para generar los nombres de cartas especiales sin color ////////////////////////////////////////////////////////////////
    private ArrayList<String> generateSpecialCardsNames() {
        ArrayList<String> specialArray = new ArrayList<String>();
        specialArray.add("WildDraw4");
        specialArray.add("Wild");
        return specialArray;
    }

    ///////////////////////////////////////////////////  
    public ArrayList<Card> generateDeck() {
        ArrayList<String> colorCardsList = new ArrayList<String>();
        ArrayList<String> specialCardsList = new ArrayList<String>();
        ArrayList<Card> deck = new ArrayList<Card>();

        colorCardsList = generateColorCardsNames();
        specialCardsList = generateSpecialCardsNames();
        ECardType type;

        //// loop para generar las cartas normales e introducirlas en el ArrayList deck
        for (String index : colorCardsList) {
            boolean special = true;
            int numberOfCards = 1;

            if (index.endsWith("R")) {
                type = ECardType.REVERSE;
            } else if (index.endsWith("S")) {
                type = ECardType.SKIP;
            } else if (index.endsWith("D")) {
                type = ECardType.DRAW2;
            } else {
                special = false;
                numberOfCards = maxColorCards;
                type = ECardType.NORMAL;
            }

            for (int a = 0; a < numberOfCards; a++) {
                for (int b = 0; b < 2; b++) {
                    Card newCard;

                    if (special) {

                        newCard = new Card(index + ".jpg", (index), 20, type);

                    } else {
                        newCard = new Card((index + a + ".jpg"), (index + a), a, type);
                        if (a == 0) {
                            b = 2;
                        }
                    }
                    deck.add(newCard);
                }
            }
        }

        //////////// loop para generar cartas especiales
        for (String specialIndex : specialCardsList) {
            Card newCard;
            int value;
            if (specialIndex.endsWith("d")) {
                type = ECardType.WILD;
            } else {
                type = ECardType.WILDDRAW4;
            }
            for (int c = 0; c < 4; c++) {
                newCard = new Card(specialIndex + ".jpg", (specialIndex), 50, type);
                deck.add(newCard);
            }
        }
        for (int i = 0; i < 4; i++) {
            shuffleDeck(deck);
        }

        return deck;
    }
    
    // Funcion para tomar una carta del deck

    public Card getCardFromDeck() {
        Card retCard = fullDeck.get(0);
        fullDeck.remove(0);
        return retCard;
    }
}
