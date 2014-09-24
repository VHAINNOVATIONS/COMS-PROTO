package org.automatedtesting.suites.superuser.td;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class RecordVitalSign extends AutomatedTestingSuite {
	
	@Test
	public HashMap RunRecordVitalSign() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of RecordVitalSign() method");
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
		    driver.findElement(By.xpath("//input[@name='ndVitalsTempF']")).clear(); // Clear temp
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsTempF']")).sendKeys("98.2"); // Record temp
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Taken')]/../../td[2]/table/tbody/tr/td[2]/div")).click(); // Click dropdown for Taken
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Oral')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsHeightIN']")).clear(); // Clear height
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsHeightIN']")).sendKeys("70"); // Record height
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsWeightP']")).clear(); // Clear weight
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsWeightP']")).sendKeys("176"); // Record weight
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsPulse']")).clear(); // Clear pulse
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsPulse']")).sendKeys("74"); // Record pulse
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsPulse']")).clear(); // Clear pulse
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsPulse']")).sendKeys("74"); // Record pulse
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsResp']")).clear(); // Clear respiration
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsResp']")).sendKeys("19"); // Record respiration
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsPain']")).clear(); // Clear pain
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsPain']")).sendKeys("3"); // Record pain
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsSystolic']")).clear(); // Clear systolic
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsSystolic']")).sendKeys("118"); // Record systolic
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsDiastolic']")).clear(); // Clear diastolic
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsDiastolic']")).sendKeys("82"); // Record diastolic
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsO2Level']")).clear(); // Clear O2 level
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='ndVitalsO2Level']")).sendKeys("74"); // Record O2 level
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click(); // Click Save Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'OK')]/..")).click(); // Click OK Button
		    r.delay(3000);		      
			
			//Logout
			logger.info("::End of RecordVitalSign() method ::");
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
