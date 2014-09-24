package org.automatedtesting.suites.administrator.ctos;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class ViewCancerStaging extends AutomatedTestingSuite {
		
	@Test
	public HashMap RunViewCancerStaging() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of ViewCancerStaging() method");
			logger.info("**********Start open application************");
			//Login
			LoginLogout.login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//ViewCancerStaging Contents
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).clear();
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).sendKeys("F0400");
		    r.delay(1000);
		    driver.findElement(By.xpath("//button[@name='QueryCPRS4Patient']")).click();
		    r.delay(15000);
		    driver.findElement(By.xpath("//button[@name='PatientConfirm']")).click();
		    r.delay(20000);
		    driver.findElement(By.xpath("//button[@type='button']/span[contains(text(), 'Chemotherapy Template Order Source')]/..")).click();
		    //logger.info("::Element Details --  " + e.getTagName() + " " + e.getAttribute("id") + " " + e.toString()+ "::");
		    r.delay(5000);
		    
		    driver.findElement(By.xpath("//label[contains(text(), 'Select an existing standard template')]/../input")).click();
		    driver.findElement(By.xpath("//table[contains(@id,'selTemplateType')]/tbody/tr/td[2]/div[@role='button']")).click(); //Select dropdown for type
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'My Template')]")).click(); //Select My template
		    r.delay(2000); 
		    driver.findElement(By.xpath("//table[contains(@id,'selDisease')]/tbody/tr/td[2]/div[@role='button']")).click(); // Select cancer dropdown
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Lung Cancer, Non-Small Cell')]")).click(); // Select lung cancer non small cell
		    r.delay(3000);
		    driver.findElement(By.xpath("//table[contains(@id,'selDiseaseStage')]/tbody/tr/td[2]/div[@role='button']")).click(); // Select cancer stage dropdown
		    r.delay(3000);		    
			
			//Logout
			logger.info("::End of ViewCancerStaging() method ::");
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
