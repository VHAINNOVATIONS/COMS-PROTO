<?php
/**
 * Short description for file
 *
 * PHP version 5
 *
 * @category  Debugging_Function
 * @package   COMS
 * @author    Sean Cassidy <sean.cassidy@dbitpro.com>
 * @copyright 2012 DBITPro
 * @license   http://www.php.net/license/3_01.txt  PHP License 3.01
 * @link      http://dbitpro.com
 */

if (isset($argc)) {
	if ($argc >= 6) {
		echo "argv[1] = {$argv[1]}\n";
	}
	$drug = $argv[1];
	$dose = $argv[2];
	$Regimen_Dose_Unit = $argv[3];
	$Description = $argv[4];
	$match = $argv[5];

	valuecheck($drug);
	$patientsearch = $match;
}

	/**
	 * Writes information to a file in the debug folder
	 *
	 * @param string $value the value to be rendered in the debug statement
	 *
	 * @return void No return from the function
	 *
	 * @access public
	 */
function valuecheck($value){
	$today = date(MDY);
	$myFile = "SSHDebug\ValueDebug+".$value."+".$today.".txt";
	$fh = fopen($myFile, 'w') or die("can't open file");
	fwrite($fh, "Value:  ".$value."  ");
	fclose($fh);
}

	//Include and Set phpseclib path
	$incPath = get_include_path() . PATH_SEPARATOR . 'phpseclib';

	set_include_path($incPath);
	// debug("Include Path - " . get_include_path());
	// debug("Include Path added with - $incPath");

	//Include SSH2 file
	if (file_exists('Net/SSH2.php')) {
		require 'Net/SSH2.php';
	}

	//Set Variables
	//$host = '172.19.100.94';
	//$username = 'cachemgr355';
	//$password = 'vhaino355';
	//$csession = 'csession cache355';
	//$cdUnix = 'D ^%CD';
	//$instance = 'CPM355';
	//$cprsLogin = 'S DUZ=1';
	//$patientLocation = 'GEN MED';
	//$actingProvider = 'v107';
	//$routine = 'ROUTINE';
	$host = '199.179.23.117';
	$username = 'sean.cassidy';
	$password = 'dbitPASS22';
	$csession = 'csession VistA';
	$cdUnix = 'D ^%CD';
	$instance = 'CPM355';
	$cprsLogin = 'S DUZ=1';
	$patientLocation = 'GEN MED';
	$actingProvider = 'v107';
	$routine = 'ROUTINE';


	/**
	 * Writes the new order for the patient to VistA???
	 *
	 * @param string $drug              This is the drug for the regimen
	 * @param string $dose              This is the drug for the regimen
	 * @param string $Regimen_Dose_Unit This is the drug for the regimen
	 * @param string $Description       This is the drug for the regimen
	 * @param string $match             This is the drug for the regimen
	 * @param string $NumberofDoses     This is the drug for the regimen
	 *
	 * @return void No return from the function
	 *
	 * @access public
	 */
function NewOrderPatient($drug,$dose,$Regimen_Dose_Unit,$Description,$match,$NumberofDoses){
	if ('old' === $Description) {

	}
	else {
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
		if ($Description === 'InPatient') {
			$ssh->write("15");
			$ssh->write("\r");
			sleep(1);
		}
		elseif ($Description === 'OutPatient') {
			$ssh->write("20");
			$ssh->write("\r");
			sleep(1);
		}
		if ($tdrug === '5-FU  FLUOROURACIL INJ,SOLN') {
			$ssh->write("5");
			$ssh->write("\r");
			sleep(1);
			$ssh->write("1");
			$ssh->write("\r");
			sleep(1);
		}
		elseif ($tdrug === '5-FLUOROURACIL  FLUOROURACIL INJ,SOLN') {
			$ssh->write("5");
			$ssh->write("\r");
			sleep(1);
			$ssh->write("1");
			$ssh->write("\r");
			sleep(1);
		}
		elseif ($tdrug === 'RANITIDINE TAB') {
			$ssh->write("RANITIDINE TAB ");
			$ssh->write("\r");
			sleep(1);
			$ssh->write("1");
			$ssh->write("\r");
			sleep(1);
		}
		else {
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
		if ($Description === 'InPatient') {
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
		}
		else {
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

		writeDebug($SSHresults, $tdrug, $patientSearch, $orderday);
	}
}


	/**
	 * Writes Debug file out
	 *
	 * @param string $SSHresults    Some comment is required
	 * @param string $tdrug         Some comment is required
	 * @param string $patientSearch Some comment is required
	 * @param string $orderday      Some comment is required
	 *
	 * @return void
	 *
	 * @access public
	 */
function writeDebug($SSHresults,$tdrug,$patientSearch,$orderday){
	$timeset = date('His');
	$myFile = "SSHDebug\SSHDebug+".$patientSearch."+".$tdrug."+".$orderday."+".$timeset.".txt";
	$fh = fopen($myFile, 'w') or die("can't open file");
	fwrite($fh, $SSHresults);
	fclose($fh);
}

?>