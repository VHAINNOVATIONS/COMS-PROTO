<?php
	include('session.php');

	//Include and Set phpseclib path
    set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');	 /* Changed to match Sandbox - 30 May 2014 */
	
	//Include SSH2 file
	include('Net/SSH2.php');	 /* Changed to match Sandbox - 30 May 2014 */
	
	function delLineFromFile($fileName, $lineNum){
	// check the file exists 
	if(!is_writable($fileName)){
    // print an error
    print "The file $fileName is not writable";
    // exit the function
    exit;
    }
	else{
    // read the file into an array    
    $arr = file($fileName);
    }

	// the line to delete is the line number minus 1, because arrays begin at zero
	$lineToDelete = $lineNum-1;
 
	// check if the line to delete is greater than the length of the file
	if($lineToDelete > sizeof($arr))
    {
    
	// print an error
    print "You have chosen a line number, <b>[$lineNum]</b>,  higher than the length of the file.";
    
	// exit the function
	exit;
    }

	//remove the line
	unset($arr["$lineToDelete"]);

	// open the file for reading
	if (!$fp = fopen($fileName, 'w+'))
    {
    // print an error
        print "Cannot open file ($fileName)";
      // exit the function
        exit;
        }
  
	// if $fp is valid
	if($fp)
    {
        // write the array to the file
        foreach($arr as $line) { fwrite($fp,$line); }

        // close the file
        fclose($fp);
        }

	}
	
	function GetNDFL($lrange){
	
	//Set Variables
	//$host = '54.83.44.110';
	$host = $_SESSION['vista'];
	//$username = 'vista';
	$username = $_SESSION['sshusr'];
	$password = '';
	$login = 'cachemgr';
	//$loginpass = 'vistagold';
	$loginpass = $_SESSION['sshpwd'];
	$csession = 'csession cache355';
	
    $ssh = new Net_SSH2($host);
    if (!$ssh->login($username, $password)) {
         exit('Login Failed');
    }

	$ssh->write("$login\r");
	$ssh->write("$loginpass\r");
	sleep(3);
	$ssh->write("CPRS1234\r");
	$ssh->write("CPRS4321$\r");
	sleep(3);
	$ssh->write("\r");
	$ssh->write("FM\r");
	$ssh->write("Other\r");
	$ssh->write("RX\r");
	$ssh->write("PSN\r");
	$ssh->write("RPRT\r");
	$ssh->write("LDPN\r");
	$ssh->write("S\r");
	sleep(1);
	$ssh->write("N\r");
	$ssh->write("$lrange\r");
	$ssh->write("\r");

	$countr = 0;
	while ($countr <= 40) {
	$ssh->write("\r");
    $countr++;  
	}

	sleep(1);

	//Set SSH Timeout
	$ssh->setTimeout(1);
	
	//Read Results
	$SSHresults = $ssh->read();
	echo $SSHresults;	
		
	$txtremove = array("
Enter RETURN to continue or '^' to exit: [H[J[2J[H
                         Local Drug/VA Print Name Report
              for Drug Names Beginning with the letter A through F
","
Generic Name                               VA Print Name
-------------------------------------------------------------------------------","
End of Report.

Press Return to continue: ","Date printed: ");
	$SSHresultsNew = str_replace($txtremove, "", $SSHresults);

	$txtremove2 = array(" ");
	$SSHresultsNew2 = str_replace($txtremove, "\n", $SSHresultsNew);
	
	$myFile = writeDrugFile($SSHresultsNew2,$lrange);
	$lineNum = 1;
	$count = 1;
	
	while ($count <= 212) {
	delLineFromFile($myFile, $lineNum);
    $count++;  
	}
	}

	function GetNDFLldf(){
	
	//Set Variables
	//$host = '54.83.44.110';
	$host = $_SESSION['vista'];
	//$username = 'vista';
	$username = $_SESSION['sshusr'];
	$password = '';
	$login = 'cachemgr';
	//$loginpass = 'vistagold';
	$loginpass = $_SESSION['sshpwd'];
	$csession = 'csession cache355';
	
    $ssh = new Net_SSH2($host);
    if (!$ssh->login($username, $password)) {
         exit('Login Failed');
    }

	$ssh->write("$login\r");
	$ssh->write("$loginpass\r");
	sleep(3);
	$ssh->write("CPRS1234\r");
	$ssh->write("CPRS4321$\r");
	sleep(3);
	$ssh->write("\r");
	$ssh->write("FM\r");
	$ssh->write("Other\r");
	$ssh->write("RX\r");
	$ssh->write("PSN\r");
	$ssh->write("RPRT\r");
	$ssh->write("LDF\r");
	
	$countr = 0;
	while ($countr <= 1000) {
	$ssh->write("\r");
    $countr++;  
	}

	sleep(1);

	//Set SSH Timeout
	$ssh->setTimeout(1);
	
	//Read Results
	$SSHresults = $ssh->read();
		
	$txtremove = array("[H[J[2J[H                                                      LOCAL DRUG LIST (ALPHABETI
C)#   Not on National Formulary
  R   National Formulary Restriction
   
LOCAL DRUG NAME                                   INACTIVE               DEA
                                                                                
    NDC                                             DATE");
	$SSHresultsNew = str_replace($txtremove, "", $SSHresults);

	$myFile = writeDrugFile($SSHresultsNew);
	$lineNum = 1;
	$count = 1;
	
	while ($count <= 194) {
	delLineFromFile($myFile, $lineNum);
    $count++;  
	}
	
	$lineNum2 = 12741;
	$count2 = 1;
	
	while ($count2 <= 151) {
	delLineFromFile($myFile, $lineNum2);
    $count2++;  
	}
	
	//Delete SQL
	$Dquery = "DELETE FROM LookUp WHERE Lookup_Type = 2";
	$DelDrugs = sqlsrv_query($conn, $Dquery);
	
	$str=file_get_contents($myFile);
	$array = preg_split('/[\n\r]+/', $str);
	
	foreach ($array as $i => $value) {
	$prefix = " ";
	$val = str_startswith($value, $prefix);	
	if ($val === true){
	}else{
	$prefix = "ZZ";
	$val = str_startswith($value, $prefix);
	if ($val === true){
	}else{
	include "dbitcon.php";
	//$query = "INSERT INTO COMS_Drugs (Drugs) VALUES ('$value')";
	$query = "INSERT INTO LookUp (Lookup_Type,Name,Description) VALUES (2,'$value','NLM')";
	$postDrugs = sqlsrv_query($conn, $query);
	}
	}
}
	
	file_put_contents($myFile, "$str");
	
	echo "Text file created and database entries updated in Lookup table for LookupType 2.";
	}
	
	function str_startswith($source, $prefix)
{
   return strncmp($source, $prefix, strlen($prefix)) == 0;
}
	
	function BreakLines($myFile){	
		$file_handle = fopen($myFile, "r");
			while (!feof($file_handle)) {
				$line = fgets($file_handle);
				echo $line;
			}
		fclose($file_handle);
	}
	
	
	
	function writeDrugFile($SSHresults,$lrange){
	//$timeset = date(His);
	$timeset = $_SERVER['REQUEST_TIME'];
	$myFile = "SSHDebug\Drugs+".$lrange."+".$timeset.".txt";
	$fh = fopen($myFile, 'w') or die("writeDebug:can't open file");
	fwrite($fh, $SSHresults);
	fclose($fh);
	return($myFile);
	}

	//$lrange = 'A-F';
	//GetNDFL($lrange);
	//$lrange = 'G-M';
	//GetNDFL($lrange);
	//$lrange = 'N-R';
	//GetNDFL($lrange);
	//$lrange = 'S-Z';
	//GetNDFL($lrange);
	
	GetNDFLldf();

?>