<?php
//include "session.php";

$AccessCode = $_SESSION['AccessCode'];
$VerifyCode = $_SESSION['VerifyCode'];
valuecheck2($AccessCode);


	function valuecheck2($value){
	$today = date(MDY);
	$myFile = "SSHDebug\LoginDebug+".$value."+".$today.".txt";
	$fh = fopen($myFile, 'w') or die("NWLogin2 - valuecheck2 - can't open file");
	fwrite($fh, "Value:  ".$value."  ");
	fclose($fh);
	}
	
	//Include and Set phpseclib path
    set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
	
	//Include SSH2 file
	include('Net/SSH2.php');
	
	//Set Variables
	$host = '172.19.100.94';
	$username = 'cachemgr355';
	$password = 'vhaino355';
	$csession = 'csession cache355';
	$cdUnix = 'D ^%CD';
	$instance = 'CPM355';
	$cprsLogin = 'S DUZ=1';
	
	function NWLogin($AccessCode,$Verify){
	
	
	//Set Variables
	$host = '172.19.100.94';
	$username = 'cachemgr355';
	$password = 'vhaino355';
	$csession = 'csession cache355';
	$cdUnix = 'D ^%CD';
	$instance = 'CPM355';
	$cprsLogin = 'S DUZ=1';

    $ssh = new Net_SSH2($host);
    if (!$ssh->login($username, $password)) {
         exit('Login Failed');
    }


	$ssh->write("\r");
	$ssh->write("$csession \n");
	sleep(1);
	$ssh->write("$cdUnix \n");
	//sleep(1);
	$ssh->write("$instance");
	$ssh->write("\n");
	//sleep(1);
	$ssh->write("D ^XUP");
	$ssh->write("\n");
	//sleep(2);
	//$AccessCode = "1234";
	$ssh->write("$AccessCode");
	$ssh->write("\r");
	sleep(1);

	//Set SSH Timeout
	$ssh->setTimeout(1);
	
	//Read Results
	$SSHresults = $ssh->read();
	echo "Results: <br>".$SSHresults."<br>";
	
	//$sshr = strrev("".$SSHresults."");
	//echo "<br><br>String Reversered".$sshr."<br><br>";
	$rest = substr("".$SSHresults."", -6); 
	echo "answer:".$rest."<br><br>";

	$rest2 = (string)$rest;
	if ($rest2 === "NAME: "){
	echo "Granted Access<br><br>";

	}else{
	echo "Denied Access";
	}
	writeDebug2($SSHresults);
	
	}

	function writeDebug2($SSHresults){
	$timeset = date(His);
	$myFile = "SSHDebug\SSHDebugLogin+".$timeset.".txt";
	$fh = fopen($myFile, 'w') or die("NWLogin2 - writeDebug2 - can't open file");
	fwrite($fh, $SSHresults);
	fclose($fh);
	}

NWLogin($AccessCode,$VerifyCode);
	
//echo "<br>done <br>";
//echo "Access Code:".$AccessCode."";	
?>