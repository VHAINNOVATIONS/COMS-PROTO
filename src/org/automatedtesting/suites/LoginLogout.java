package org.automatedtesting.suites;

import static org.junit.Assert.*;

import org.automatedtesting.utils.EExecutor;

import java.awt.event.KeyEvent;
import java.util.HashMap;
import java.util.Properties;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;

import org.automatedtesting.template.*;
import org.automatedtesting.utils.Keyboard;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;


public class LoginLogout extends AutomatedTestingSuite {
	//private static StringBuffer verificationErrors = new StringBuffer();
		
	@Test
	public HashMap LoginLogout() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of PrintOrder() method");
			//r.delay(5000);
			logger.info("**********Start open application************");
			//driver.get(getProperties().getProperty("URL"));
			//logger.info("::getting the URL from the properties file :: The URL is ::"+getProperties().getProperty("URL"));
			//r.delay(15000);
			//Login
			login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//Logout
			logger.info("::End of PrintOrder() method ::");
		    logout();		    
			LogbackFileUtils.stop();
			
		    return returnObj;
		}catch(Exception e){
			logger.error("Test Failure: " + e.toString());
			closeDriver();
			endTime = System.currentTimeMillis();
			buildTestStatusObj(true);
			LogbackFileUtils.stop();
			return returnObj;	
		}		
	}
	
	public static void login(String accountTypeSelection) throws Exception{
		//Verification for login page
		final LoginTemplate loginTemp = new LoginTemplate(props);
	
		String username = loginTemp.getLoginUserName().trim();
		String password = loginTemp.getLoginPassword().trim();
		String accessCode = loginTemp.getAccountList().get(accountTypeSelection).get(0).trim();
		String verifyCode = loginTemp.getAccountList().get(accountTypeSelection).get(1).trim();
		EExecutor ieExecutor = new EExecutor();
		Future<WebDriver> futureDriver = (Future<WebDriver>) ieExecutor.executeMethod(new Callable<WebDriver>(){
					@Override
		           public WebDriver call() {
		               System.out.println("Starting click thread...");
		               //element.click();
		               driver.get(loginTemp.getURL());
		                 return driver;
		           }
		        });
		//driver.get(loginTemp.getURL());
		logger.info("::getting the URL from the properties file :: The URL is ::"+loginTemp.getURL());
		r.delay(3000); 
		Keyboard keyboard = new Keyboard();
        keyboard.type(username);
        logger.info("::Login Username -- " + username);
        r.delay(1000);
        keyboard.type('\t');
        keyboard.type(password);
        logger.info("::Login Password -- " + password);
        r.delay(1000);
        keyboard.type('\t');
        keyboard.type('\n');
        
        while (!futureDriver.isDone()){r.delay(1000);}
        driver = futureDriver.get();
        futureDriver.cancel(true);
        logger.info("::new driver -- " + driver.toString()); 
        r.delay(5000);
        driver.findElement(By.name("AccessCode")).clear();
	    driver.findElement(By.name("AccessCode")).sendKeys(accessCode);
	    driver.findElement(By.name("VerifyCode")).clear();
	    driver.findElement(By.name("VerifyCode")).sendKeys(verifyCode);
	    driver.findElement(By.cssSelector("input[type=\"submit\"]")).click();
	    r.delay(12000);
	    
	    boolean pageLoadSuccess = verify("Test -- Verify Logged into COMS",By.xpath("//h1[contains(text(),'Chemotherapy Order Management System')]"), "Chemotherapy Order Management System");
	    while (!pageLoadSuccess){
	    	//check page for text...if text exists change flag to true and proceed else false and perform refresh and repeat loop
	    	driver.navigate().refresh();
	    	Alert alert = driver.switchTo().alert();
	    	alert.getText();
	    	alert.accept();
	    	r.delay(2000);
	    	//keyboard.type('\n');
	    	r.delay(15000);
	    	pageLoadSuccess = verify("Test -- Verify Logged into COMS Again!",By.xpath("//h1[contains(text(),'Chemotherapy Order Management System')]"), "Chemotherapy Order Management System");
	    }
	    //r.delay(20000);
	    logger.info("::Logged in successful::");
	}
	
	public static void logout(){
		//Logout and verify if test pass or failed
		//driver.switchTo().defaultContent();
		//driver.findElement(By.linkText("Logout")).click();
		//driver.findElement(By.xpath("//input[@type='button'][contains(text(),'Logout')]")).click();
		driver.findElement(By.xpath("//*[@id='EndControls']/ul/li[3]/button")).click();
		r.delay(4000);
		driver.findElement(By.xpath("//*[@id='button-1006-btnEl']")).click();
		logger.info("::The Logout button was clicked::");	    
		closeDriver();
		
		//Build returnObject for Test
		endTime = System.currentTimeMillis();
		buildTestStatusObj(false);
	}
	
	public static WebElement findLogout(){
		return driver.findElement(By.linkText("Logout"));
		
	}
	
}//end of class.
