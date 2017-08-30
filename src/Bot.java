import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

import javax.swing.JFrame;
import javax.swing.JTextArea;
import javax.swing.JTextField;


import opennlp.tools.postag.POSModel;
import opennlp.tools.postag.POSSample;
import opennlp.tools.postag.POSTaggerME;
import opennlp.tools.tokenize.WhitespaceTokenizer;
 
 
public class Bot extends JFrame {
 
	public static ArrayList<course> course_list ;
	public static String [] course_code ;
	public static String [] all_courses ={"ACTL" ,"AERO" ,"ANAT" ,"ARCH" ,"ARTS" ,"ATSI" ,"AUST" ,"AVEN" ,"AVIA" ,"AVIF" ,"AVIG",
			"BABS" ,"BEES" ,"BEIL" ,"BENV" ,"BINF" ,"BIOC" ,"BIOM" ,"BIOS" ,"BIOT" ,"BLDG",
			"CEIC" ,"CHEM" ,"CHEN" ,"CLIM" ,"CODE" ,"COMD" ,"COMM" ,"COMP" ,"CONS" ,"CRIM" ,"CRTV" ,"CVEN",
			"DATA" ,"DIPP",
			"ECON" ,"EDST" ,"ELEC" ,"ENGG" ,"ENVP" ,"ENVS" ,"EXCH",
			"FINS" ,"FOOD",
			"GBAT" ,"GENC" ,"GENE" ,"GENL" ,"GENM" ,"GENS" ,"GENT" ,"GENY" ,"GEOL" ,"GEOS" ,"GMAT" ,"GSBE" ,"GSOE" ,
			"HESC" ,"HUML" ,"HUMS",
			"IDES" ,"IEST" ,"INDC" ,"INFS" ,"INOV" ,"INST" ,"INTA",
			"JAPN" ,"JURD",
			"KORE",
			"LAND" ,"LAWS" ,"LING",
			"MANF" ,"MARK" ,"MATH" ,"MATS" ,"MBAX" ,"MDCN" ,"MDIA" ,"MECH" ,"MFAC" ,"MFIN" ,"MGMT" ,"MICR" ,"MINE" ,"MMAN" ,"MNGT" ,"MNNG" ,"MODL" ,"MSCI" ,"MTRN" ,"MUPS" ,"MUSC",
			"NANO" ,"NAVL" ,"NCHR" ,"NEUR",
			"OBST" ,"OPTM",
			"PATH" ,"PHAR" ,"PHCM" ,"PHOP" ,"PHSL" ,"PHTN" ,"PHYS" ,"PLAN" ,"POLS" ,"POLY" ,"PSCY" ,"PSYC" ,"PTRL",
			"REGZ" ,"REST" ,"RISK",
			"SCIF" ,"SENG" ,"SERV" ,"SLSP" ,"SOCF" ,"SOCW" ,"SOLA" ,"SOMS" ,"SOSS" ,"SPRC" ,"SRAP" ,"STAM" ,"SURG" ,"SUSD" ,"SWCH",
			"TABL" ,"TELE",
			"UDES" ,
			"VISN",
			"YMED"};
	
    //Typing Area:
    private JTextField txtEnter = new JTextField();
   
    //Chat Area:
    private JTextArea txtChat = new JTextArea();
   public Bot(int i)
   {
	   
   }
    public Bot() {
    	
    	course_list = new ArrayList<course>(); ;
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
               
                if(uText.contains("hi"))
                {
                    botSay("Hello there!");
                }
                else if(uText.contains("how are you"))
                {
                    int decider = (int) (Math.random()*2+1);
                    if(decider == 1){
                        botSay("I'm doing well, thanks");
                    }
                    else if(decider == 2){
                        botSay("Not too bad");
                    }
                }
                else{
                	try {
                		botSay(ask(uText));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
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
   
    public static void main(String[] args) throws IOException{
       // Bot b = new Bot();
        		
    	 //extract_timetable("http://timetable.unsw.edu.au/2017/KENSPGRDT2COMP.html");
    	/* b.extract_course_timetable("http://timetable.unsw.edu.au/2017/COMP3421.html");
    	 
    	 ArrayList<Teaching_info> temp = course_list.get(0).t;
    	 
    	 for(Teaching_info t : temp)
    	 {
    		 System.out.print(t.type+" ");
    		 System.out.print(t.period+" ");
    		 System.out.print(t.clas+" ");
    		 System.out.print(t.method+" ");
    		 System.out.print(t.status+" ");
    		 System.out.print(t.capacitiy+" ");
    		 System.out.print(t.day_time+" ");
    		 System.out.print(t.location+" ");
    		 System.out.println(t.instructor+" ");
    	 }*/
    	course_list= new ArrayList<course>();
    	String link = "http://timetable.unsw.edu.au/2017/ACCTKENS.html";
    	
    	for(int i=0;i< all_courses .length;i++)
    	{
    		
    		
    		Bot. extract_coursecode_timetable("http://timetable.unsw.edu.au/2017/"+all_courses[i]+"KENS.html");
    		 for(int j=0;j<course_code.length;j++)
    	       {
    	    	   if(course_code[j]==null )
    	    		   break;
    	    	   
    	    	   Bot.extract_course_timetable_v2("http://timetable.unsw.edu.au/2017/"+course_code[j]+".html");
    	    	  
    	       }
    	}
      
    	 Bot.writeToCSV();
    	 
    	 System.out.println("Done!");
    	
    }
    
    public static void writeToCSV() throws FileNotFoundException
	{
		
		File folder = new File("/Users/fahdalhamazani/Desktop/csv files");
		String n = "tsb-";
		String name;
		int a=0;
		int b=0;
		int c=0;
		int e=0;
		int f=0;
		
		File[] listOfFiles = folder.listFiles();
		String filesName [] = new String[listOfFiles.length];

		    for (int i = 0; i < listOfFiles.length; i++) {
		      if (listOfFiles[i].isFile()) {
		        System.out.println("File " + listOfFiles[i].getName());
		        filesName[i]=listOfFiles[i].getName();
		      } else if (listOfFiles[i].isDirectory()) {
		        System.out.println("Directory " + listOfFiles[i].getName());
		        filesName[i]=listOfFiles[i].getName();
		      }
		    }
		    
		    boolean lock=true;
		    Random randomGenerator = new Random();
		    while(true)
		    {
		    	 name=n;
		      a = randomGenerator.nextInt(100);
		      b = randomGenerator.nextInt(100);
		      c = randomGenerator.nextInt(100);
		      e = randomGenerator.nextInt(100);
		      f = randomGenerator.nextInt(100);
		      name=name+a+b+c+e+f;
		      for (int i = 0; i < filesName.length; i++)
		      {
		    	  if(filesName.equals(n))
		    	  {
		    		  lock=false;
		    		  break;
		    	  }
		      }
		      
		      if(lock)
		      {
		    	  break;
		      }
		      lock=true;
		    }
		    
		    
		    
		 PrintWriter pw = new PrintWriter(new File("/Users/fahdalhamazani/Desktop/csv files/"+name+".csv"));
	        StringBuilder sb = new StringBuilder();
	       
	        sb.append("TYPE");
	        sb.append(',');
	        sb.append("PERIOD");
	        sb.append(',');
	        sb.append("CLASS");
	        sb.append(',');
	        sb.append("METHOD");
	        sb.append(',');
	        sb.append("STATUS");
	        sb.append(',');
	        sb.append("CAPACITIY");
	        sb.append(',');
	        sb.append("DAY & TIME");
	        sb.append(',');
	        sb.append("LOCATION");
	        sb.append(',');
	        sb.append("INSTRUCTOR");
	        sb.append('\n');
	        
	        
	        ArrayList<Teaching_info> temp = null;
	    	
	        for(course crs : course_list)
	        {
	        	 temp = crs.t;
	       	 
	        	 for(Teaching_info t : temp)
	        	 {
	        		 if(t.type == null)
	        			 continue;
	        		 
	        		 
	        		 sb.append(t.type);
	        		 sb.append(',');
	        		 sb.append(t.period);
	        		 sb.append(',');
	        		 sb.append(t.clas);
	        		 sb.append(',');
	        		 sb.append(t.method);
	        		 sb.append(',');
	        		 sb.append(t.status);
	        		 sb.append(',');
	        		 sb.append(t.capacitiy);
	        		 sb.append(',');
	        		 sb.append(t.day_time);
	        		 sb.append(',');
	        		 sb.append(t.location);
	        		 sb.append(',');
	        		 sb.append(t.instructor);
	        		 sb.append('\n');
	        	 }
	        	// System.out.println("=============================================================================================\n\n");
	    	   
	       	 
	        }
	       
	        

	        pw.write(sb.toString());
	        pw.close();
	        System.out.println("done!");
	}
    
    public String building_timetable_Link(String semester , String year , String level , String course)
    {
    	
    	level=level.toUpperCase();
    	course=course.toUpperCase();
    	String link = "http://timetable.unsw.edu.au/"+year+"/KENS"+level+"GRDT"+semester+course+".html";
    	return link;
    }
    public String building_course_link(String year ,String course)
    {
    	course=course.toUpperCase();
    	return "http://timetable.unsw.edu.au/"+year+"/"+course+".html";
    }
    
    public String coindtions(String cond , String data)
    {
    	int slot =-1;
    	
    	String targeted_data="";
    	String ary_data [] = data.split("\n");
    	
    	cond = cond.trim();
    	String ary_cond [] = cond.split(" ");
    	
    	
    	for(int i=0; i<ary_cond.length;i++)
    	{
    		for(int j=0; j<ary_data.length;j++)
    		{
    			
    			
    			if(!ary_data[j].contains(ary_cond[i]))
    			{
    				ary_data[j]=null;
    			}
    			
    		}
    		
    	}
    	
    	for(int j=0; j<ary_data.length;j++)
    	{
    		if(ary_data[j] != null)
    			targeted_data+=ary_data[j]+"\n";
    	}
    	return targeted_data;
    }
    
   
    
    
    public boolean is_course_code(String term)
    {
    	// Kensington course codes
    	String t [] ={"ACTL" ,"AERO" ,"ANAT" ,"ARCH" ,"ARTS" ,"ATSI" ,"AUST" ,"AVEN" ,"AVIA" ,"AVIF" ,"AVIG",
    			"BABS" ,"BEES" ,"BEIL" ,"BENV" ,"BINF" ,"BIOC" ,"BIOM" ,"BIOS" ,"BIOT" ,"BLDG",
    			"CEIC" ,"CHEM" ,"CHEN" ,"CLIM" ,"CODE" ,"COMD" ,"COMM" ,"COMP" ,"CONS" ,"CRIM" ,"CRTV" ,"CVEN",
    			"DATA" ,"DIPP",
    			"ECON" ,"EDST" ,"ELEC" ,"ENGG" ,"ENVP" ,"ENVS" ,"EXCH",
    			"FINS" ,"FOOD",
    			"GBAT" ,"GENC" ,"GENE" ,"GENL" ,"GENM" ,"GENS" ,"GENT" ,"GENY" ,"GEOL" ,"GEOS" ,"GMAT" ,"GSBE" ,"GSOE" ,
    			"HESC" ,"HUML" ,"HUMS",
    			"IDES" ,"IEST" ,"INDC" ,"INFS" ,"INOV" ,"INST" ,"INTA",
    			"JAPN" ,"JURD",
    			"KORE",
    			"LAND" ,"LAWS" ,"LING",
    			"MANF" ,"MARK" ,"MATH" ,"MATS" ,"MBAX" ,"MDCN" ,"MDIA" ,"MECH" ,"MFAC" ,"MFIN" ,"MGMT" ,"MICR" ,"MINE" ,"MMAN" ,"MNGT" ,"MNNG" ,"MODL" ,"MSCI" ,"MTRN" ,"MUPS" ,"MUSC",
    			"NANO" ,"NAVL" ,"NCHR" ,"NEUR",
    			"OBST" ,"OPTM",
    			"PATH" ,"PHAR" ,"PHCM" ,"PHOP" ,"PHSL" ,"PHTN" ,"PHYS" ,"PLAN" ,"POLS" ,"POLY" ,"PSCY" ,"PSYC" ,"PTRL",
    			"REGZ" ,"REST" ,"RISK",
    			"SCIF" ,"SENG" ,"SERV" ,"SLSP" ,"SOCF" ,"SOCW" ,"SOLA" ,"SOMS" ,"SOSS" ,"SPRC" ,"SRAP" ,"STAM" ,"SURG" ,"SUSD" ,"SWCH",
    			"TABL" ,"TELE",
    			"UDES" ,
    			"VISN",
    			"YMED"};
    	
    	String A_code [] = {"ACTL" ,"AERO" ,"ANAT" ,"ARCH" ,"ARTS" ,"ATSI" ,"AUST" ,"AVEN" ,"AVIA" ,"AVIF" ,"AVIG"};
    	String B_code [] = {"BABS" ,"BEES" ,"BEIL" ,"BENV" ,"BINF" ,"BIOC" ,"BIOM" ,"BIOS" ,"BIOT" ,"BLDG"};
    	String C_code [] = {"CEIC" ,"CHEM" ,"CHEN" ,"CLIM" ,"CODE" ,"COMD" ,"COMM" ,"COMP" ,"CONS" ,"CRIM" ,"CRTV" ,"CVEN"};
    	String D_code [] = {"DATA" ,"DIPP"};
    	String E_code [] = {"ECON" ,"EDST" ,"ELEC" ,"ENGG" ,"ENVP" ,"ENVS" ,"EXCH"};
    	String F_code [] = {"FINS" ,"FOOD"};
    	String G_code [] = {"GBAT" ,"GENC" ,"GENE" ,"GENL" ,"GENM" ,"GENS" ,"GENT" ,"GENY" ,"GEOL" ,"GEOS" ,"GMAT" ,"GSBE" ,"GSOE" };
    	String H_code [] = {"HESC" ,"HUML" ,"HUMS"};
    	String I_code [] = {"IDES" ,"IEST" ,"INDC" ,"INFS" ,"INOV" ,"INST" ,"INTA"};
    	String J_code [] = {"JAPN" ,"JURD"};
    	String K_code [] = {"KORE"};
    	String L_code [] = {"LAND" ,"LAWS" ,"LING"};
    	String M_code [] = {"MANF" ,"MARK" ,"MATH" ,"MATS" ,"MBAX" ,"MDCN" ,"MDIA" ,"MECH" ,"MFAC" ,"MFIN" ,"MGMT" ,"MICR" ,"MINE" ,"MMAN" ,"MNGT" ,"MNNG" ,"MODL" ,"MSCI" ,"MTRN" ,"MUPS" ,"MUSC" };
    	String N_code [] = {"NANO" ,"NAVL" ,"NCHR" ,"NEUR"};
    	String O_code [] = {"OBST" ,"OPTM"};
    	String P_code [] = {"PATH" ,"PHAR" ,"PHCM" ,"PHOP" ,"PHSL" ,"PHTN" ,"PHYS" ,"PLAN" ,"POLS" ,"POLY" ,"PSCY" ,"PSYC" ,"PTRL"};
    	String R_code [] = {"REGZ" ,"REST" ,"RISK"};
    	String S_code [] = {"SCIF" ,"SENG" ,"SERV" ,"SLSP" ,"SOCF" ,"SOCW" ,"SOLA" ,"SOMS" ,"SOSS" ,"SPRC" ,"SRAP" ,"STAM" ,"SURG" ,"SUSD" ,"SWCH"};
    	String T_code [] = {"TABL" ,"TELE"};
    	String U_code [] = {"UDES" };
    	String V_code [] = {"VISN"};
    	String Y_code [] = {"YMED"};
    	char code =term.toUpperCase().charAt(0);
    	
    	switch(code) {
        case 'A' :
        	for(String cod : A_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;   
        case 'B' :
        	for(String cod : B_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case ('C') :
        	for(String cod : C_code )
        	{
        		
        		if(term.equalsIgnoreCase(cod))
        		{
        			return true;
        		}
        			
        	}
        	return false;
        case 'D' :
        	for(String cod :D_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;         
        case 'E' :
        	for(String cod : E_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'F' :
        	for(String cod : F_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'G' :
        	for(String cod : G_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'H' :
        	for(String cod : H_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'I' :
        	for(String cod : I_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'J' :
        	for(String cod : I_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'K' :
        	for(String cod : K_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'L' :
        	for(String cod : L_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'M' :
        	for(String cod : M_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'N' :
        	for(String cod : N_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'O' :
        	for(String cod : O_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'P' :
        	for(String cod : P_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'R' :
        	for(String cod : R_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'S' :
        	for(String cod : S_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'T' :
        	for(String cod : T_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'U' :
        	for(String cod : U_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'V' :
        	for(String cod : V_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        case 'Y' :
        	for(String cod : Y_code )
        	{
        		if(term.equalsIgnoreCase(cod))
        			return true;
        	}
        	return false;
        default :
        	return false;
     }
    	
    	
    	
    	
    }
    
    public boolean is_week_day(String day)
    {
    	
    	if(day.equalsIgnoreCase("monday"))
    	{
    		return true;
    	}
    	else if(day.equalsIgnoreCase("tuesday"))
    	{
    		return true;
    	}
    	else if(day.equalsIgnoreCase("wednesday"))
    	{
    		return true;
    	}
    	else if(day.equalsIgnoreCase("thursday"))
    	{
    		return true;
    	}
    	else if(day.equalsIgnoreCase("friday"))
    	{
    		return true;
    	}
    	return false;
    }
    
    public boolean is_semester(String sem)
    {
    	sem=sem.trim();
    	int semester=0;
    	if(sem.length()==1 & Character.isDigit(sem.charAt(0)))
    	{
    		semester = Integer.parseInt(sem);
    	}
    	else
    	{
    		semester = convertSemester_letter_to_number(sem);
    	}
    	
    	
    	if(semester == 1)
    	{
    		return true;
    	}
    	else if(semester == 2)
    	{
    		return true;
    	}
    	return false;
    }
    
    
    public boolean is_year(String yer)
    {
    	
    	yer=yer.trim();
    	
    	if(yer.length()==4)
    	{
    		char c[] = yer.toCharArray();
    		for(char l : c)
    		{
    			 if(!Character.isDigit(l))
    			 {
    				 return false;
    			 }
    		}
    		return true;
    	}
    	
    	return false;
    }
    
    
    public int convertSemester_letter_to_number(String sem)
    {
    	if(sem.equalsIgnoreCase("two"))
    		return 2;
    	else if (sem.equalsIgnoreCase("one"))
    		return 1;
    	
    	return -1;
    		
    }
   
    
    public String ask(String req) throws IOException
    {
    	
    	
    	
    	
    	
    	//first: convert to lower case 
    	req=req.toLowerCase();
    	//second: trim empty space and check if there is no requiest [ thnx Dr Helen Paik  (^_^)]
    	req= req.trim();
    	if(req.isEmpty() || req.length()<= 2)
    		return"" ;
    	
    	
    	String temp="";
    	String result="";
    	
    	String wrds [] =req.split(" +");
    	req="";
    	for(String trm : wrds)
    	{
    		System.out.println("trm is "+ trm);
    		System.out.println("condition 1: "+trm.length());
    		//System.out.println("char at 4 is: "+trm.charAt(4));
    	//	System.out.println("condition 2:  "+ Character.isDigit(+trm.charAt(4)));
    		if(trm.length() == 8 && Character.isDigit(+trm.charAt(4)))
    		{
    			if( is_course_code(trm.substring(0, 4)))
    			{
    				temp=trm;
        			result+=("course code: "+temp+"\n");
        			continue;
    			}
    		}
    		
    		if(trm.length()==4 )
    		{
    			
    			if( is_course_code(trm))
    			{
    				temp=trm;
        			result+=("course code without number: "+temp+"\n");
        			continue;
    			}
    			else if (is_year(trm))
    			{
    				int y = Integer.parseInt(trm);
    				 result+=("year is "+y+"\n");
    				continue;
    			}
    			
    			
    		}
    		else if (trm.length() == 3 || trm.length()==1)
    		{
    				if(is_semester(trm))
    				{
    					System.out.println("semester +++++++++++++++++");
    					if(trm.length() == 3)
    					{
    						result+="semester "+ convertSemester_letter_to_number(trm)+"\n";
    						continue;
    					}
    					else
    					{
    						result+="semesterss "+trm+"\n";
    						continue;
    					}
    				}
    		}
    		
    		else if (trm.length() >= 6)
    		{
    			if(is_week_day(trm))
    			{
    				System.out.println("day +++++++++++++++++");
    				result+="day is "+trm+"\n";
    				continue;
    			}
    		}
    		req+=trm+" ";
    		
    		
    	}
    	//req=req.substring(0,req.length()-1);
    	System.out.println("new req is "+req);
    	//third: filter and take only noun words
    	String filter_req  = Tagger(req);
    	
    	// fourth: divide them to token by splitting '-'
    	String requiest [] = filter_req.split("-");
    	
    	for(int i=0; i<requiest.length;i++)
    	{
    		System.out.println("checking: "+requiest[i]);
    	}
    	
    	//fifth: serve requiest
    	for(int i=0; i<requiest.length;i++)
    	{
    		
    		
    		
    		if(requiest[i].length()>4)
    		{
    			temp=requiest[i];
    			
    			if(Character.isDigit(temp.charAt(4)))
    			{
    				result+=("course code: "+temp+"\n");
    			}
    			else if(temp.equals("discription") | temp.equals("discriptions"))
    			{
    				result+=("course discription: "+temp+"\n");
    			}
    			else if(temp.equals("outline") )
    			{
    				result+=("outline: "+temp+"\n");
    			}
    			
    		}
    		
    		
    		
    	}
    	return result;
    }
    
    
    //----------------------------extraction Function+++++++++++++++++++++++++++++++++++++++++++
    
    public static  String extract_course_timetable(String ur) throws FileNotFoundException
    {
    	String day_time="";
    	String location="";
    	String instructor ="";
    	course crs = null;
    	int obj_counter = 0;
    	crs = new course();
		  crs.t.add(new Teaching_info());
    	 String htmlstr = new String();
     	  try{
     		  URL url = new URL(ur);//"http://www.austlii.edu.au/cgi-bin/sinodisp/au/cases/cth/FMCA/2012/37.html?stem=0&synonyms=0&query=title(DZAAN%20and%20Minister%20for%20Immigration%20)#disp4");
     			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
     			
     			
     			if (connection.getResponseCode() == 200) {
     				  InputStreamReader streamReader = new InputStreamReader(connection.getInputStream());
     				  Scanner scanner = new Scanner(streamReader).useDelimiter("\\n");
     				  htmlstr="";
     						  
     				 int counter=0;
     				  while(scanner.hasNextLine())
     				  {
     					  String temp;
     					  scanner.nextLine();
     					  temp=scanner.next();
     					  
     					  
     					 // System.out.println(temp);
     					  if(temp.contains("rowLowlight") || temp.contains("rowHighlight"))
     					  {
     						htmlstr+="\n";
     						counter=7;
     						System.out.println("counter=7");
     						continue;
     						
     					  }
     						  
     					  
     					   if(counter >0)
        					{
     						 temp=temp.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
     						  temp=temp.trim();
     						 
     						  if(counter ==7  )
     						  {
     							  if( (temp.contains("Lecture") |temp.contains("Tutorial")))
     							  {
     								 System.out.println("7");
     								  crs.t.get(obj_counter).type = temp;
     							  }
     							  else
     							  {
     								
     								 day_time=temp;
     								  
     								 scanner.nextLine();
     			     				 temp=scanner.next();
     			     				 temp=temp.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
     			     				 day_time+=" "+temp.trim();
     			     					
     			     				 scanner.nextLine();
   			     					 temp=scanner.next();
   			     					 location=temp;
   			     					 scanner.nextLine();
   			     					 scanner.next();
   			     					 
   			     					 scanner.nextLine();
  			     					// scanner.next();
  			     					 
  			     					 instructor=scanner.next();
  			     					 instructor=instructor.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
  			     					location=location.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
  			     					//day_time=day_time.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
  			     					 
  			     				//	 System.out.println(">>>>>>>>>>location"+location);
  			     				//	 System.out.println(">>>>>>>>>>instructor"+instructor);
  			     				//	 System.out.println(">>>>>>>>>>day_time"+day_time);
   			     					  for(int j=0;j<obj_counter;j++)
   			     					  {
   			     						  if(crs.t.get(j).day_time.contains(day_time))
   			     						  {
   			     						//	 System.out.println(">>>>>>>>>><<<<<<<<<<<<<<");
   			     							crs.t.get(j).location=location.trim();
   			     							crs.t.get(j).instructor=instructor.trim();
   			     						  }
   			     					  }
     								  
     								  counter =0;
     								 
     						//		  System.out.println("counter=0");
     								  continue;
     							  }
     								
     						  }
     						  
     						  else if(counter == 6)
     						  {
     						//	 System.out.println("6");
     							 crs.t.get(obj_counter).period = temp;
     						  }
     						 else if(counter == 5)
    						  {
     						//	System.out.println("5");
    							 crs.t.get(obj_counter).clas = Integer.parseInt(temp);
    						  }
     						 else if(counter == 4)
     						 {
     					//		System.out.println("4");
     							 crs.t.get(obj_counter).method =temp;
     						 }
     						else if(counter == 3)
    						 {
     						//	System.out.println("3");
    							 crs.t.get(obj_counter).status =temp;
    						 }
     						else if(counter == 2)
    						 {
     						//	System.out.println("2");
    							 crs.t.get(obj_counter).capacitiy =temp;
    						 }
     						else if(counter == 1)
    						 {
     						//	System.out.println("1");
    							 crs.t.get(obj_counter).day_time =temp;
    						 }
         					  htmlstr+=temp+"  | ";
         					  
         					// System.out.println("inside");
         					  counter--;
         					  
         					 if(counter ==0)
         					 {
         					//	crs = new course();
         						crs.t.add(new Teaching_info());
         						//System.out.println("0"); 
         						 obj_counter++;
         					 }
         						
        					}
     					 
     				
     				  }
     				
     					  
     			}
     		  }catch(Exception e)
     		  {
     			 System.out.println("error"+e); 
     			 // System.out.println(htmlstr);
     			
     		  }
     	  		
     	  try{
     	  	course_list.add(crs);
     	  }
     	  catch(Exception e)
     	  {
     		// System.out.println("error2"+e); 
     	  }
     	  
     	  		System.out.println(htmlstr);
     		  return htmlstr;
       
    }
    
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    public static void extract_course_timetable_v2(String ur) throws FileNotFoundException
    {
    	String day_time="";
    	String location="";
    	String instructor ="";
    	course crs = null;
    	int obj_counter = 0;
    	crs = new course();
		  crs.t.add(new Teaching_info());
    	
     	  try{
     		  URL url = new URL(ur);//"http://www.austlii.edu.au/cgi-bin/sinodisp/au/cases/cth/FMCA/2012/37.html?stem=0&synonyms=0&query=title(DZAAN%20and%20Minister%20for%20Immigration%20)#disp4");
     			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
     			
     			
     			if (connection.getResponseCode() == 200) {
     				  InputStreamReader streamReader = new InputStreamReader(connection.getInputStream());
     				  Scanner scanner = new Scanner(streamReader).useDelimiter("\\n");
     				
     						  
     				 int counter=0;
     				  while(scanner.hasNextLine())
     				  {
     					  String temp;
     					  scanner.nextLine();
     					  temp=scanner.next();
     					  
     					  
     					 // System.out.println(temp);
     					  if(temp.contains("rowLowlight") || temp.contains("rowHighlight"))
     					  {
     						
     						counter=7;
     					
     						continue;
     						
     					  }
     						  
     					  
     					   if(counter >0)
        					{
     						 temp=temp.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
     						  temp=temp.trim();
     						 
     						  if(counter ==7  )
     						  {
     							  if( (temp.contains("Lecture") |temp.contains("Tutorial")))
     							  {
     								
     								  crs.t.get(obj_counter).type = temp;
     							  }
     							  else
     							  {
     								
     								 day_time=temp;
     								  
     								 scanner.nextLine();
     			     				 temp=scanner.next();
     			     				 temp=temp.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
     			     				 day_time+=" "+temp.trim();
     			     					
     			     				 scanner.nextLine();
   			     					 temp=scanner.next();
   			     					 location=temp;
   			     					 scanner.nextLine();
   			     
   			     					 scanner.next();
   			     					 
   			     					 scanner.nextLine();
  			     					
  			     					 
  			     					 instructor=scanner.next();
  			     					 instructor=instructor.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
  			     					location=location.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
  			     				
   			     					  for(int j=0;j<obj_counter;j++)
   			     					  {
   			     						  if(crs.t.get(j).day_time.contains(day_time))
   			     						  {
   			     						
   			     							crs.t.get(j).location=location.trim();
   			     							crs.t.get(j).instructor=instructor.trim();
   			     						  }
   			     					  }
     								  
     								  counter =0;
     								 
     					
     								  continue;
     							  }
     								
     						  }
     						  
     						  else if(counter == 6)
     						  {
     						//	 System.out.println("6");
     							 crs.t.get(obj_counter).period = temp;
     						  }
     						 else if(counter == 5)
    						  {
     						//	System.out.println("5");
    							 crs.t.get(obj_counter).clas = Integer.parseInt(temp);
    						  }
     						 else if(counter == 4)
     						 {
     					//		System.out.println("4");
     							 crs.t.get(obj_counter).method =temp;
     						 }
     						else if(counter == 3)
    						 {
     						//	System.out.println("3");
    							 crs.t.get(obj_counter).status =temp;
    						 }
     						else if(counter == 2)
    						 {
     						//	System.out.println("2");
    							 crs.t.get(obj_counter).capacitiy =temp;
    						 }
     						else if(counter == 1)
    						 {
     						//	System.out.println("1");
    							 crs.t.get(obj_counter).day_time =temp;
    						 }
         					
         					  
         					// System.out.println("inside");
         					  counter--;
         					  
         					 if(counter ==0)
         					 {
         					//	crs = new course();
         						crs.t.add(new Teaching_info());
         						//System.out.println("0"); 
         						 obj_counter++;
         					 }
         						
        					}
     					 
     				
     				  }
     				
     					  
     			}
     		  }catch(Exception e)
     		  {
     			 System.out.println("error"+e); 
     		 }
     	  		
     	  try
     	  {
     	  	course_list.add(crs);
     	  }
     	  catch(Exception e)
     	  {
     	//	 System.out.println("error2"+e); 
     	  }
    }
    
    public static String extract_handbook(String ur) throws FileNotFoundException
    {
    	return "";
    }
    
    
    
    public static String extract_timetable(String ur) throws FileNotFoundException
    {
    	
      	  String htmlstr = new String();
      	  try{
      		  URL url = new URL(ur);//"http://www.austlii.edu.au/cgi-bin/sinodisp/au/cases/cth/FMCA/2012/37.html?stem=0&synonyms=0&query=title(DZAAN%20and%20Minister%20for%20Immigration%20)#disp4");
      			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      			
      			
      			if (connection.getResponseCode() == 200) {
      				  InputStreamReader streamReader = new InputStreamReader(connection.getInputStream());
      				  Scanner scanner = new Scanner(streamReader).useDelimiter("\\n");
      				  htmlstr=" \033[31m course code   \033[0m   |        title            |   credit    |\n";
      						  
      				 int counter=0;
      				  while(scanner.hasNextLine())
      				  {
      					  String temp;
      					  scanner.nextLine();
      					  temp=scanner.next();
      					  
      					  
      					 // System.out.println(temp);
      					  if(temp.contains("rowLowlight") || temp.contains("rowHighlight"))
      					  {
      						htmlstr+="\n------------------------------------------------------------\n";
      						counter=3;
      						continue;
      					  }
      						  
      					  
      					   if(counter >0)
         					{
      						 temp=temp.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
      						  temp=temp.trim();
          					  htmlstr+=temp+"";
          					  counter--;
         					}
      					 
      				
      				  }
      				
      					  
      			}
      		  }catch(Exception e)
      		  {
      			  System.out.println(htmlstr);
      			//  PrintWriter out = new PrintWriter("/Users/fahdalhamazani/Documents/search1.txt");
      			//  out.println(htmlstr);
      		  }
      	   
      		 // PrintWriter out = new PrintWriter("/Users/fahdalhamazani/Documents/search12.txt");
      		//  out.println(htmlstr);
      	  		System.out.println(htmlstr);
      		  return htmlstr;
        
    }
    
    
    
    //################################################
    
    public static void extract_coursecode_timetable(String ur) throws FileNotFoundException
    {
    	course_code = new String [400];
    	int index=0;
      	  String htmlstr = new String();
      	  try{
      		  URL url = new URL(ur);//"http://www.austlii.edu.au/cgi-bin/sinodisp/au/cases/cth/FMCA/2012/37.html?stem=0&synonyms=0&query=title(DZAAN%20and%20Minister%20for%20Immigration%20)#disp4");
      			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      			
      			
      			if (connection.getResponseCode() == 200) {
      				  InputStreamReader streamReader = new InputStreamReader(connection.getInputStream());
      				  Scanner scanner = new Scanner(streamReader).useDelimiter("\\n");
      				 
      						  
      				 int counter=0;
      				  while(scanner.hasNextLine())
      				  {
      					  String temp;
      					  scanner.nextLine();
      					  temp=scanner.next();
      					  
      					  
      					 // System.out.println(temp);
      					  if(temp.contains("rowLowlight") || temp.contains("rowHighlight"))
      					  {
      						
      						counter=1;
      						continue;
      					  }
      						  
      					  
      					   if(counter >0)
         					{
      						 temp=temp.replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*", "");
      						  temp=temp.trim();
          					 course_code[index]=temp+"";
          					  index++;
          					  counter--;
         					}
      					 
      				
      				  }
      				
      					  
      			}
      		  }catch(Exception e)
      		  {
      			
      			System.out.println(e);
      		  }
    }
    
    //###############################################
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
    
    //----------------------------------AI - function
    
    public String Tagger(String content) throws IOException
	{
    
    	
		 //Loading Parts of speech-maxent model       
	      InputStream inputStream = new 
	         FileInputStream("/Users/fahdalhamazani/Documents/openNLP/models/en-pos-maxent.bin"); 
	      POSModel model = new POSModel(inputStream); 
	       
	      //Instantiating POSTaggerME class 
	      POSTaggerME tagger = new POSTaggerME(model); 
	       
	     
	      WhitespaceTokenizer whitespaceTokenizer= WhitespaceTokenizer.INSTANCE; 
	      String[] tokens = whitespaceTokenizer.tokenize(content); 
	       
	      //Generating tags 
	      String[] tags = tagger.tag(tokens);
	      
	      //Instantiating the POSSample class 
	      POSSample sample = new POSSample(tokens, tags); 
	      
	      String ary [] = sample.toString().split(" ");
	      String nn ="";
	      for(int i=0; i<ary.length;i++)
	      {
	    	  String temp=ary[i];
	    	  System.out.println("before filtring: "+temp);
	    	  if("N".equalsIgnoreCase(""+temp.charAt(temp.length()-2)) || "D".equalsIgnoreCase(""+temp.charAt(temp.length()-1)))
	    	  {
	    		  System.out.println(temp);
	    		  nn += temp.split("_")[0]+"-";
	    	  }
	    	  
	    	 
	      }
	      
	      return nn;
	      
	}
 
}


/*
 * ACCT 	Accounting 	School of Accounting
ACTL 	
AERO 	
ANAT 	
ARCH 	
ARTS 	
ATSI 	
AUST 	
AVEN 	
AVIA 	
AVIF 	
AVIG 	
BABS 	
BEES 	
BEIL 	
BENV 	
BINF 	
BIOC 	
BIOM 	
BIOS 	
BIOT 	
BLDG 	
CEIC 	
CHEM 	
CHEN 	
CLIM 	
CODE 	
COMD 	
COMM 	
COMP 	
CONS 	
CRIM 	
CRTV 	
CVEN 	
DATA 	
DIPP 	
ECON 	
EDST 	
ELEC 	
ENGG 	
ENVP 	
ENVS 	
EXCH 	
FINS 	
FOOD 	
GBAT 	
GENC 	
GENE 	
GENL 	
GENM 	
GENS 	
GENT 	
GENY 	
GEOL 	
GEOS 	
GMAT 	
GSBE 	
GSOE 	
HESC 	
HUML 	
HUMS 	
IDES 	
IEST 	
INDC 	
INFS 	
INOV 	
INST 	
INTA 	
JAPN 	
JURD 	
KORE 	
LAND 	
LAWS 	
LING 	
MANF 	
MARK 	
MATH 	
MATS 	
MBAX 	
MDCN 	
MDIA 	
MECH 	
MFAC 	
MFIN 	
MGMT 	
MICR 	
MINE 	
MMAN 	
MNGT 	
MNNG 	
MODL 	
MSCI 	
MTRN 	
MUPS 	
MUSC 	
NANO 	
NAVL 	
NCHR 	
NEUR 	
OBST 	
OPTM 	
PATH 	
PHAR 	
PHCM 	
PHOP 
PHSL 	
PHTN 	
PHYS 	
PLAN 	
POLS 	
POLY 	
PSCY 	
PSYC 	
PTRL 	
REGZ 	
REST 	
RISK 	
SCIF 	
SENG 	
SERV 	
SLSP 	
SOCF 	
SOCW 	
SOLA 	
SOMS 	
SOSS 	
SPRC 	
SRAP 	
STAM 	
SURG 	
SUSD 	
SWCH 	
TABL 	
TELE 	
UDES 	
VISN 	
YMED 	

Paddington Campus 	

ADAD 	
SAED 	
SAHT 	
SART 	
SDES 	
SOMA 	

UNSW Canberra at ADFA 	

ZBUS 
ZEIT 	
ZGEN 	
ZHSS 	
ZINT 	
ZPEM 	
*/



/*String course_code = "ACTL 	AERO 	ANAT 	ARCH 	ARTS 	ATSI 	AUST 	AVEN 	AVIA 	AVIF"
    			+ " 	AVIG 	BABS 	BEES 	BEIL 	BENV 	BINF 	BIOC 	BIOM 	BIOS 	BIOT "
    			+ "	BLDG 	CEIC 	CHEM 	CHEN 	CLIM 	CODE 	COMD 	COMM 	COMP 	CONS "
    			+ "	CRIM 	CRTV 	CVEN 	DATA 	DIPP 	ECON 	EDST 	ELEC 	ENGG 	ENVP "
    			+ "	ENVS 	EXCH 	FINS 	FOOD 	GBAT 	GENC 	GENE 	GENL 	GENM 	GENS 	GENT "
    			+ "	GENY 	GEOL 	GEOS 	GMAT 	GSBE 	GSOE 	HESC 	HUML 	HUMS 	IDES 	IEST 	INDC "
    			+ "	INFS 	INOV 	INST 	INTA 	JAPN 	JURD 	KORE 	LAND 	LAWS 	LING 	MANF "
    			+ "	MARK 	MATH 	MATS 	MBAX 	MDCN 	MDIA 	MECH 	MFAC 	MFIN 	MGMT 	MICR 	"
    			+ "MINE 	MMAN 	MNGT 	MNNG 	MODL 	MSCI 	MTRN 	MUPS 	MUSC 	NANO 	NAVL "
    			+ "	NCHR 	NEUR 	OBST 	OPTM 	PATH 	PHAR 	PHCM 	PHOP PHSL 	PHTN 	PHYS 	PLAN "
    			+ "	POLS 	POLY 	PSCY 	PSYC 	PTRL 	REGZ 	REST 	RISK 	SCIF 	SENG 	SERV 	SLSP"
    			+ " 	SOCF 	SOCW 	SOLA 	SOMS 	SOSS 	SPRC 	SRAP 	STAM 	SURG 	SUSD 	SWCH "
    			+ "	TABL 	TELE 	UDES 	VISN 	YMED" ;*/