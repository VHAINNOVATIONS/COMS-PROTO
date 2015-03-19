<?php

    $drug = "";
    $dose = "";
    $Regimen_Dose_Unit = "";
    $Description = "";
    $match = "";

if (isset($argc)) {
    if ($argc >= 6) { 
        echo "argv[1] = {$argv[1]}\n";
    }
    $drug = $argv[1];
    $dose = $argv[2];
    $Regimen_Dose_Unit = $argv[3];
    $Description = $argv[4];
    $match = $argv[5];
}

//valuecheck($drug);
$patientsearch = $match;

	function valuecheck($value){
	$today = date(MDY);
	$myFile = "SSHDebug\ValueDebug+".$value."+".$today.".txt";
	$fh = fopen($myFile, 'w') or die("NWPatient - valuecheck :can't open file");
	fwrite($fh, "Value:  ".$value."  ");
	fclose($fh);
	}
	
	//Include and Set phpseclib path
    set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');	 /* Changed to match Sandbox - 30 May 2014 */
	
	//Include SSH2 file
	include('Net/SSH2.php');	 /* Changed to match Sandbox - 30 May 2014 */
	
	function NewOrderPatient($drug,$dose,$Regimen_Dose_Unit,$Description,$match,$NumberofDoses){
	if ($Description === 'old'){
	
	}else{
	
	$orderday = date('m_d_Y');
	
	//Set Variables
	$host = $_SESSION['vista'];
	$username = $_SESSION['sshusr'];
	$AC = $_SESSION['AC'];
	$VC = $_SESSION['VC'];
	$password = '';
	$csession = 'csession cache355';
	$cdUnix = 'D ^%CD';
	$instance = 'CPM355';
	$cprsLogin = 'S DUZ=1';
	$tmatch = trim($match);
	$patientSearch = $tmatch;
	$patientLocation = 'GEN MED';
	$actingProvider = 'v107';
	$doseorder = "".$dose." ".$Regimen_Dose_Unit."";
	$schedule = 'QDAY';
	$routine = 'ROUTINE';
	$tdrug = trim($drug);
	
    $ssh = new Net_SSH2($host);
    if (!$ssh->login($username, $password)) {
         exit('Login Failed');
    }

	$ssh->write("\r");
	sleep(3);
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
	$ssh->write("AD\r");
	sleep(1);
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$patientLocation\r");
	if ($Description === 'InPatient'){
		$ssh->write("15\r");
	}elseif ($Description === 'OutPatient'){
		$ssh->write("20\r");
	}
	$ssh->write("Provider, One\r");
	$ssh->write("1\r");
	
	sleep(1);

	sleep(1);
	if ($tdrug === '5-FU  FLUOROURACIL INJ,SOLN'){
	$ssh->write("5");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("1");
	$ssh->write("\r");
	sleep(1);
	}elseif ($tdrug === '5-FLUOROURACIL  FLUOROURACIL INJ,SOLN'){
	$ssh->write("5");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("1");
	$ssh->write("\r");
	sleep(1);
	}elseif ($tdrug === 'RANITIDINE TAB'){
	$ssh->write("RANITIDINE TAB ");		 
/* Block below vvvvvvvvvvvvvvvvvv changed to match Sandbox - 30 May 2014 */
	$ssh->write("\r");
	sleep(1);
	$ssh->write("1");
	$ssh->write("\r");
	sleep(1);
	}elseif ($tdrug === 'DEXAMETHASONE TAB'){
	$ssh->write("DEXAMETHASONE TAB");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("n");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$doseorder MG");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("1");
	$ssh->write("\r");
	sleep(1);
	}elseif ($tdrug === 'PROCHLORPERAZINE TAB'){
	$ssh->write("PROCHLORPERAZINE TAB");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("n");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$doseorder MG");
/* Block above ^^^^^^^^^^^^^^^^^^^^^^^ changed to match Sandbox - 30 May 2014 */
	$ssh->write("\r");
	sleep(1);
	$ssh->write("1");
	$ssh->write("\r");
	sleep(1);
	}else{
	$ssh->write("$tdrug");
	$ssh->write("\r");
	sleep(1);
	}
	$ssh->write("n");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$doseorder");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("1");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$schedule");
	$ssh->write("\r");
	sleep(1);
	if ($Description === 'InPatient'){
	$ssh->write("1");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("N");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$routine");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("\r");
	sleep(5);
	$ssh->write("P");
	$ssh->write("\r");
	}else{
	$ssh->write("1");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$NumberofDoses");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$NumberofDoses");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("0");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("C");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$routine");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("\r");
	sleep(1);
	$ssh->write("P");
	$ssh->write("\r");
	}
	//Set SSH Timeout
	$ssh->setTimeout(1);
	
	//Read Results
	$SSHresults = $ssh->read();
	
	writeDebug($SSHresults,$tdrug,$patientSearch,$orderday);
	}
	}

	function writeDebug($SSHresults,$tdrug,$patientSearch,$orderday){
        /** MWB - 1/20/2015 - Crashes on Meds which contain a "/" so commented it out.
         ** It's for debug only so no issue.
	$timeset = date(His);
	$myFile = "SSHDebug\SSHDebug+".$patientSearch."+".$tdrug."+".$orderday."+".$timeset.".txt";
	file_put_contents($myFile, $SSHresults);
	$fh = fopen($myFile, 'w') or die("NWPatient - writeDebug: can't open file - $myFile");
	fwrite($fh, $SSHresults);
	fclose($fh);
	//echo $SSHresults;
        **/
	}
	
	//NewOrderPatient($MH_Drug_ID_Name,$MHI_MH_Dose,$Regimen_Dose_Unit,$MH_Description,$match)

?>