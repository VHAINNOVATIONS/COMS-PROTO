/**
 * 
 */
package org.automatedtesting.utils;

import java.util.TimerTask;

/**
 * @author afequiere004
 *
 */
public class TimerTaskParam extends TimerTask {

	/**
	 * 
	 */
	private Object[] parameters;
	private Object[] storedValues;	

	public TimerTaskParam(Object[] params) {
		// TODO Auto-generated constructor stub
		parameters = params;
		storedValues = null;
	}

	/* (non-Javadoc)
	 * @see java.util.TimerTask#run()
	 */
	@Override
	public void run() {
		// TODO Auto-generated method stub

	}
	
	public Object[] getParameters() {
		return parameters;
	}

	public void setParameters(Object[] parameters) {
		this.parameters = parameters;
	}
	
	public Object[] getStoredValues() {
		return storedValues;
	}

	public void setStoredValues(Object[] storedValues) {
		this.storedValues = storedValues;
	}

}
