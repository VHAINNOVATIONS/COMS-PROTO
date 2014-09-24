package org.automatedtesting.utils;

import java.util.concurrent.*;

public class IEExecutor {
	 private  ExecutorService executor;
	 
	 public IEExecutor(){
		 executor = Executors.newFixedThreadPool(1); 
	 }
	 
	 public void  executeMethodWithTimeout(final Callable<?> methodReference, int timeoutSecs) {
	        final Future<?> future = executor.submit(new Runnable() {
	            public void run() {
	                try{
	                    methodReference.call();
	                } catch (Exception e){
	                    throw new RuntimeException(e);
	                }
	            }
	        });
	        
	        //check the outcome of the executor thread and limit the time allowed for it to complete
	        try{
	            System.out.println("Output of Future: " + future.get(timeoutSecs, TimeUnit.SECONDS));
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
	        }
	    }
}
