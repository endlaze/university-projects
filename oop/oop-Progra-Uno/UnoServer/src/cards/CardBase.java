package cards;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author andpi
 */
public class CardBase {
    String imageName;
    String name;
    int value;
    ECardType type;
    ECardColor color;
    public CardBase(){}
    
    public CardBase(String imageName,String name, int value, ECardType type){
        this.imageName=imageName;
        this.name=name;
        this.value=value;
        this.type=type;
        assignColor(name);    
    }  
    //Function to assign the color of the cards, using Enum values.
    
    private  void assignColor(String name){
      if(name.startsWith("B")){
          this.color=ECardColor.BLUE;
      } 
      if(name.startsWith("G")){
          this.color=ECardColor.GREEN;         
      }
       if(name.startsWith("R")){
             this.color=ECardColor.RED;    
      }
       if(name.startsWith("Y")){
          this.color=ECardColor.YELLOW;
      } 
       if(name.startsWith("W")){
           this.color=ECardColor.BLACK;
       }
   }
}
