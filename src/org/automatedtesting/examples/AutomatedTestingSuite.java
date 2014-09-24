package org.automatedtesting.examples;

import static org.junit.Assert.assertTrue;

import java.awt.AWTException;
import java.awt.Robot;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;
import java.util.logging.Level;

import javax.mail.Flags;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.search.SubjectTerm;

import org.automatedtesting.utils.*;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.LoggingPreferences;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.sikuli.script.Screen;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AutomatedTestingSuite {

	//should all be thread safe since there won't be multiple threads touching the same TestSuite class
	protected static Logger logger; //logger called by the tests manually
	protected static WebDriver driver; //TODO: do we want a new instance of this each time, or should this be singleton?
	protected static Screen s;
	protected static Robot r;
	protected static Properties propertyFile;
	protected static Properties props;
	protected static boolean fireFoxDriverSelected;
	protected static StringBuffer verificationErrors;
	protected static HashMap returnObj;
	protected static long strTime;
	protected static long endTime;
	
	
/*	static {
		props = new Properties();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();           
		InputStream stream = loader.getResourceAsStream("suite.properties");
		try {
			props.load(stream);
			stream.close();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		
}*/
	
	public AutomatedTestingSuite() {
		
		// Add to the desired logger		
		returnObj = new HashMap();
		returnObj.put("testName", this.getClass().getSimpleName());		
		
		//propertyFile = getTestProperties(this.getClass().getSimpleName());
		logger = LoggerFactory.getLogger(this.getClass());
		verificationErrors = new StringBuffer();
		
		fireFoxDriverSelected = Boolean.parseBoolean(getProperties().getProperty("FireFoxDriver"));
		if (fireFoxDriverSelected)
			setupFirefoxDriver();
		else
			setupIEDriver();
		
//		FileOutputStream outfos = null;
//		try {
//			outfos = new FileOutputStream("C:/selenium/SeleniumLog/testOutput.html");
//		} catch (FileNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} //create //new output stream
//
//		PrintStream newoutps = new PrintStream(outfos); //create new output //stream
//
//		System.setOut(newoutps); //set the output stream
	}
	
	/**
	 * This is ran before each test suite. It launches a new firefox browser 
	 * and checks to make sure the server is running.
	 */
//	@BeforeClass
//	public static void checkServer() { //TODO: re-add the server check?
//		
//		WebDriver checkServerDriver = new FirefoxDriver();
//
//		//if this throws an exception, it should prevent the test from running.
//		checkServerDriver.get("http://158.147.211.123:8080/manager/status");
//		checkServerDriver.findElement(By.cssSelector("img[alt=\"The Tomcat Servlet/JSP Container\"]"));
//		checkServerDriver.get("http://158.147.211.125/EmrSvc.asmx");
//		checkServerDriver.findElement(By.linkText("addDataSource"));
//
//	}
	
	
	public static void setupFirefoxDriver() {
		
		//TODO: see if we can get selenium to record all of its events (ie: click, wait, etc) by default
		
		FirefoxProfile profile = new FirefoxProfile();
		profile.setAcceptUntrustedCertificates(true);
		profile.setAssumeUntrustedCertificateIssuer(false);
		//Setup selenium logger
		DesiredCapabilities caps = DesiredCapabilities.firefox(); 
		LoggingPreferences logs = new LoggingPreferences(); 
		logs.enable(LogType.DRIVER, Level.ALL); 
		caps.setCapability(CapabilityType.LOGGING_PREFS, logs);
		caps.setCapability(FirefoxDriver.PROFILE, profile);
		caps.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);
		driver = new FirefoxDriver(caps);
		driver.manage().window().maximize();		 
		
		s = new Screen();
		try {
			r = new Robot();
		} catch (AWTException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	@AfterClass
	public static void closeDriver() {
		driver.quit();
	}
	
	
	public static void setupIEDriver() {
		
		//TODO: see if we can get selenium to record all of its events (ie: click, wait, etc) by default
		
		File file = new File("C:/SeliniumDrivers/IEDriverServer.exe");
		System.setProperty("webdriver.ie.driver", file.getAbsolutePath());
		
		LoggingPreferences logs = new LoggingPreferences(); 
		logs.enable(LogType.DRIVER, Level.ALL); 
		DesiredCapabilities caps = DesiredCapabilities.internetExplorer(); 
		caps.setCapability(InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS, false);		
		caps.setCapability(CapabilityType.LOGGING_PREFS, logs); 		
		driver	=	new InternetExplorerDriver(caps);
				
		try {
			s = new Screen();
			r = new Robot();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//utility methods
	public  static void refreshDriver() {		
		try {
			driver.navigate().refresh();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.info(e.getLocalizedMessage());
		}
	}

	//TODO: shouldn't be loading properties in each time. Should make a properties singleton
	public Properties getProperties() {
		Properties prop = new Properties();
		InputStream in = getClass().getResourceAsStream("suite.properties");
		try {
			prop.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		props=prop;
		return prop;
	}
	//TODO: shouldn't be loading properties in each time. Should make a properties singleton
	public Properties getTestProperties(String propertyName) {
		Properties prop = new Properties();
		InputStream in = getClass().getResourceAsStream(propertyName + ".properties");
		try {
			prop.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		propertyFile=prop;
		return prop;
	}
	public static void verify(String testName, By actualStatement, String expectedValue){
		String actual=null;
		String expected="";
		List<WebElement> foundElements = null;
		if(expectedValue !=null && !expectedValue.isEmpty()){
			try{
				expected = expectedValue.trim().replaceAll( "\\$", "" );
				foundElements = driver.findElements(actualStatement);
				if(foundElements.size() == 1){
					actual = foundElements.get(0).getText().trim().replaceAll( "\\$", "" );
					if(testName.contains("cell phone"))
						actual = actual.replaceAll("\\D+","").substring(Math.max(actual.replaceAll("\\D+","").length() - 10, 0));
					else if(testName.contains("Detail Received Date") || testName.contains("Detail Type") || testName.contains("Detail Completed Date") || testName.contains("Detail Estimate Completion Date")){
						String containsVariable = null;
						if(testName.contains("Received Date"))
							containsVariable = "Received:";
						else if(testName.contains("Type"))
							containsVariable = "Type:";
						else if(testName.contains("Completed Date"))
							containsVariable = "Completed:";
						else if(testName.contains("Estimate Completion Date"))
							containsVariable = "Completion Date:";
						String[] actuals = actual.split("\\n");
						String tempActual = null;
						int counter = 0;
						while(tempActual == null && counter < actuals.length){
							if(actuals[counter].contains(containsVariable))
								tempActual = actuals[counter].split(":")[1];
							else
								counter++;
						}
						actual = tempActual;
					}
					assertTrue(actual.matches("^[\\s\\S]*" + expected+ "[\\s\\S]*$"));
				}
				else if (foundElements.size() > 1){
						String[] actuals = new String[foundElements.size()];
						for(int i =0; i < foundElements.size(); i++){
							actuals[i] = foundElements.get(i).getText().trim();
							if(actuals[i].contains(expected))
								assertTrue(actuals[i].matches("^[\\s\\S]*" + expected + "[\\s\\S]*$"));
						}
				}
				else{
					actual = null;
					throw new Exception();
				}
				logger.info(testName + "- expected: " + expected + " -- PASS");
			}catch(Throwable e) {
				logger.info(testName + "- expected: " + expected + " -- FAIL");
				//logger.info(e.toString());
			     //fail();
				verificationErrors.append("\n\n" + testName + "- error: " + e.getLocalizedMessage()+ "\nexpected: " + expected + " - actual: " + actual);
			}
			r.delay(1000);
		}		
	}
	public static HashMap buildTestStatusObj(boolean inException){
		returnObj.put("totalTime", ((endTime-strTime)/1000) + " secs");
		logger.info("Test execution time: " + returnObj.get("totalTime"));
		boolean verificationPass= verificationStatus();
		if(!inException && verificationPass)
			returnObj.put("result", "PASS");
		else
			returnObj.put("result", "FAIL");
		return returnObj;
	}
	public static boolean verificationStatus(){
		//Output verification Errors
	    String verificationErrorString = verificationErrors.toString();
	    if (!"".equals(verificationErrorString)) {
			logger.info("\n\n-----------Verification Errors-----------"+ verificationErrorString);
			return false;
		}
	    return true;
	}
	
	public static String getSecureCodeFromGmail(){
		String securityCode	=	null;
		try{
	        	Properties props = System.getProperties();
	        	props.setProperty("mail.store.protocol", "imaps");

	            Session session = Session.getDefaultInstance(props, null);
	            Store store = session.getStore("imaps");
	            store.connect("imap.gmail.com", propertyFile.getProperty("loginGMailName").trim(),propertyFile.getProperty("loginGMailPassword").trim());

	            Folder folder = store.getFolder("INBOX");
	            folder.open(Folder.READ_WRITE);

	           // System.out.println("Total Message:" + folder.getMessageCount());
	           // System.out.println("Unread Message:"+ folder.getUnreadMessageCount());
	            
	            Message[] messages = null;
	            boolean isMailFound = false;
	            Message mailFromGod= null;
	            
	            boolean isFinished = false;
	            int repetitions= 120;
	            while(!isFinished && repetitions > 0){
	            	//Search for mail from God
	            	for (int i = 0; i < 5; i++) {
	            		messages = folder.search(new SubjectTerm(
	                        "SMS from "),
	                        folder.getMessages());
	            		//Wait for 10 seconds
	            		if (messages.length == 0) {
	            			Thread.sleep(10000);
	            		}
	            	}	            
	            
	            	//Search for unread mail from God
		            //This is to avoid using the mail for which 
		            //Registration is already done
		            for (Message mail : messages) {
		                if (!mail.isSet(Flags.Flag.SEEN)) {
		                    mailFromGod = mail;
//		                    System.out.println("Message Count is: "+ mailFromGod.getMessageNumber());
		                    isMailFound = true;
		                    isFinished = true;
		                    break;
		                }
		            }
		            
		            if (--repetitions < 1)
		            	break;
		            else
		            	Thread.sleep(2000);
		            
	            }
	            

	            //Test fails if no unread mail was found from God
	            if (!isMailFound) {
	                throw new Exception(
	                        "Could not find new mail from God :-(");
	            
	            //Read the content of mail and launch registration URL                
	            } else {
	                String line;
	                StringBuffer buffer = new StringBuffer();
	                BufferedReader reader = new BufferedReader(
	                        new InputStreamReader(mailFromGod
	                                .getInputStream()));
	                while ((line = reader.readLine()) != null) {
	                    buffer.append(line);
	                }
	                //System.out.println(buffer.toString());

	                //Your logic to split the message and get the Registration URL goes here
//	                String registrationURL = buffer.toString().split("https://158.147.211.124/<wbr>JavaBridge/mail/src/login.php")[0].split("href=")[1];
	                securityCode	=	buffer.toString().substring(new String("Your Symantec VIP security code is ").lastIndexOf(" "),buffer.toString().indexOf("--"));
	                System.out.println("Found Security code after #of attempts: "+repetitions);
	                System.out.println("Security codeL--->"+securityCode);                            
	            }
	    
		}catch(Exception e){
			e.printStackTrace();
		}
		return securityCode.trim();
	}
}
