package org.automatedtesting.controller;

import java.util.HashMap;
//import java.util.logging.Level;
import java.util.logging.LogManager;
import org.automatedtesting.suites.*;
import org.automatedtesting.suites.administrator.oem.*;
import org.automatedtesting.suites.administrator.ctos.*;
import org.automatedtesting.suites.administrator.td.*;
import org.automatedtesting.suites.administrator.fs.*;
import org.automatedtesting.suites.administrator.eots.*;
import org.automatedtesting.suites.administrator.misc.*;
import org.automatedtesting.utils.*;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.bridge.SLF4JBridgeHandler;

import ch.qos.logback.classic.Level;

public final class AdminTestSuites {
	private static Logger logger ;
	
	public static void main(String[] args) throws Exception {
		//Get the jvm heap size.
        long heapSize = Runtime.getRuntime().totalMemory();
         
        //Print the jvm heap size.
        //System.out.println("Heap Size = " + heapSize);
		AdminTestSuites mainClass = new AdminTestSuites();	
		// Optionally remove existing handlers attached to j.u.l root logger
		SLF4JBridgeHandler.removeHandlersForRootLogger();  // (since SLF4J 1.6.5)
		SLF4JBridgeHandler.install();
		LogManager.getLogManager().getLogger("").setLevel(java.util.logging.Level.FINEST);		
		
		logger = LoggerFactory.getLogger(mainClass.getClass());
		LogbackFileUtils.start(mainClass.getClass());
		
		RunIt();
		LogbackFileUtils.stop();
		System.exit(0);
	}
	
	public static void RunIt() throws Exception{
		logger.info("--------- COMS Admin Automation Test Suites ----------");
		//OEM Tests
		printResults(new PrintOrder().RunPrintOrder());
		Thread.sleep(3000);
		printResults(new FlowSheet().RunFlowSheet());
		Thread.sleep(3000);
		
		//CTOS Tests
		printResults(new ViewCancerStaging().RunViewCancerStaging());
		Thread.sleep(3000);
		
		//TD Tests
		printResults(new ReviewChemoBioTherapy().RunReviewChemoBioTherapy());
		Thread.sleep(3000);
		
		//Misc
		printResults(new ViewPrintTemp().RunViewPrintTemp());
		Thread.sleep(3000);
		printResults(new EditDiseaseStaging().RunEditDiseaseStaging());
		Thread.sleep(3000);
		printResults(new EditAmputationWeight().RunEditAmputationWeight());
		Thread.sleep(3000);
		printResults(new EditNeutropeniaEmesisRisk().RunEditAmputationWeight());
		Thread.sleep(3000);
	}
	public static void printResults(HashMap result){
		logger.info(result.get("testName") + "\t" + result.get("totalTime")  + "\t" + result.get("result"));
	}
}
