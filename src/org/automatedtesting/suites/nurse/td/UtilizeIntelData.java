package org.automatedtesting.suites.nurse.td;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class UtilizeIntelData extends AutomatedTestingSuite {
	
	@Test
	public HashMap RunUtilizeIntelData() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of UtilizeIntelData() method");
			logger.info("**********Start open application************");
			//Login
			LoginLogout.login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//UtilizeIntelData Contents
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).clear();
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).sendKeys("F0400");
		    r.delay(1000);
		    driver.findElement(By.xpath("//button[@name='QueryCPRS4Patient']")).click();
		    r.delay(15000);
		    driver.findElement(By.xpath("//button[@name='PatientConfirm']")).click();
		    r.delay(20000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Treatment Documentation')]/..")).click(); // Click Treatment Documentation tab
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'General Information')]/..")).click(); // Click General Information tab
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsTempF']")).clear(); // Clear temp
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsTempF']")).sendKeys("300"); // send incorrect temp
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsTempF']")).clear(); // Clear temp
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsTempF']")).sendKeys("92"); // send correct temp
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsHeightIN']")).clear(); // Clear height
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsHeightIN']")).sendKeys("72"); // send correct height
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click(); // Click Save Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'OK')]/..")).click(); // Click OK Button
		    r.delay(3000);		      
			
			//Logout
			logger.info("::End of UtilizeIntelData() method ::");
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
