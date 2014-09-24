package org.automatedtesting.suites.provider.ctos;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.automatedtesting.suites.*;
import org.automatedtesting.template.*;
import org.automatedtesting.utils.LogbackFileUtils;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class CreateNewTemplate extends AutomatedTestingSuite {
	
	@Test
	public HashMap RunCreateNewTemplate() {
		
		try{
			strTime = System.currentTimeMillis();
			LogbackFileUtils.start(this.getClass());
			logger.info(":: In Start of CreateNewTemplate() method");
			logger.info("**********Start open application************");
			//Login
			LoginLogout.login("programmer");
			logger.info("::Logged in successful::");
			//r.delay(10000); 
			
			//CreateNewTemplate Contents
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).clear();
			driver.findElement(By.xpath("//input[@name='CPRS_QueryString']")).sendKeys("F0400");
		    r.delay(1000);
		    driver.findElement(By.xpath("//button[@name='QueryCPRS4Patient']")).click();
		    r.delay(15000);
		    driver.findElement(By.xpath("//button[@name='PatientConfirm']")).click();
		    driver.manage().timeouts().implicitlyWait(45, TimeUnit.SECONDS);
		    r.delay(20000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Template Authoring')]/..")).click(); // Click Template Authoring tab
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Create New Template')]/../input")).click(); // Click Create New Template Button
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'Select a type of cancer')]/../../td[2]/table/tbody/tr/td[2]/div")).click(); // Click dropdown for cancer
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Lung Cancer, Non-Small Cell')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='CourseNumMax']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='CourseNumMax']")).sendKeys("4");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='CycleLength']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), '3')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='CycleLengthUnits']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Weeks')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='EmotegenicLevel']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Medium')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='FebrileNeutropeniaRisk']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='FebrileNeutropeniaRisk']")).sendKeys("5");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='HydrationInstructions']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='HydrationInstructions']")).sendKeys("test");
		    r.delay(1000);
		    
		    // Pre-Drug Therapy Regimen
		    driver.findElement(By.xpath("//span[contains(text(), 'Pre Therapy')]/../../../../../..//span[contains(text(), 'Add Drug')]/..")).click();
		    //driver.findElement(By.xpath("//div[contains(@id, 'TemplateHydration')]//span[contains(text(), 'Add Drug')]/..")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'OutPatient')]/../input")).click(); 
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Drug']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'DEXAMETHASONE TAB')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Amt1']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Amt1']")).sendKeys("20");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Units1']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'mg')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Sequence']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), '1')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Infusion1']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Oral')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Day']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Day']")).sendKeys("4");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Instructions']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Instructions']")).sendKeys("take one every 5 hours");
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click();
		    r.delay(1000);
		    
		    // Drug Therapy Regimen
		    //driver.findElement(By.xpath("//span[contains(text(), 'Post Therapy')]/../../../../../..//span[contains(text(), 'Add Drug')]/..")).click();
		    driver.findElement(By.xpath("//div[contains(@id, 'TemplateDrugRegimen')]//span[contains(text(), 'Add Drug')]/..")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'InPatient')]/../input")).click(); 
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Drug']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'PACLITAXEL INJ,CONC')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Amt1']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Amt1']")).sendKeys("200");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Units1']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'mg/m2')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Sequence']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), '1')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Infusion1']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'IVPB')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Day']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Day']")).sendKeys("1");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='FluidType']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='FluidType']")).sendKeys("Normal Saline");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='FluidVol']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='FluidVol']")).sendKeys("500");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='FluidRate']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='FluidRate']")).sendKeys("167");
		    r.delay(1000);
		    /*driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'IVPB')]")).click();
		    r.delay(1000);*/
		    driver.findElement(By.xpath("//input[@name='Instructions']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Instructions']")).sendKeys("testing");
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click();
		    r.delay(1000);
		    
		    // Post-Drug Therapy Regimen
		    //driver.findElement(By.xpath("//div[contains(@id, 'TemplateHydration')]//span[contains(text(), 'Add Drug')]/..")).click();
		    driver.findElement(By.xpath("//span[contains(text(), 'Post Therapy')]/../../../../../..//span[contains(text(), 'Add Drug')]/..")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//label[contains(text(), 'OutPatient')]/../input")).click(); 
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Drug']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'COMPAZINE PROCHLORPERAZINE TAB')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Amt1']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Amt1']")).sendKeys("10");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Units1']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'mg')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Sequence']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), '1')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Infusion1']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'Oral')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Day']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Day']")).sendKeys("1");
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Instructions']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='Instructions']")).sendKeys("as appropriate");
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click();
		    r.delay(1000);
		    
		    //Add Reference
		    driver.findElement(By.xpath("//span[contains(text(), 'Add Reference')]/..")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='SelReference']/../../td[2]/div")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//div[@class='x-boundlist-list-ct']/ul/li[contains(text(), 'No Clinical Reference - COMS Testing')]")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save')]/..")).click();
		    r.delay(1000);
		    
		    //Save template
		    driver.findElement(By.xpath("//input[@name='TemplateAlias']")).clear();
		    r.delay(1000);
		    driver.findElement(By.xpath("//input[@name='TemplateAlias']")).sendKeys("Patient 400 template");
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'Save Template')]/..")).click();
		    r.delay(1000);
		    driver.findElement(By.xpath("//span[contains(text(), 'OK')]/..")).click();
		    r.delay(3000);		      
			
			//Logout
			logger.info("::End of CreateNewTemplate() method ::");
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
