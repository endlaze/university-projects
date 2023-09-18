/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Triangle.Printers;

import Triangle.AbstractSyntaxTrees.Program;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;

/**
 *
 * @author diesv
 */
public class HTMLWriter {

    private String fileName;
    private String output;
// <editor-fold defaultstate="collapsed" desc="Reserved Words">    
    private String reservedWordsArray[] = {
        "and", //new
        "array",
        "const",
        "do",
        "else",
        "end",
        "for", //new
        "func",
        "if",
        "in",
        "init", //new
        "let",
        "local", //new 
        "loop", //new
        "of",
        "proc",
        "record",
        "recursive", //new
        "repeat", //new
        "skip", //new
        "then",
        "to", //new
        "type",
        "until", //new
        "var",
        "while",
        "Char",
        "Integer"
    };
// </editor-fold>    
    private HashSet<String> tokens = new HashSet<String>(Arrays.asList(reservedWordsArray));

    public HTMLWriter(String fileName) {
        this.fileName = fileName;
        this.output = fileName.substring(0, fileName.length() - 4) + ".html";
    }

    private void writeHTML(FileWriter fileWriter) {

        String line;

        try {
            InputStream fis = new FileInputStream(fileName);
            InputStreamReader isr = new InputStreamReader(fis, Charset.forName("UTF-8"));
            BufferedReader br = new BufferedReader(isr);
            while ((line = br.readLine()) != null) {
                fileWriter.write(printLine(line) + "\n");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());

        }

    }

    private String printLine(String line) {
        boolean commentFlag = false;
        String[] lineTokens = line.split(" ");
        String comment = "";
        String createdLine = "<p>";
        int tabs = (int) line.chars().filter(ch -> ch == '\t').count();
        if (tabs >= 1)
            createdLine += createdLine + String.join("", Collections.nCopies(tabs, "&emsp;"));

        for (String token : lineTokens) {

            if (token.startsWith("!")) {
                commentFlag = true;
            }
            
            if (commentFlag) {
                comment = comment + " " + token;
            } else {

                if (tokens.contains(token)) {
                    createdLine += buildResWord(token) + " ";
                } else if (isInteger(token) || isChar(token)) {
                    createdLine += buildLiteral(token) + " ";
                } else {
                    createdLine += token + " ";
                }

            }
        }

        if (commentFlag) {
            createdLine += buildComment(comment);
        }

        createdLine += "</p>";

        return createdLine;

    }

    private String buildResWord(String token) {
        return "<span style=\"font-weight : bold; color: black\">" + token + "</span>" + " ";
    }

    private String buildLiteral(String token) {
        return "<span style=\"color: blue\">" + token + "</span>";
    }

    private String buildComment(String comment) {
        return "<span style=\"color: green\">" + comment + "</span>";
    }

    public void write() {
        try {
            FileWriter fileWriter = new FileWriter(output);

            fileWriter.write("<!DOCTYPE html>");
            fileWriter.write('\n');
            fileWriter.write("<html>");
            fileWriter.write('\n');
            fileWriter.write("<head>");
            fileWriter.write('\n');
            //File style
            fileWriter.write("<style>html *{\n"
                    + "   font-size: 1em !important;\n"
                    + "   color: black;\n"
                    + "   font-family: Courier !important;\n"
                    + "   }</style>");
            fileWriter.write('\n');
            fileWriter.write("</head>");
            fileWriter.write('\n');
            fileWriter.write("</body>");
            fileWriter.write('\n');

            writeHTML(fileWriter);

            fileWriter.write("</body>");
            fileWriter.write("</html>");

            fileWriter.close();
            System.out.println("HTML file printed");

        } catch (IOException e) {
            System.err.println("Error while creating file for print the AST");
            e.printStackTrace();
        }
    }

    public boolean isInteger(String token) {
        try {
            Integer.parseInt(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isChar(String token) {
        return token.startsWith("'") && token.endsWith("'") && (token.length() == 3);
    }
}
