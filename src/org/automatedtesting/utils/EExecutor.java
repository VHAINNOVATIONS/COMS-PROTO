package org.automatedtesting.utils;

import java.util.concurrent.*;

public class EExecutor {
	 private  ExecutorService executor;
	 
	 public EExecutor(){
		 executor = Executors.newFixedThreadPool(1); 
	 }
	 
	 public Future<?> executeMethod(final Callable<?> methodReference) {
	        return executor.submit(methodReference);
	        
	        
	        /*//check the outcome of the executor thread and limit the time allowed for it to complete
	        try{
	        	while (!future.isDone()){}
	            System.out.println("Output of Future: " + future.get());//future.get(timeoutSecs, TimeUnit.SECONDS));
	            future.cancel(true);
	            executor.shutdown();
	        } catch (Exception e){
	            //ExecutionException: deliverer threw exception
	            //TimeoutException: didn't complete within downloadTimeoutSecs
	            //InterruptedException: the executor thread was interrupted
	            //interrupts the worker thread if necessary
	            System.out.println("ExceptionType/message: " + e.toString() +"/" + e.getMessage());
	            future.cancel(true);
	            executor.shutdown();
	            executor.shutdownNow();
	        }*/
	    }
}
