package org.automatedtesting.controller;

import java.util.HashMap;
//import java.util.logging.Level;
import java.util.logging.LogManager;
import org.automatedtesting.suites.*;
import org.automatedtesting.suites.pharmacist.oem.*;
import org.automatedtesting.suites.pharmacist.ctos.*;
import org.automatedtesting.suites.pharmacist.td.*;
import org.automatedtesting.suites.pharmacist.fs.*;
import org.automatedtesting.suites.pharmacist.eots.*;
import org.automatedtesting.suites.pharmacist.misc.*;
import org.automatedtesting.utils.*;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.bridge.SLF4JBridgeHandler;

import ch.qos.logback.classic.Level;

public final class PharmacistTestSuites {
	private static Logger logger ;
	
	public static void main(String[] args) throws Exception {
		//Get the jvm heap size.
        long heapSize = Runtime.getRuntime().totalMemory();
         
        //Print the jvm heap size.
        //System.out.println("Heap Size = " + heapSize);
		PharmacistTestSuites mainClass = new PharmacistTestSuites();	
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
		logger.info("--------- COMS Pharmacist Automation Test Suites ----------");
		//OEM Tests
		
		//CTOS Tests
		
		
		//TD Tests
				
		//Misc
		
	}
	public static void printResults(HashMap result){
		logger.info(result.get("testName") + "\t" + result.get("totalTime")  + "\t" + result.get("result"));
	}
}
