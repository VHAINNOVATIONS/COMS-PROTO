package org.automatedtesting.suites.nurse.td;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class ViewAndPrintEducation extends AutomatedTestingSuite {

	@Test
	public HashMap RunViewAndPrintEducation() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of ViewAndPrintEducation() method");
			logger.info("**********Start open application************");
			//Login
			LoginLogout.login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//ViewAndPrintEducation Contents
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
		    driver.findElement(By.xpath("//span[contains(text(), 'Discharge Instructions')]/..")).click(); // Click Discharge Instructions tab
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Patient Education')]/../../td[2]/table/tbody/tr/td[1]/table/tbody/tr/td[2]/input")).click(); // Click Patient Education Yes
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Patient')]/../../td[2]/input")).click(); // Click patient checkbox
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Already knows well')]/../../td[2]/input")).click(); // Click already knows well radiobutton
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'None')]/../../td[2]/input")).click(); // Click None checkbox
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Written')]/../../td[2]/input")).click(); // Click Written checkbox
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Verbal')]/../../td[2]/input")).click(); // Click Verbal checkbox
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Group')]/../../td[2]/input")).click(); // Click Group checkbox
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Telephone')]/../../td[2]/input")).click(); // Click Telephone checkbox
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Patient was given Chemotherapy discharge instructions')]/../../td[2]/table/tbody/tr/td[1]/table/tbody/tr/td[2]/input")).click(); // Click Chemo discharge instructions
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Verbalizes understanding')]/../../td[2]/input")).click(); // Click verbalizes understanding checkbox
		    r.delay(1000);
		    driver.findElement(By.xpath("//textarea[@name='PE_AdditionalComments']")).clear();
		    r.delay(15000);
		    driver.findElement(By.xpath("//textarea[@name='PE_AdditionalComments']")).sendKeys("None");
		    r.delay(15000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Followup Needed')]/../../td[2]/table/tbody/tr/td[2]/table/tbody/tr/td[2]/input")).click(); // Click Chemo discharge instructions
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click(); // Click Save Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'OK')]/..")).click(); // Click OK Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Print Discharge Instructions')]/..")).click(); // Click Print Discharge Instructions
		    r.delay(3000);		      
			
			//Logout
			logger.info("::End of ViewAndPrintEducation() method ::");
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
