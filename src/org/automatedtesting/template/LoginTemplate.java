package org.automatedtesting.template;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

public class LoginTemplate {	
	
	private String URL;	
	private String loginHeaderLbl;	
	private String loginUserName;	
	private String loginPassword;
	private String accessCodeProgrammer;	
	private String verifyCodeProgrammer;
	private String accessCodeProvider;	
	private String verifyCodeProvider;
	private String accessCodeNurse;	
	private String verifyCodeNurse;
	private String accessCodePharmacist;	
	private String verifyCodePharmacist;
	private String accessCodeAdmin;	
	private String verifyCodeAdmin;
	private HashMap<String,List<String>> accountList;	
	

	public LoginTemplate(Properties propFile){
		URL = propFile.getProperty("URL");
		loginHeaderLbl = propFile.getProperty("loginHeaderLbl");
		loginUserName = propFile.getProperty("loginUserName");
		loginPassword = propFile.getProperty("loginPassword");
		accessCodeProgrammer = propFile.getProperty("accessCodeProgrammer");
		verifyCodeProgrammer = propFile.getProperty("verifyCodeProgrammer");
		accessCodeProvider = propFile.getProperty("accessCodeProvider");
		verifyCodeProvider = propFile.getProperty("verifyCodeProvider");
		accessCodeNurse = propFile.getProperty("accessCodeNurse");
		verifyCodeNurse = propFile.getProperty("verifyCodeNurse");
		accessCodePharmacist = propFile.getProperty("accessCodePharmacist");
		verifyCodePharmacist = propFile.getProperty("verifyCodePharmacist");
		accessCodeAdmin = propFile.getProperty("accessCodeAdmin");
		verifyCodeAdmin = propFile.getProperty("verifyCodeAdmin");
		
		//Construct HashMap for accounts
		accountList = new HashMap<String,List<String>>();
		List<String> codes = new ArrayList<String>();
		codes.add(accessCodeProgrammer);
		codes.add(verifyCodeProgrammer);		
		accountList.put("programmer", codes);
		codes = null;
		
		codes = new ArrayList<String>();
		codes.add(accessCodeProvider);
		codes.add(verifyCodeProvider);		
		accountList.put("provider", codes);
		codes = null;
		
		codes = new ArrayList<String>();
		codes.add(accessCodeNurse);
		codes.add(verifyCodeNurse);		
		accountList.put("nurse", codes);
		codes = null;
		
		codes = new ArrayList<String>();
		codes.add(accessCodePharmacist);
		codes.add(verifyCodePharmacist);		
		accountList.put("pharmacist", codes);
		codes = null;
		
		codes = new ArrayList<String>();
		codes.add(accessCodeAdmin);
		codes.add(verifyCodeAdmin);		
		accountList.put("admin", codes);
		codes = null;
		
	}
	
	public String getLoginHeaderLbl() {
		return loginHeaderLbl;
	}

	public void setLoginHeaderLbl(String loginHeaderLbl) {
		this.loginHeaderLbl = loginHeaderLbl;
	}

	public String getLoginUserName() {
		return loginUserName;
	}

	public void setLoginUserName(String loginUserName) {
		this.loginUserName = loginUserName;
	}

	public String getLoginPassword() {
		return loginPassword;
	}

	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}
	
	public String getAccessCodeProgrammer() {
		return accessCodeProgrammer;
	}

	public void setAccessCodeProgrammer(String accessCodeProgrammer) {
		this.accessCodeProgrammer = accessCodeProgrammer;
	}

	public String getVerifyCodeProgrammer() {
		return verifyCodeProgrammer;
	}

	public void setVerifyCodeProgrammer(String verifyCodeProgrammer) {
		this.verifyCodeProgrammer = verifyCodeProgrammer;
	}

	public String getAccessCodeProvider() {
		return accessCodeProvider;
	}

	public void setAccessCodeProvider(String accessCodeProvider) {
		this.accessCodeProvider = accessCodeProvider;
	}

	public String getVerifyCodeProvider() {
		return verifyCodeProvider;
	}

	public void setVerifyCodeProvider(String verifyCodeProvider) {
		this.verifyCodeProvider = verifyCodeProvider;
	}

	public String getAccessCodeNurse() {
		return accessCodeNurse;
	}

	public void setAccessCodeNurse(String accessCodeNurse) {
		this.accessCodeNurse = accessCodeNurse;
	}

	public String getVerifyCodeNurse() {
		return verifyCodeNurse;
	}

	public void setVerifyCodeNurse(String verifyCodeNurse) {
		this.verifyCodeNurse = verifyCodeNurse;
	}

	public String getAccessCodePharmacist() {
		return accessCodePharmacist;
	}

	public void setAccessCodePharmacist(String accessCodePharmacist) {
		this.accessCodePharmacist = accessCodePharmacist;
	}

	public String getVerifyCodePharmacist() {
		return verifyCodePharmacist;
	}

	public void setVerifyCodePharmacist(String verifyCodePharmacist) {
		this.verifyCodePharmacist = verifyCodePharmacist;
	}

	public String getAccessCodeAdmin() {
		return accessCodeAdmin;
	}

	public void setAccessCodeAdmin(String accessCodeAdmin) {
		this.accessCodeAdmin = accessCodeAdmin;
	}

	public String getVerifyCodeAdmin() {
		return verifyCodeAdmin;
	}

	public void setVerifyCodeAdmin(String verifyCodeAdmin) {
		this.verifyCodeAdmin = verifyCodeAdmin;
	}
	
	public HashMap<String, List<String>> getAccountList() {
		return accountList;
	}

	public void setAccountList(HashMap<String, List<String>> accountList) {
		this.accountList = accountList;
	}
	public String getURL() {
		return URL;
	}

	public void setURL(String uRL) {
		URL = uRL;
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
