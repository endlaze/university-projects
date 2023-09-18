/*
 * @(#)IdentificationTable.java                2.1 2003/10/07
 *
 * Copyright (C) 1999, 2003 D.A. Watt and D.F. Brown
 * Dept. of Computing Science, University of Glasgow, Glasgow G12 8QQ Scotland
 * and School of Computer and Math Sciences, The Robert Gordon University,
 * St. Andrew Street, Aberdeen AB25 1HG, Scotland.
 * All rights reserved.
 *
 * This software is provided free for educational use only. It may
 * not be used for commercial purposes without the prior written permission
 * of the authors.
 */

package Triangle.ContextualAnalyzer;

import Triangle.AbstractSyntaxTrees.Declaration;
import java.util.ArrayList;

public final class IdentificationTable {

  private int level;
  private IdEntry latest;
  private boolean isDecLocal;
  private boolean isDecLocalFinished;
  private ArrayList<LinkObject> linkObjStack = new ArrayList<LinkObject>();
  
  public IdentificationTable () {
    level = 0;
    latest = null;
    isDecLocal = false;
    isDecLocalFinished = true;
  }

  // Opens a new level in the identification table, 1 higher than the
  // current topmost level.

  public void openScope () {

    level ++;
  }

  // Closes the topmost level in the identification table, discarding
  // all entries belonging to that level.

  public void closeScope () {

    IdEntry entry, local;

    // Presumably, idTable.level > 0.
    entry = this.latest;
    while (entry.level == this.level) {
      local = entry;
      entry = local.previous;
    }
    this.level--;
    this.latest = entry;
  }

  // Makes a new entry in the identification table for the given identifier
  // and attribute. The new entry belongs to the current level.
  // duplicated is set to to true iff there is already an entry for the
  // same identifier at the current level.

  public void enter (String id, Declaration attr) {

    IdEntry entry = this.latest;
    boolean present = false, searching = true;

    // Check for duplicate entry ...
    while (searching) {
      if (entry == null || entry.level < this.level)
        searching = false;
      else if (entry.id.equals(id)) {
        present = true;
        searching = false;
       } else
       entry = entry.previous;
    }

    attr.duplicated = present;
    // Add new entry ...
    entry = new IdEntry(id, attr, this.level, this.latest);
    
    this.latest = entry;
    
    if(!this.isDecLocal && !this.isDecLocalFinished) {
        this.getTopLocalDeclaration().setFirstNormDecAfterLocal(this.latest); // Agrega la primera declaracion no local al LinkObject luego de las declaraciones locales
        this.updateIsDecLocalFinished();
    }
  }

  // Finds an entry for the given identifier in the identification table,
  // if any. If there are several entries for that identifier, finds the
  // entry at the highest level, in accordance with the scope rules.
  // Returns null iff no entry is found.
  // otherwise returns the attribute field of the entry found.

  public Declaration retrieve (String id) {

    IdEntry entry;
    Declaration attr = null;
    boolean present = false, searching = true;

    entry = this.latest;
    while (searching) {
      if (entry == null)
        searching = false;
      else if (entry.id.equals(id)) {
        present = true;
        searching = false;
        attr = entry.attr;
      } else
        entry = entry.previous;
    }

    return attr;
  }
  
  private void updateIsDecLocal() { // Actualiza la variable para manejar declaraciones locales
     this.isDecLocal = !this.isDecLocal;
  }
  
  private void updateIsDecLocalFinished() { // Actualiza la variable para indicar que las variables 
      this.isDecLocalFinished = !this. isDecLocalFinished;
  }
  
  private LinkObject getTopLocalDeclaration() { // Obtiene el tope de la pila de LinkObjects
      return this.linkObjStack.get((this.linkObjStack.size()-1));
  }
  
  public void beginLocalDeclarations() { 
      this.linkObjStack.add(new LinkObject(this.latest)); // Agrega la ultima declaracion no local al LinkObject
      this.updateIsDecLocal(); // Indica que las siguientes declaraciones van a ser locales
      this.updateIsDecLocalFinished(); // Indica que las declaraciones locales no han finalizado
  }
  
  public void endLocalDeclarations () {
    this.updateIsDecLocal(); // Indica que las siguientes declaraciones deben ser normales
  }
  
  public void popLinkObject() {
      this.getTopLocalDeclaration().linkNormalDeclarations(); // Actualiza los punteros de las declaraciones
      this.linkObjStack.remove((this.linkObjStack.size()-1)); // Remueve el LinkObject del tope de la pila
  }
 
  

}
