<?php

$mwbTemp = "Unknown URI";
if (isset($_GET[ 'url' ])) {
    $mwbTemp = $_GET[ 'url' ];
}
error_log("-------------------------");
error_log("Start Process - $mwbTemp");


//echo "*** COMS Test Site ***";
//Include and Set phpseclib path
set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
//Include SSH2 file
require_once "Net/SSH2.php";
require_once "dbitcon.php";
require_once "session.php";
require_once "NWLogin.php";
require_once "track.php";
require_once "/ChromePhp.php";
$winauth = $_SERVER['AUTH_USER'];
$_SESSION['winauth']= $winauth;
$ruser = $_SERVER['REMOTE_USER'];
$_SESSION['ruser']= $ruser;
$COMSLogin = $_SESSION['COMSLogin'];
$point = "Pre Check";

if (isset($_POST['AccessCode'])) {
    PostTrack($_SESSION['ruser'],$_POST['AccessCode'],$point,0,$_SESSION['sessionid']);
}
else {
    PostTrack($_SESSION['ruser'],"Unk",$point,0,$_SESSION['sessionid']);
}
if (empty( $_SESSION[$COMSLogin])){
    if (isset($_POST['AccessCode'])) {
        $AccessCode = $_POST['AccessCode'];
        $_SESSION['AccessCode'] = $_POST['AccessCode'];
        $_SESSION['cprsUsername'] = $_POST['AccessCode'];
    }
    if (isset($_POST['VerifyCode'])) {
        $VerifyCode = $_POST['VerifyCode'];
        $_SESSION['cprsPass'] = $_POST['VerifyCode'];
        $_SESSION['VerifyCode'] = $_POST['VerifyCode'];
    }
    if (isset($VerifyCode) && isset($AccessCode)) {
        $NWLoginR = NWLogin($AccessCode,$VerifyCode);
    }
    else {
        $NWLoginR = NWLogin("", "");
    }
}

$_SESSION['NWLoginR'] = $NWLoginR;
		if ($NWLoginR === 1){	
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
		// $Version = "js/UAT_18June2012";

		// $Deployment = "app-all.js";
		$Deployment = "app.js";
		$LibsVersion2 = "/libs/ExtJS_4.1RC1";
		$LibsVersion2 = "/libs/ExtJS_4.1.0";
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
			PostTrack($_SESSION['ruser'],$_SESSION['AccessCode'],$point,3,$_SESSION['sessionid']);
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
				PostTrack($_SESSION['ruser'],$AccessCode,$point,4,$_SESSION['sessionid']);
                    $bootstrap_path = ROOT . DS . 'framework' . DS . 'library' . DS . 'bootstrap.php';
                    require_once $bootstrap_path;
            }		
            else {
				PostTrack($_SESSION['ruser'],$_SESSION['AccessCode'],$point,5,$_SESSION['sessionid']);
                $TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
				$rid = $_SESSION[ 'rid' ];
                $role = $_SESSION[ 'role' ];
                $page2Open = $urlArray[ 0 ];
				include_once "main.php";
            }
		}
		else {
			PostTrack($_SESSION['ruser'],$_SESSION['AccessCode'],$point,6,$_SESSION['sessionid']);
			//session_destroy();
			$rid = $_SESSION[ 'rid' ];
            $role = $_SESSION[ 'role' ];
			$TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
            $page2Open = $urlArray[ 0 ];
            include_once "main.php";
		}

}

?>