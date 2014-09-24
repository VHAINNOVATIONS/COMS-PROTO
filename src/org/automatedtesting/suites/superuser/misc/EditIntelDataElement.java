package org.automatedtesting.suites.superuser.misc;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class EditIntelDataElement extends AutomatedTestingSuite {
	
	@Test
	public HashMap RunEditIntelDataElement() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of EditIntelDataElement() method");
			logger.info("**********Start open application************");
			//Login
			LoginLogout.login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//EditIntelDataElement Contents
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).clear();
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).sendKeys("F0400");
		    r.delay(1000);
		    driver.findElement(By.xpath("//button[@name='QueryCPRS4Patient']")).click();
		    r.delay(15000);
		    driver.findElement(By.xpath("//button[@name='PatientConfirm']")).click();
		    driver.manage().timeouts().implicitlyWait(45, TimeUnit.SECONDS);
		    r.delay(20000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Site Configuration')]/..")).click(); // Click Site Configuration tab
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'IDE')]/..")).click(); // Click IDE tab
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Select Data Element to configure')]/../../td[2]/table/tbody/tr/td[2]/div")).click(); // Click dropdown for data element
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Height')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Min']")).clear(); // Clear min
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Min']")).sendKeys("91"); // Record min
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click(); // Click Save Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'OK')]/..")).click(); // Click OK Button
		    r.delay(3000);		      
			
			//Logout
			logger.info("::End of EditIntelDataElement() method ::");
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
