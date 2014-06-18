<?php
	//Include and Set phpseclib path
    set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');	 /* Changed to match Sandbox - 30 May 2014 */
	
	//Include SSH2 file
	include('Net/SSH2.php');	 /* Changed to match Sandbox - 30 May 2014 */

    $drug = "";
    $dose = "";
    $Regimen_Dose_Unit = "";
    $Description = "";
    $match = "";

//if (isset($argc)) {
//    if ($argc >= 6) { 
//        echo "argv[1] = {$argv[1]}\n";
//    }
//    $drug = $argv[1];
//    $dose = $argv[2];
//    $Regimen_Dose_Unit = $argv[3];
//    $Description = $argv[4];
//    $match = $argv[5];
//}

//valuecheck($drug);
$patientsearch = $match;

	function valuecheck($value){
	$today = date(MDY);
	$myFile = "SSHDebug\ValueDebug+".$value."+".$today.".txt";
	$fh = fopen($myFile, 'w') or die("valuecheck:can't open file");
	fwrite($fh, "Value:  ".$value."  ");
	fclose($fh);
	}
	
	
	function NewOrderPatient($drug,$dose,$Regimen_Dose_Unit,$Description,$match,$NumberofDoses){
	if ($Description === 'old'){
	
	}else{
	
	$orderday = date('m_d_Y');
	
	//Set Variables
	$host = '54.83.44.110';
	$username = 'vista';
	$password = '';
	$login = 'cachemgr';
	$loginpass = 'vistagold';
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
	$drug = '5-FU  FLUOROURACIL INJ,SOLN';
	$tdrug = trim($drug);
	$AC = '1radiologist';
	$VC = 'radiologist1';
	$Description = 'OutPatient';
	
    $ssh = new Net_SSH2($host);
    if (!$ssh->login($username, $password)) {
         exit('Login Failed');
    }

	$ssh->write("$login\r");
	$ssh->write("$loginpass\r");
	sleep(3);
	$ssh->write("$AC\r");
	$ssh->write("$VC\r");
	sleep(3);
	$ssh->write("\r");
	$ssh->write("AD\r");
	$ssh->write("FD\r");
	$ssh->write("$patientSearch\r");
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

	$ssh->write("$tdrug");
	$ssh->write("\r");
	sleep(1);
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
	sleep(1);
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
	echo $SSHresults;
	
	writeDebug($SSHresults,$tdrug,$patientSearch,$orderday);
	}
	}

	function writeDebug($SSHresults,$tdrug,$patientSearch,$orderday){
	$timeset = date(His);
	$myFile = "SSHDebug\SSHDebug+".$patientSearch."+".$tdrug."+".$orderday."+".$timeset.".txt";
	$fh = fopen($myFile, 'w') or die("writeDebug:can't open file");
	fwrite($fh, $SSHresults);
	fclose($fh);
	}

	NewOrderPatient('1',5,'mg','$Description','f0500',5);
	
	
?>