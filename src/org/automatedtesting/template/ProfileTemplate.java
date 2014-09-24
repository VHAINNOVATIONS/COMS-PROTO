package org.automatedtesting.template;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ProfileTemplate {	
	
	private String profileHeaderLbl;	
	private String profileStreet1;
	private String profileCity;
	private String profilePostalCode;
	private String profileState;
	private String profileMiddleName;
	private String profileUpdateSuccess;	

	public ProfileTemplate(Properties propFile){
		profileHeaderLbl = propFile.getProperty("profileHeaderLbl");
		profileStreet1 = propFile.getProperty("profileStreet1");
		profileCity = propFile.getProperty("profileCity");
		profilePostalCode = propFile.getProperty("profilePostalCode");
		profileState = propFile.getProperty("profileState");
		profileMiddleName = propFile.getProperty("profileMiddleName");	
		profileUpdateSuccess = propFile.getProperty("profileUpdateSuccess");
	}	
	
	public String getProfileHeaderLbl() {
		return profileHeaderLbl;
	}


	public void setProfileHeaderLbl(String profileHeaderLbl) {
		this.profileHeaderLbl = profileHeaderLbl;
	}


	public String getProfileStreet1() {
		return profileStreet1;
	}


	public void setProfileStreet1(String profileStreet1) {
		this.profileStreet1 = profileStreet1;
	}


	public String getProfileCity() {
		return profileCity;
	}


	public void setProfileCity(String profileCity) {
		this.profileCity = profileCity;
	}


	public String getProfilePostalCode() {
		return profilePostalCode;
	}


	public void setProfilePostalCode(String profilePostalCode) {
		this.profilePostalCode = profilePostalCode;
	}


	public String getProfileState() {
		return profileState;
	}


	public void setProfileState(String profileState) {
		this.profileState = profileState;
	}


	public String getProfileMiddleName() {
		return profileMiddleName;
	}


	public void setProfileMiddleName(String profileMiddleName) {
		this.profileMiddleName = profileMiddleName;
	}
	
	public String getProfileUpdateSuccess() {
		return profileUpdateSuccess;
	}

	public void setProfileUpdateSuccess(String profileUpdateSuccess) {
		this.profileUpdateSuccess = profileUpdateSuccess;
	}
	
	public Properties getProperties() {
		Properties prop = new Properties();
		InputStream in = getClass().getResourceAsStream("suite.properties");
		try {
			prop.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		
		return prop;
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
