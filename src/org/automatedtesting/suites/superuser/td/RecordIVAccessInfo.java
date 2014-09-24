package org.automatedtesting.suites.superuser.td;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class RecordIVAccessInfo extends AutomatedTestingSuite {
	@Test
	public HashMap RunRecordIVAccessInfo() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of RecordIVAccessInfo() method");
			logger.info("**********Start open application************");
			//Login
			LoginLogout.login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//RecordIVAccessInfo Contents
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
		    driver.findElement(By.xpath("//span[contains(text(), 'IV Site')]/..")).click(); // Click IV Site tab
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Date Accessed')]/../../td[2]/table/tbody/tr/td[2]/div")).click(); // Click dropdown for date
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Today')]/..")).click(); // Click Today Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Device')]/../../td[2]/table/tbody/tr/td[2]/div")).click(); // Click dropdown for device
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Peripheral IV')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Gauge')]/../../td[2]/table/tbody/tr/td[2]/div")).click(); // Click dropdown for gauge
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), '22g')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Location')]/../../td[2]/table/tbody/tr/td[2]/div")).click(); // Click dropdown for location
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Left Dorsal Proximal Forearm')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click(); // Click Save Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'OK')]/..")).click(); // Click OK Button
		    r.delay(3000);		      
			
			//Logout
			logger.info("::End of RecordIVAccessInfo() method ::");
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
