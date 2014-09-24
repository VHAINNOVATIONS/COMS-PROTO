package org.automatedtesting.suites.administrator.misc;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class EditDiseaseStaging extends AutomatedTestingSuite {
	
	@Test
	public HashMap RunEditDiseaseStaging() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of EditDiseaseStaging() method");
			logger.info("**********Start open application************");
			//Login
			LoginLogout.login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//EditDiseaseStaging Contents
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).clear();
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).sendKeys("F0400");
		    r.delay(1000);
		    driver.findElement(By.xpath("//button[@name='QueryCPRS4Patient']")).click();
		    r.delay(15000);
		    driver.findElement(By.xpath("//button[@name='PatientConfirm']")).click();
		    driver.manage().timeouts().implicitlyWait(45, TimeUnit.SECONDS);
		    r.delay(20000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Site Configuration')]/..")).click(); // Click patient information
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Template Management')]/..")).click(); // Click Template Management
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Disease Staging')]/..")).click(); // Click Disease Staging
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Select a type of cancer')]/../../td[2]/table/tbody/tr/td[2]/div")).click(); // Click dropdown for weight
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Actual Weight')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Stage']")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Stage']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Stage']")).sendKeys("Stage Z");
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click(); // Click Save Button
		    r.delay(3000);		      
			
			//Logout
			logger.info("::End of EditDiseaseStaging() method ::");
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
