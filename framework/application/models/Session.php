<?php

class Session extends Model {
    
    function getSessionVariables() {
		$username = get_current_user();
		$chkTrack = 0;
		$_SESSION['chkTrack'] = $chkTrack;
		
        $query = "SELECT role as role,DisplayName as DisplayName,rid as rid,cprsUsername as cprsUsername,cprsPass as cprsPass,Email as Email FROM Roles WHERE username = 'sean.cassidy'";
        $result = $this->query($query);
        foreach($result as $row){
			$_SESSION['role']= $row['role'];
			$_SESSION['dname']= $row['DisplayName'];
			$_SESSION['rid']= $row['rid'];
			$_SESSION['cprsUsername']= $row['cprsUsername'];
			$_SESSION['cprsPass']= $row['cprsPass'];
			$_SESSION['Email']= $row['Email'];
        }		
        
        return $this->query($query);
		     
    }

	function getGlobalSessionVariables() {
		$query = "SELECT * FROM Globals";
		$result = $this->query($query);
		foreach($result as $row){
			$_SESSION['sitelist']= $row['sitelist'];
			$_SESSION['domain'] = $row['domain'];
			$_SESSION['mdws'] = $row['mdws'];
			$_SESSION['vista'] = $row['vista'];
			$_SESSION['sshusr'] = $row['sshusr'];
			$_SESSION['sshpwd'] = $row['sshpwd'];
		}
		
		return $this->query($query);
	}
	
	function checkmdwsconnect($AccessCode,$VerifyCode) {
		$checkstatus = 'Started';
		$sitelist = 101;
		$client = new SoapClient("http://devmdws.vacloud.us/mdws2/EmrSvc.asmx?WSDL");  
		$connect = $client->connect(array('sitelist'=>$sitelist));
		$login = $client->login(array('username'=>$AccessCode,'pwd'=>$VerifyCode,'context'=>''));
		$chklogin = json_encode($login);
		//echo json_encode($login);

		// -----------------------------------------------------------------
		// MWB 5/24/2012 - LEFT Justification of COMS_DEMO_JUN_8 problem is from here...
		//
		// The following commented lines both echo out "nothing" but since they are echoing out HTML tags
		// (which ends up rendering BEFORE the <DOCTYPE> tag) it throws off the normal CSS of the page.
		// We COULD echo out the data ONLY if there's something in the $strreturn and $strreturn2 variables if necessary
		//
		// Also, shouldn't the "$strreturn" variable really be a "$strreturn1" variable?
		
		$str1 = stristr($chklogin, 'Missing');
		$strreturn1 = stristr($str1, '"', true);
		//echo "ST1".$strreturn1."";
		//echo "<center><b>".$strreturn1."</b></center>";//	<----- MWB 5/24/2012 This line (and the one below) are what cause COMS_DEMO_JUN_8 to left justify
		
		$str2 = stristr($chklogin, 'Not');
		$strreturn2 = stristr($str2, '"', true);
		//echo "ST2".$strreturn2."";
		//echo "<center><b>".$strreturn2."</b></center>";//	<----- MWB 5/24/2012 This line (and the one above) are what cause COMS_DEMO_JUN_8 to left justify

		$str3 = stristr($chklogin, 'greeting');
		$strreturn3 = stristr($str3, '"', true);
		//echo "ST3".$strreturn3."";
		
		if ($strreturn1 === 'Not a Valid Access Code'){
		$checkstatus = "Not a Valid Access Code";
		}elseif ($strreturn2 === 'Not a valid ACCESS CODE\/VERIFY CODE pair.'){
		$checkstatus = "Not a Valid Access Code";
		}else{
		$checkstatus = "Success";
		}
		
		//echo $checkstatus;
		
		return $checkstatus;
		
	}
	
function checkAV($AccessCode,$VerifyCode) {
		
		$query = "SELECT * FROM Roles WHERE username = '$AccessCode' AND vcode = '$VerifyCode'";
		$result = $this->query($query);
		foreach($result as $row){
			$DisplayName= $row['DisplayName'];
		}
		$this->query($query);
		
		if ($DisplayName === null){
		$checkstatus = "Failed";
		}else{
		$checkstatus = "Success";
		}
		return $checkstatus;
		
	}
	
}



?>
