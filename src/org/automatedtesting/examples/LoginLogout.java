package org.automatedtesting.examples;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Properties;

import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;


public class LoginLogout extends AutomatedTestingSuite {
	//private static StringBuffer verificationErrors = new StringBuffer();
	//public Properties propertyFile = getTestProperties("vet1");
	LoginTemplate loginTemp = new LoginTemplate(propertyFile);
	
	@Test
	public HashMap LoginLogout() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of PrintOrder() method");
			//r.delay(5000);
			logger.info("**********Start open application************");
			driver.get(getProperties().getProperty("URL"));
			logger.info("::getting the URL from the properties file :: The URL is ::"+getProperties().getProperty("URL"));
			r.delay(15000);
			//Login
			login(loginTemp);
			logger.info("::Logged in successful::");
			r.delay(10000); 
			
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
	
	public static void login(LoginTemplate loginTemp){
		//Verification for login page
		verify("Test -- Verify the Member Login header text",By.xpath("//div[@class='bea-portal-login-window-content']/div/h2"),loginTemp.getLoginHeaderLbl());
		
	
		String username = loginTemp.getLoginUserName().trim();
		String password = loginTemp.getLoginPassword().trim();		
		driver.findElement(By.name("loginPortlet_homepage{actionForm.userName}")).clear();
	    driver.findElement(By.name("loginPortlet_homepage{actionForm.userName}")).sendKeys(username);
	    driver.findElement(By.name("loginPortlet_homepage{actionForm.password}")).clear();
	    driver.findElement(By.name("loginPortlet_homepage{actionForm.password}")).sendKeys(password);
	    driver.findElement(By.cssSelector("input.mhv-input-button")).click();
	}
	
	public static void logout(){
		//Logout and verify if test pass or failed
		//driver.switchTo().defaultContent();
		driver.findElement(By.linkText("Logout")).click();
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
