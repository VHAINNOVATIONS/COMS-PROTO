<?php	
//echo "*** COMS Test Site ***";
//Include and Set phpseclib path
set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
//Include SSH2 file
include('Net/SSH2.php');
include "dbitcon.php";
include "session.php";
include "NWLogin.php";
include "track.php";
require_once "/ChromePhp.php";
$_SESSION['sessionid'] = session_id();
$sessionid = $_SESSION['sessionid'];
$AccessCode = $_POST['AccessCode'];
$VerifyCode = $_POST['VerifyCode'];
$winauth = $_SERVER['AUTH_USER'];
$_SESSION['winauth']= $winauth;
$ruser = $_SERVER['REMOTE_USER'];
$_SESSION['ruser']= $ruser;
$COMSLogin = $_SESSION['COMSLogin'];
$point = "Pre Check";
// PostTrack($ruser,$AccessCode,$point,$pointno,$sessionid);
// $NWLoginR = NWLogin($AccessCode,$VerifyCode);
$_SESSION['NWLoginR'] = $NWLoginR;
		if ($NWLoginR === 1){
			PostTrack($ruser,$AccessCode,$point,1,$sessionid);
			
			$_SESSION['sessionStatus'] = 0;
			$_SESSION['AccessCode']= $AccessCode;
			$_SESSION['cprsUsername']= $AccessCode;
			
			$tsql = "SELECT * FROM Roles WHERE username = '$AccessCode'";
			$getrole = sqlsrv_query($conn, $tsql);
				while($row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC)) {
					$_SESSION['role']= $row['role'];
					$_SESSION['dname']= $row['DisplayName'];
					$_SESSION['rid']= $row['rid'];
					$_SESSION['cprsPass']= $VerifyCode;
					$_SESSION['VerifyCode']= $VerifyCode;
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
					$point = "signed in";
					$pointno = 99;
					PostTrack($ruser,$AccessCode,$point,$pointno,$sessionid);
				}
		
		if ( empty( $_SESSION[ 'role' ] ) ) {        
		include "login.php";
		}
		else{
		include_once "workflow.php";
		include_once "template.php";
		include_once "NWPatient.php";
			//include "NWPatient.php";
				define( 'DS', DIRECTORY_SEPARATOR );
				define( 'ROOT', dirname( dirname( __FILE__ ) ) );


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

		$url = "";
		$urlArray = array();
		if (isset($_GET[ 'url' ])) {
			$url = $_GET[ 'url' ];
			$urlArray = explode( "/", $url );
            $FirstParam = $urlArray[ 0 ];
			PostTrack($ruser,$AccessCode,$point,3,$sessionid);
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
                "Git" === $urlArray[ 0 ] || 
                "Search" === $urlArray[ 0 ] ) {
				PostTrack($ruser,$AccessCode,$point,4,$sessionid);
                    $bootstrap_path = ROOT . DS . 'framework' . DS . 'library' . DS . 'bootstrap.php';
                    require_once $bootstrap_path;
            }		
            else {
				PostTrack($ruser,$AccessCode,$point,5,$sessionid);
                $TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
				$rid = $_SESSION[ 'rid' ];
                $role = $_SESSION[ 'role' ];
				include_once "main.php";
				
                //include "main.php";
            }
		}
		else {
			PostTrack($ruser,$AccessCode,$point,6,$sessionid);
			//session_destroy();
			$rid = $_SESSION[ 'rid' ];
            $role = $_SESSION[ 'role' ];
			$TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
            include_once "main.php";
            //include "main.php";
		}

}

?>