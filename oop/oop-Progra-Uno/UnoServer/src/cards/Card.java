/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cards;
import java.io.Serializable;
import uno_interface.IRemoteUno;


/**
 *
 * @author andpi
 */
public class Card extends CardBase implements Serializable{
   public Card(String imageName,String name,int value, ECardType type){
       super(imageName,name,value,type);
       
   }
   public Card(){
       
       
   }

    public String getImageName() {
        return imageName;
    }
    public String getName() {
        return name;
    }
    public int getValue() {
        return value;
    }
    public ECardType getType() {
        return type;
    }
    public ECardColor getColor() {
        return color;
    }

    public void setColor(ECardColor color) {
        this.color = color;
    }
   


    
   

   
   
   
    
    
}
