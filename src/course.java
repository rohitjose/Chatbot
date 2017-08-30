import java.util.ArrayList;

public class course 
{
	public String name;
	public int code;
	//public String teaching_period ;
	public char lvl;//P , U , R , M-> mix , a -> all
	public ArrayList<Teaching_info>  t ;
	
	public course()
	{
		name = "";
		code=-1;
		lvl='_';
		t= new ArrayList<Teaching_info>();
	}
}
