/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Triangle.ContextualAnalyzer;

/**
 *
 * @author andpi
 */
public class LinkObject {
    
    private IdEntry latestNormalDecBeforeLocal; // Guarda la ultima declaracion normal antes de las declaraciones locales
    private IdEntry firstNormDecAfterLocal; // Almacena la primera declaracion normal luego de las declaraciones locales
    
    public LinkObject(IdEntry latestNormalDec){ // Crea un objeto de declaracion local
        this.latestNormalDecBeforeLocal = latestNormalDec; 
    }

    public void setFirstNormDecAfterLocal(IdEntry firstNormDecAfterLocal) { // Método para almacenar la primera declaracion normal luego de las declaraciones locales
        this.firstNormDecAfterLocal = firstNormDecAfterLocal;
    }
    
    public void linkNormalDeclarations () { // Método encargado de actualizar los punteros de las declaraciones normales antes y despues de las declaraciones locales
        this.firstNormDecAfterLocal.previous = this.latestNormalDecBeforeLocal;
    }
}
