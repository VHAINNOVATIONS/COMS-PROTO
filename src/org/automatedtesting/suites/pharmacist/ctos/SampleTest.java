package org.automatedtesting.suites.pharmacist.ctos;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class SampleTest extends AutomatedTestingSuite {
	
	@Test
	public HashMap RunSampleTest() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of SampleTest() method");
			logger.info("**********Start open application************");
			//Login
			LoginLogout.login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//RecordVitalSign Contents
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).clear();
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).sendKeys("F0400");
		    r.delay(1000);
		    driver.findElement(By.xpath("//button[@name='QueryCPRS4Patient']")).click();
		    r.delay(15000);
		    driver.findElement(By.xpath("//button[@name='PatientConfirm']")).click();
		    driver.manage().timeouts().implicitlyWait(45, TimeUnit.SECONDS);
		    r.delay(20000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Treatment Documentation')]/..")).click(); // Click Treatment Documentation tab
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'General Information')]/..")).click(); // Click General Information tab
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Consent Documentation on File')]/../../td[2]/table/tbody/tr/td[1]/table/tbody/tr/td[2]/input")).click(); // Click Consent Documentation Yes
		    r.delay(3000);		      
			
			//Logout
			logger.info("::End of SampleTest() method ::");
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
