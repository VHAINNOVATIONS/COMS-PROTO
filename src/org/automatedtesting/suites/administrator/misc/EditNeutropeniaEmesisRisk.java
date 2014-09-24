package org.automatedtesting.suites.administrator.misc;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class EditNeutropeniaEmesisRisk extends AutomatedTestingSuite {
		
	@Test
	public HashMap RunEditAmputationWeight() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of EditAmputationWeight() method");
			logger.info("**********Start open application************");
			//Login
			LoginLogout.login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//EditAmputationWeight Contents			
			driver.findElement(By.xpath("//span[contains(text(), 'Site Configuration')]/..")).click(); // Click patient information
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Template Management')]/..")).click(); // Click Template Management
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Neutropenia / Emesis Risks')]/..")).click(); // Click Neutorpenia/Emesis Risk
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[contains(text(), 'Emesis-1')]/..")).click(); //Click on Emesis Label
		    r.delay(1000);
		    driver.findElement(By.xpath("//iframe")).click(); //Click iFrame textarea
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click(); // Click Save Button		   
		    r.delay(3000);		      
			
			//Logout
			logger.info("::End of EditAmputationWeight() method ::");
			LoginLogout.logout();		    
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
	
}//end of class.
