<?php	

include "session.php";
//include "session.php";
//To use the Session within the Framework comment out include "session.php" and uncomment next line
//session_start();
//Not sure how to call the framework to get the session variables, below are the framework calls
//https://xxx.dbitpro.com/Session/SessionVars
//https://xxx.dbitpro.com/Session/SessionGlobalVars

//require_once '../PhpConsole/PhpConsole.php';
//PhpConsole::start(true, true, dirname(__FILE__));
// debug('debug message');


require_once "/ChromePhp.php";

	if (empty($_POST)) {
	//	debug('No POST data available');
	}
	else {
		$tempPost = implode($_POST, ", ");

		$AccessCode = $_POST['AccessCode'];
		$VerifyCode = $_POST['VerifyCode'];

	//	debug("Post - ");
	//	debug($tempPost);
	}
	if (array_key_exists ( "AccessCode" , $_POST ) && array_key_exists ( "VerifyCode" , $_POST )) {
	//	debug("Got POST Data");
	}


	if (empty($AccessCode) AND empty($VerifyCode)) {
	}
	elseif (empty($AccessCode)){
		echo "<center><b>Missing account ID</center></b>";
	}
	elseif(empty($VerifyCode)){
		echo "<center><b>Missing Verify Code</center></b>";
	}
	else{
		//echo "check account";
		$chkacctret =  chkacct($AccessCode);
		$veracctret =  veracct($VerifyCode);

		$mdwscheck = checkmdwsconnect($AccessCode,$VerifyCode);
		//echo $mdwscheck;

		if ($chkacctret === $AccessCode){
			if ($veracctret === $VerifyCode){
				$_SESSION['sessionStatus'] = 0;
				//$serverName = "DBITDATA\DBIT";
				//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
				//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
				include "dbitcon.php";
				$tsql = "SELECT * FROM Roles WHERE username = '$AccessCode'";
				$getrole = sqlsrv_query($conn, $tsql);
				$chktrack = 0;
				$_SESSION['chktrack'] = $chktrack;

				while($row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC)) {
					$_SESSION['role']= $row['role'];
					$_SESSION['dname']= $row['DisplayName'];
					$_SESSION['rid']= $row['rid'];
					$_SESSION['cprsUsername']= $row['cprsUsername'];
					$_SESSION['cprsPass']= $row['cprsPass'];
					$_SESSION['Email']= $row['Email'];
					$_SESSION['TemplateAuthoring']= $row['TemplateAuthoring'];
					$_SESSION['Role_ID']= $row['Role_ID'];
				}

				$globalsq = "SELECT * FROM Globals";
				$getglobals = sqlsrv_query($conn, $globalsq);
				while( $row = sqlsrv_fetch_array($getglobals, SQLSRV_FETCH_ASSOC)) {
					$_SESSION['sitelist']= $row['sitelist'];
					$_SESSION['domain'] = $row['domain'];
				}
		
				if ($_SESSION['chktrack'] != 1){
					$serverName = "DBITDATA\DBIT";
					$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_Tracking");
					$conn =  sqlsrv_connect( $serverName, $connectionOptions);

					function curPageName() {
						return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
					}
			
					//GetID
					$tsql2 = "SELECT id FROM COMS_Track ORDER BY id";
					$getid = sqlsrv_query($conn, $tsql2);
					while( $row = sqlsrv_fetch_array($getid, SQLSRV_FETCH_ASSOC)) {
						$newid = $row['id'] + 1;
					}
	
					//Set Variables
					$ip_vistor=$_SERVER['REMOTE_ADDR'];
					$compname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
					$page = curPageName();
					$url = (!empty($_SERVER['HTTPS'])) ? "https://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] : "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
					//Insert into SQL
					$tsql = "INSERT INTO COMS_Track (id,ip,compname,ref,username) VALUES ($newid,'$ip_vistor','$compname','$url','$AccessCode')";
					$posttrack = sqlsrv_query($conn, $tsql);
					//Set Session Variable
					$_SESSION['chktrack']=1;
				}
				
				//$To = 'dbitpro@gmail.com,lferrucci@caci.com';
				$To = 'dbitpro@gmail.com';
				$MFrom = 'dbitpro@gmail.com';
				$Subject = "User accessing COMS UAT Testing Site (coms-uat-test)";
				$message = "A user has logged into the application: ".$AccessCode."";
				$headers = "From: <do_not_reply@dbitpro.com>\r\n";
				$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
				$headers .= "MIME-Version: 1.0\r\n";
				$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
				if ($AccessCode != '1programmer'){
				//mail($To, $Subject, $message, $headers);
				}
			}
		}
		if ($AccessCode === '1pharmacist'
			|| $AccessCode === '2pharmacist'
			|| $AccessCode === '3pharmacist'
			|| $AccessCode === '4pharmacist'
			|| $AccessCode === '5pharmacist'
			|| $AccessCode === '6pharmacist'
			|| $AccessCode === '7pharmacist'
			|| $AccessCode === '8pharmacist'
			|| $AccessCode === '9pharmacist'
			|| $AccessCode === '10pharmacist'
			|| $AccessCode === '1provider'
			|| $AccessCode === '2provider'
			|| $AccessCode === '3provider'
			|| $AccessCode === '4provider'
			|| $AccessCode === '5provider'
			|| $AccessCode === '6provider'
			|| $AccessCode === '7provider'
			|| $AccessCode === '8provider'
			|| $AccessCode === '9provider'
			|| $AccessCode === '10provider'
			|| $AccessCode === '1nurse' 
			|| $AccessCode === '2nurse' 
			|| $AccessCode === '3nurse' 
			|| $AccessCode === '4nurse' 
			|| $AccessCode === '5nurse' 
			|| $AccessCode === '6nurse' 
			|| $AccessCode === '7nurse' 
			|| $AccessCode === '8nurse' 
			|| $AccessCode === '9nurse'
			|| $AccessCode === '10nurse'){
				//Begin Debug of login errors
				//echo "<br><center>";
				//echo "Sorry, Login error, please click <a href='https://".$_SESSION['domain']."'>here</a> to continue";
				//echo "<br>".$AccessCode."";
				//echo "</center>";
				//End debug
				$_SESSION['sessionStatus'] = 0;
				//$serverName = "DBITDATA\DBIT";
				//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
				//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
				include "dbitcon.php";
				$tsql = "SELECT * FROM Roles WHERE username = '".$AccessCode."'";
				$getrole = sqlsrv_query($conn, $tsql);
				$chktrack = 0;
				$_SESSION['chktrack'] = $chktrack;

				while($row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC)) {
					$_SESSION['role']= $row['role'];
					$_SESSION['dname']= $row['DisplayName'];
					$_SESSION['rid']= $row['rid'];
					$_SESSION['cprsUsername']= $row['cprsUsername'];
					$_SESSION['cprsPass']= $row['cprsPass'];
					$_SESSION['Email']= $row['Email'];
					$_SESSION['TemplateAuthoring']= $row['TemplateAuthoring'];
					$_SESSION['Role_ID']= $row['Role_ID'];
				}

				$globalsq = "SELECT * FROM Globals";
				$getglobals = sqlsrv_query($conn, $globalsq);
				while( $row = sqlsrv_fetch_array($getglobals, SQLSRV_FETCH_ASSOC)) {
					$_SESSION['sitelist']= $row['sitelist'];
					$_SESSION['domain'] = $row['domain'];
				}
		
		
				if ($_SESSION['chktrack'] != 1){
					$serverName = "DBITDATA\DBIT";
					$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_Tracking");
					$conn =  sqlsrv_connect( $serverName, $connectionOptions);
					//include "dbitcon.php";

					function curPageName() {
						return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
					}
			
					//GetID
					$tsql2 = "SELECT id FROM COMS_Track ORDER BY id";
					$getid = sqlsrv_query($conn, $tsql2);
					while( $row = sqlsrv_fetch_array($getid, SQLSRV_FETCH_ASSOC)) {
						$newid = $row['id'] + 1;
					}
	
					//Set Variables
					$ip_vistor=$_SERVER['REMOTE_ADDR'];
					$compname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
					$page = curPageName();
					$url = (!empty($_SERVER['HTTPS'])) ? "https://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] : "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
					//Insert into SQL
					$tsql = "INSERT INTO COMS_Track (id,ip,compname,ref,username) VALUES ($newid,'$ip_vistor','$compname','$url','$AccessCode')";
					$posttrack = sqlsrv_query($conn, $tsql);
					//Set Session Variable
					$_SESSION['chktrack']=1;
				}
				
				//$To = 'dbitpro@gmail.com,lferrucci@caci.com';
				$To = 'dbitpro@gmail.com';
				$MFrom = 'dbitpro@gmail.com';
				$Subject = "User accessing COMS UAT Testing Site (coms-uat)";
				$message = "A user has logged into the application: ".$AccessCode."";
				$headers = "From: <do_not_reply@dbitpro.com>\r\n";
				$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
				$headers .= "MIME-Version: 1.0\r\n";
				$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
				//mail($To, $Subject, $message, $headers);

		}
	}








	if ( empty( $_SESSION[ 'role' ] ) ) {
		include "login.php";
	}
	else {
		if ( isset( $_POST[ 'logout' ] ) ) {
				sessionkill();
		}

		include_once "workflow.php";
		include_once "template.php";
		include_once "NWPatient.php";
		define( 'DS', DIRECTORY_SEPARATOR );
		define( 'ROOT', dirname( dirname( __FILE__ ) ) );

		$url = "";
		$urlArray = array();
		if (isset($_GET[ 'url' ])) {
			$url = $_GET[ 'url' ];
			$urlArray = explode( "/", $url );
		}

		$Version = "js"; // Demo Server version
		$Version = "js/UAT_18June2012";

		// $Deployment = "app-all.js";
		$Deployment = "app.js";
		$LibsVersion2 = "/libs/ExtJS_4.1RC1";


		/*
		 * Temporarily modifying the ExtJS library because
		 * a new JS was added into /examples/ux/grid/column in order to display 
		 * a button in the grid. The example/ux directory did not exist 
		 * in ExtJS_4.1RC1
		 */
		
		$LibsVersion = $LibsVersion2; // New Default Library <--- MWB - 6/29/2012 - Old Library Version
		$FirstParam = $urlArray[ 0 ];

		// Adjust the if statement below when new classes are added to the framework
		if ( "Patient" === $urlArray[ 0 ] || 
			"LookUp" === $urlArray[ 0 ] || 
			"NursingDoc" === $urlArray[ 0 ] || 
			"Mymdws" === $urlArray[ 0 ] || 
			"Messages" === $urlArray[ 0 ] || 
			"Workflow" === $urlArray[ 0 ] || 
			"Admin" === $urlArray[ 0 ] || 
			"Session" === $urlArray[ 0 ] || 
			"Orders" === $urlArray[ 0 ] || 
			"EndTreatmentSummary" === $urlArray[ 0 ] || 
			"Flowsheet" === $urlArray[ 0 ] || 
			"Search" === $urlArray[ 0 ] ) {
				$bootstrap_path = ROOT . DS . 'framework' . DS . 'library' . DS . 'bootstrap.php';
				require_once $bootstrap_path;
		}		
		else {
			$user     = $_SERVER[ 'LOGON_USER' ];
			$authtype = $_SERVER[ 'AUTH_TYPE' ];
			$rid      = $_SESSION[ 'rid' ];
			$role     = $_SESSION[ 'role' ];
			$sessionUser = $_SESSION[ "dname" ];
			$TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];

			include_once "main.php";
		}
	}
?>