<?php
//include "session.php";
//$AccessCode = $_SESSION['AccessCode'];
//$VerifyCode = $_SESSION['VerifyCode'];


	//Include and Set phpseclib path
    //set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
	
	//Include SSH2 file
	//include('Net/SSH2.php');
	
	function NWLogin($AccessCode,$VerifyCode){
	include "dbitcon.php";
	//Set Variables
	//$host = '199.179.23.117';
	//$username = 'sean.cassidy';
	//$password = 'dbitPASS33';
	//$csession = 'csession cache355';
	//$cdUnix = 'D ^%CD';
	//$instance = 'CPM355';
	//$cprsLogin = 'S DUZ=1';

    //$ssh = new Net_SSH2($host);
    //if (!$ssh->login($username, $password)) {
    //     exit('Login Failed');
    //}


	//$ssh->write("\r");
	//$ssh->write("$csession \n");
	//sleep(1);
	//$ssh->write("$cdUnix \n");
	//$ssh->write("$instance");
	//$ssh->write("\n");
	//$ssh->write("D ^XUP");
	//$ssh->write("\n");
	//$ssh->write("$AccessCode");
	//$ssh->write("\r");
	//sleep(1);

	//Set SSH Timeout
	//$ssh->setTimeout(1);
	
	//Read Results
	//$SSHresults = $ssh->read();
	//echo "Results: <br>".$SSHresults."<br>";
	
	//$sshr = strrev("".$SSHresults."");
	//echo "<br><br>String Reversered".$sshr."<br><br>";
	//$rest = substr("".$SSHresults."", -6); 
	//echo "answer:".$rest."<br><br>";

	//$rest2 = (string)$rest;
	//if ($rest2 === "NAME: "){
	//echo "Granted Access<br><br>";
	//$NWLoginR = 1;
	//$_SESSION['COMSLogin']= 1;

	//}else{
	//echo "Denied Access";
	//$NWLoginR = 2;
			$point = "NWlogin";
			PostTrack($_SESSION['ruser'],$AccessCode,$point,1,$_SESSION['sessionid']);
			$ruser = $_SERVER['REMOTE_USER'];
			$_SESSION['sessionStatus'] = 0;

			$tsql = "SELECT role,DisplayName,rid,Email,TemplateAuthoring,Role_ID FROM Roles WHERE username = '$AccessCode'";
			$getrole = sqlsrv_query($conn, $tsql);
				while($row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC)) {
					$_SESSION['role']= $row['role'];
					$_SESSION['dname']= $row['DisplayName'];
					$_SESSION['rid']= $row['rid'];
					$_SESSION['Email']= $row['Email'];
					$_SESSION['TemplateAuthoring']= $row['TemplateAuthoring'];
					$_SESSION['Role_ID']= $row['Role_ID'];
					$_SESSION['AC']= $AccessCode;
					$_SESSION['VC']= $VerifyCode;
				}
			$globalsq = "SELECT * FROM Globals";
			$getglobals = sqlsrv_query($conn, $globalsq);
				while( $row = sqlsrv_fetch_array($getglobals, SQLSRV_FETCH_ASSOC)) {
					$_SESSION['sitelist']= $row['sitelist'];
					$_SESSION['domain'] = $row['domain'];
					$_SESSION['mdws'] = $row['mdws'];
				}
				
			$usql = "Update Roles set Last_SessionID = '".$_SESSION['sessionid']."' where username = '$AccessCode'";
			$updateRole = sqlsrv_query($conn, $usql);
				
			$point = "signed in";
			PostTrack($_SESSION['ruser'],$_SESSION['AC'],$point,99,$_SESSION['sessionid']);
			$NWLoginR = 1;
			$_SESSION['COMSLogin']= 1;
			//echo "".var_dump($_SESSION)."<br>";
	//}
	//writeDebug2($SSHresults);
	//echo $NWLoginR;
	return $NWLoginR;
	}

	//function writeDebug2($SSHresults){
	//$timeset = date(His);
	//$myFile = "SSHDebug\SSHDebugLogin+".$timeset.".txt";
	//$fh = fopen($myFile, 'w') or die("can't open file");
	//fwrite($fh, $SSHresults);
	//fclose($fh);
	//}

//NWLogin($AccessCode,$VerifyCode);
	
//echo "<br>done <br>";
//echo "Access Code:".$AccessCode."";	
?>