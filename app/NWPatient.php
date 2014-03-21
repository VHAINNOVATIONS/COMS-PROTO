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
	$fh = fopen($myFile, 'w') or die("valuecheck:can't open file");
	fwrite($fh, "Value:  ".$value."  ");
	fclose($fh);
	}
	
	//Include and Set phpseclib path
    //set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
	
	//Include SSH2 file
	//include('Net/SSH2.php');
	
	//Set Variables
	$host = '172.19.100.94';
	$username = 'cachemgr355';
	$password = 'vhaino355';
	$csession = 'csession cache355';
	$cdUnix = 'D ^%CD';
	$instance = 'CPM355';
	$cprsLogin = 'S DUZ=1';
	$patientLocation = 'GEN MED';
	$actingProvider = 'v107';
	$routine = 'ROUTINE';
	
	function NewOrderPatient($drug,$dose,$Regimen_Dose_Unit,$Description,$match,$NumberofDoses){
	if ($Description === 'old'){
	
	}else{
	
	$orderday = date('m_d_Y');
	
	//Set Variables
	$host = '172.19.100.94';
	$username = 'cachemgr355';
	$password = 'vhaino355';
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

	sleep(20);
	$ssh->write("\r");
	$ssh->write("$csession \n");
	sleep(1);
	$ssh->write("$cdUnix \n");
	sleep(1);
	$ssh->write("$instance");
	$ssh->write("\n");
	sleep(1);
	$ssh->write("$cprsLogin");
	$ssh->write("\n");
	sleep(1);
	$ssh->write("D ^XUP");
	$ssh->write("\n");
	sleep(2);
	$ssh->write("Order");
	$ssh->write("\n");
	sleep(1);
	$ssh->write("1");
	$ssh->write("\n");
	sleep(1);
	$ssh->write("FD \r");
	$ssh->write("$patientSearch");
	sleep(1);
	$ssh->write("\r");
	$ssh->write("\r");
	$ssh->write("\r");
	$ssh->write("Orders \r");
	sleep(1);
	$ssh->write("NW \r");
	sleep(1);
	$ssh->write("$patientLocation");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("$actingProvider");
	$ssh->write("\r");
	sleep(1);
	$ssh->write("y");
	sleep(1);
	$ssh->write("\r");
	sleep(1);
	if ($Description === 'InPatient'){
	$ssh->write("15");
	$ssh->write("\r");
	sleep(1);
	}elseif ($Description === 'OutPatient'){
	$ssh->write("20");
	$ssh->write("\r");
	sleep(1);
	}
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

?>