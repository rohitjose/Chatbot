import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

import javax.swing.JFrame;
import javax.swing.JTextArea;
import javax.swing.JTextField;
 
 
public class Bot extends JFrame {
 
    //Typing Area:
    private JTextField txtEnter = new JTextField();
   
    //Chat Area:
    private JTextArea txtChat = new JTextArea();
   
    public Bot() {
        //Frame Attributes:
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(600, 600);
        this.setVisible(true);
        this.setResizable(false);
        this.setLayout(null);
        this.setTitle("Java AI");
       
        //txtEnter Attributes:
        txtEnter.setLocation(2, 540);
        txtEnter.setSize(590, 30);
       
        //txtEnter Action Event:
        txtEnter.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent arg0) {
                String uText = txtEnter.getText();
                txtChat.append("You: " + uText + "\n");
               
                if(uText.contains("hi")){
                    botSay("Hello there!");
                }
                else if(uText.contains("how are you")){
                    int decider = (int) (Math.random()*2+1);
                    if(decider == 1){
                        botSay("I'm doing well, thanks");
                    }
                    else if(decider == 2){
                        botSay("Not too bad");
                    }
                }
                else{
                    int decider = (int) (Math.random()*3+1);
                    if(decider == 1){
                        botSay("I didn't get that");
                    }
                    else if(decider == 2){
                        botSay("Please rephrase that");
                    }
                    else if(decider == 3){
                        botSay("???");
                    }
                }
                txtEnter.setText("");
            }
        });
       
        //txtChat Attributes:
        txtChat.setLocation(15, 5);
        txtChat.setSize(560, 510);
        txtChat.setEditable(false);
       
        //Add Items To Frame:
        this.add(txtEnter);
        this.add(txtChat);
    }
   
    public void botSay(String s){
        txtChat.append("AI: " + s + "\n");
    }
   
    public static void main(String[] args) throws FileNotFoundException{
        new Bot().fetchFile("http://timetable.unsw.edu.au/2017/KENSPGRDT1COMP.html");
        
    }
    
    public String fetchFile(String ur) throws FileNotFoundException
    {
  	  String htmlstr = new String();
  	  try{
  		  URL url = new URL(ur);//"http://www.austlii.edu.au/cgi-bin/sinodisp/au/cases/cth/FMCA/2012/37.html?stem=0&synonyms=0&query=title(DZAAN%20and%20Minister%20for%20Immigration%20)#disp4");
  			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
  			
  			
  			if (connection.getResponseCode() == 200) {
  				  InputStreamReader streamReader = new InputStreamReader(connection.getInputStream());
  				  Scanner scanner = new Scanner(streamReader).useDelimiter("\\n");
  				  
  				 
  				  while(scanner.hasNextLine())
  				  {
  					  String temp;
  					  scanner.nextLine();
  					  temp=scanner.next();
  					 
  				//	  if(temp.contains("<OL START=1>"))
  				//	  {
  					//	  htmlstr="";
  				//		  continue;
  				//	  }
  				/*	  if(temp.contains("AustLII:"))
  					  {
  						 htmlstr=htmlstr.replaceAll("&gt;&gt;&gt;", "");
  						  break;
  					  }*/
  					  
  					//  System.out.println(temp);
  				//	  if(temp.contains("</A>"))
  				//	  {
  						 // System.out.println(temp.indexOf("</A>", 0));
  					//	  String sub = temp.substring(0, temp.indexOf("</A>", 0));
  					//	  temp=sub.substring(sub.lastIndexOf(">")+1);
  					//	  System.out.println(temp);
  					//	  System.out.println("++++++++++++++++++++++++++++++++++++++++++");
  						// htmlstr+=temp;// + "\n ++++++++++++++++++++++++++++++++++++++++++ ";
  				//	  }
  					//  else
  					//  {
  					 
  						 
  						 
  					 // temp=temp.replaceAll("\\<.*?\\>", "");
  					  temp=temp.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
  					  
  					  temp=temp.replaceAll("\\&.*?\\;", "");
  					  temp=temp.replaceAll("\\n","");
  					  temp=temp.trim();
  					  htmlstr+=temp+"\n";
  					//  }
  				//	  System.out.println(htmlstr);
  				  }
  				//  System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Last edition^^^^^^^^^^^^^^^^^^^");
  				// System.out.println(htmlstr);
  					  
  			}
  		  }catch(Exception e)
  		  {
  			  System.out.println(htmlstr);
  			  PrintWriter out = new PrintWriter("/Users/fahdalhamazani/Documents/search1.txt");
  			  out.println(htmlstr);
  		  }
  	   
  		  PrintWriter out = new PrintWriter("/Users/fahdalhamazani/Documents/search12.txt");
  		  out.println(htmlstr);
  		  
  		  return htmlstr;
    }
 
}