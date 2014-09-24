package org.automatedtesting.utils;

import org.slf4j.LoggerFactory;


import ch.qos.logback.classic.*;
import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.FileAppender;
import ch.qos.logback.core.util.StatusPrinter;


import java.text.SimpleDateFormat;
import java.util.*;

import org.automatedtesting.suites.AutomatedTestingSuite;
import org.openqa.selenium.remote.RemoteWebDriver;


public class LogbackFileUtils {
    private static FileAppender<ILoggingEvent> fileAppender;
    private static FileAppender<ILoggingEvent> fileAppenderSelenium;
    private static boolean initialized = false;
    
    public static void init(Class classname) {        	
    	LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();            
    	Logger myLogger = loggerContext.getLogger(classname);

    	PatternLayoutEncoder encoder = new PatternLayoutEncoder();
    	encoder.setContext(loggerContext);
    	encoder.setPattern("%d{HH:mm:ss.SSS} [%-5level] %msg %n");
    	encoder.start();

    	fileAppender = new FileAppender<ILoggingEvent>();
    	fileAppender.setContext(loggerContext);
    	fileAppender.setName(classname.getSimpleName());
    	fileAppender.setAppend(false);
    	fileAppender.setEncoder(encoder);      
    	myLogger.addAppender(fileAppender);
    	myLogger.setLevel(Level.DEBUG);

    	//Selenium file appender
    	if (isAutomatedTestingSuiteClass(classname)) {
    		Logger myLoggerSelenium = loggerContext.getLogger(RemoteWebDriver.class);
    		fileAppenderSelenium = new FileAppender<ILoggingEvent>();
    		fileAppenderSelenium.setContext(loggerContext);
    		fileAppenderSelenium.setName("Selenium_RemoteWebDriver"); 
    		fileAppenderSelenium.setAppend(false);
    		fileAppenderSelenium.setEncoder(encoder);
    		myLoggerSelenium.addAppender(fileAppenderSelenium);
    		myLoggerSelenium.setLevel(Level.DEBUG);

    		initialized = true;
    	}
    	else
    		initialized = false;
    	StatusPrinter.print(loggerContext);
    }
    
    public static void start(Class classname) {
        init(classname);
        stop();
        String fileSetter = "logs/" + classname.getSimpleName() + new SimpleDateFormat("yyyy-MM-dd--HH_mm_ss").format(new Date()) + ".log";
        fileAppender.setFile(fileSetter);
        fileAppender.start();
        if(initialized){
        	fileAppenderSelenium.setFile(fileSetter);
        	fileAppenderSelenium.start();
        }
        
    }
    
    public static void stop() {
        if (fileAppender.isStarted())
            fileAppender.stop();
        if (initialized && fileAppenderSelenium.isStarted())
            fileAppenderSelenium.stop();        
    }
    
    public static boolean isAutomatedTestingSuiteClass(Class cls){
        //need to check that cls is a class which extends AutomatedTestingSuite
        return AutomatedTestingSuite.class.isAssignableFrom(cls);
   }
}
