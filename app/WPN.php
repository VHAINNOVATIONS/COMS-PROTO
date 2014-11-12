<?php
	//Include and Set phpseclib path
    ///set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');	 /* Changed to match Sandbox - 30 May 2014 */
	
	//Include SSH2 file
	///include('Net/SSH2.php');	 /* Changed to match Sandbox - 30 May 2014 */

    $drug = "";
    $dose = "";
    $Regimen_Dose_Unit = "";
    $Description = "";
    $match = "";
	$patientsearch = $match;
	
	function ProgressNote($note,$match){

	$orderday = date('m_d_Y');
	//Set Variables
	$host = '54.83.44.110';
	$username = 'vista';
	$password = '';
	$login = '1radiologist';
	$loginpass = 'radiologist1';
	$tmatch = trim($match);
	$patientSearch = $tmatch;
	$AC = '1radiologist';
	$VC = 'radiologist1';
	//$AC = 'CPRS1234';
	//$VC = 'CPRS4321$';
	//$Note = "Test Note";
	
    $ssh = new Net_SSH2($host);
    if (!$ssh->login($username, $password)) {
         exit('Login Failed');
    }

	sleep(4);
	$ssh->write("\r");
	sleep(3);
	$ssh->write("\r");
	$ssh->write("\r");
	sleep(3);
	$ssh->write("\r");
	$ssh->write("$AC\r");
	$ssh->write("$VC\r");
	sleep(3);
	$ssh->write("\r");
	$ssh->write("OE\r");
	
	$ssh->write("FD\r");
	$ssh->write("$patientSearch\r");
	sleep(1);
	$ssh->write("\r");
	sleep(1);
	$ssh->write("\r");
	sleep(1);
	$ssh->write("Notes\r");
	sleep(1);
	$ssh->write("NW\r");
	sleep(1);
	$ssh->write("N\r");
	sleep(1);
	$ssh->write("Primary Care General Note\r");
	sleep(1);
	$ssh->write("Yes\r");
	sleep(1);
	$ssh->write("Outpatient\r");
	sleep(1);
	$ssh->write("New\r");
	sleep(1);
	$ssh->write("Y\r");
	sleep(1);
	$ssh->write("N\r");
	sleep(1);
	$ssh->write("A\r");
	sleep(1);
	$ssh->write("Y\r");
	sleep(5);
	$ssh->write("$note\r");
	sleep(1);
	$ssh->write("\r");
	sleep(1);
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$VC\r");
	sleep(1);
	$ssh->write("Radiologist, One\r");
	sleep(1);
	$ssh->write("\r");

	
	//Set SSH Timeout
	$ssh->setTimeout(1);
	
	//Read Results
	$SSHresults = $ssh->read();
	//echo $SSHresults;
	$xxx = 'nothing';
	//writeDebug($SSHresults,$note,$patientSearch,$xxx);
	}
	


	//ProgressNote('Test Progress Note','f0500');
	
	
?>