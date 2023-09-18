/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Triangle.AbstractSyntaxTrees;

import Triangle.SyntacticAnalyzer.SourcePosition;

/**
 *
 * @author andpi
 */
public class LoopForCommand extends Command {

    public LoopForCommand(Declaration fDec, Expression e2AST, Command cAST, SourcePosition thePosition) {
        super(thePosition);
        F = fDec;
        E2 = e2AST;
        C = cAST;
    }

    public Object visit(Visitor v, Object o) {
        return v.visitLoopForCommand(this, o);
    }
    
    
    public Expression E2;
    public Command C;
    public Declaration F;
    
}
