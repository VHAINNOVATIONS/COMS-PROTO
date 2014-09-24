package org.automatedtesting.suites.administrator.misc;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class EditAmputationWeight extends AutomatedTestingSuite {
	
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
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).clear();
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).sendKeys("F0400");
		    r.delay(1000);
		    driver.findElement(By.xpath("//button[@name='QueryCPRS4Patient']")).click();
		    r.delay(15000);
		    driver.findElement(By.xpath("//button[@name='PatientConfirm']")).click();
		    r.delay(20000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Patient Information')]/..")).click(); // Click patient information
		    r.delay(1000);
		    driver.findElement(By.xpath("(//button[@name='AddEditAmputation']")).click(); // Click Add/Edit amputee
		    r.delay(2000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Upper Left Arm')]/../input")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Left Thigh')]/../input")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Upper Right Arm')]/../input")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Right Thigh')]/../input")).click();
		    r.delay(1000);		 
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click(); // Click Save Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'OK')]/..")).click(); // Click OK Button
		    r.delay(3000);		   
		    driver.findElement(By.xpath("(//button[@name='AddEditBSA']")).click(); // Click Add/Edit BSA
		    r.delay(1000);		    
		    driver.findElement(By.xpath("//label[contains(text(), 'Weight to use')]/../../table/tbody/tr/td[2]/div")).click(); // Click dropdown for weight
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Actual Weight')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'BSA Formula')]/../../table/tbody/tr/td[2]/div")).click(); // Click dropdown for BSA
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Boyd')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click(); // Click Save Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'OK')]/..")).click(); // Click OK Button
		    //logger.info("::Order Entry Management Button Details --  " + e.getTagName() + " " + e.getAttribute("id") + " " + e.toString()+ "::");
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
