<?php
    $FirstLogin = null;
    $LastLogin  = null;
    $AccessCode = null;
    $LoginError = "";

    $_SESSION[ 'USE_NODE' ] = "Test";

    $mwbTemp = "Unknown URI";
    $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    if ( isset( $_GET[ 'url' ] ) ) {
        $mwbTemp = $_GET[ 'url' ];	// Get any URL Query String Parameters
    }
    error_log( "-------------------------" );
    error_log( "Start Process - $mwbTemp" );
    error_log( "Full Path - $actual_link" );

    require_once "dbitcon.php";
    require_once "session.php";
       
    require_once "NWLogin.php";
    require_once "WPN.php";
    require_once "/ChromePhp.php";
    $point                 = "start";
    $winauth               = $_SERVER[ 'AUTH_USER' ];
    $_SESSION[ 'winauth' ] = $winauth;
    $ruser                 = $_SERVER[ 'REMOTE_USER' ];
    $_SESSION[ 'ruser' ]   = $ruser;
    
    if ( !empty( $_GET[ 'cmode' ] ) ) {
        $_SESSION[ 'BrowserMode' ] = htmlspecialchars( $_GET[ 'cmode' ] );
        //$_SESSION['BrowserMode'] = htmlspecialchars($_GET['High']);
    }
    
    if ( isset( $_SESSION[ 'COMSLogin' ] ) ) {
        $COMSLogin = $_SESSION[ 'COMSLogin' ];
    } else {
        $COMSLogin = 0;
    }
    
    if ( isset( $_POST[ 'AccessCode' ] ) ) {
        $_SESSION[ 'AccessCode' ] = $_POST[ 'AccessCode' ];
        $_SESSION[ 'VerifyCode' ] = $_POST[ 'VerifyCode' ];
        $point                    = "Pre Check";
        $NWLoginR                 = NWLogin( $_SESSION[ 'AccessCode' ], $_SESSION[ 'VerifyCode' ] );
        $LoginError               = $NWLoginR;
        $_SESSION[ 'NWLoginR' ]   = $NWLoginR;
    } else {
        $point  = "Pre Check";
        $notset = "Not Set";
    }
    
    if ( array_key_exists("NWLogin", $_SESSION) && $_SESSION[ 'NWLogin' ] === 355 ) {
        
        $ipcheck        = gethostbyaddr( $_SERVER[ 'REMOTE_ADDR' ] );
        $sessionid      = $_SESSION[ 'sessionid' ];
        $TimeOutMax = 300000000;
		$now = microtime(true);
        //$TimeOutMax = 5000;
		$LastLogin = $_SESSION['LoginTime'];
		//echo $LastLogin;
        //$LastLogin1 = $TimeOutMax;
        
        
        if ( $LastLogin1 > $TimeOutMax ) {
        //if ( ($now - $LastLogin) > $TimeOutMax ) {
           $LoginError        = "Session Timeout";
           include "login.php";
        } elseif ( $FirstLogin === 0 ) {
            $LoginError        = "No Previous Login";
            include "login.php";
        } else {
            
            $NWLoginR                    = 1;
            $COMSLogin                   = 1;
            $_SESSION[ 'NWLoginR' ]      = 1;
            $_SESSION[ 'COMSLogin' ]     = 1;
            $_SESSION[ 'sessionStatus' ] = 0;
            
            if ( $ipcheck === $ipcheck ) {
                
                $dname             = $_SESSION[ 'dname' ];
                $role              = $_SESSION[ 'role' ];
                $rid               = $_SESSION[ 'rid' ];
                $ruser             = $_SESSION[ 'ruser' ];
                $sitelist          = $_SESSION[ 'sitelist' ];
                $Email             = $_SESSION[ 'Email' ];
                $TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
                
                include_once "workflow.php";
                include_once "template.php";
                //include_once "NWPatient.php";
                define( 'DS', DIRECTORY_SEPARATOR );
                define( 'ROOT', dirname( dirname( __FILE__ ) ) );
                
                $Version = "js"; // Demo Server version
                // $Version = "js/UAT_18June2012";
                
                // $Deployment = "app-all.js";
                $Deployment   = "app.js";
                $LibsVersion2 = "/libs/ExtJS_4.1RC1";
                $LibsVersion2 = "/libs/ExtJS_4.1.0";
                $LibsVersion2 = "/libs/ExtJS_4.1.0";
                /*
                 * Temporarily modifying the ExtJS library because
                 * a new JS was added into /examples/ux/grid/column in order to display 
                 * a button in the grid. The example/ux directory did not exist 
                 * in ExtJS_4.1RC1
                 */
                
                $LibsVersion = $LibsVersion2; // New Default Library <--- MWB - 6/29/2012 - Old Library Version
                
                $url      = "";
                $urlArray = array( );
                if ( isset( $_GET[ 'url' ] ) ) {
                    $url        = $_GET[ 'url' ];
                    $urlArray   = explode( "/", $url );
                    $ClassName = $urlArray[ 0 ];
                    $point      = "Logged In";
                    // Adjust the if statement below when new classes/controllers are added to the framework
                    $_SESSION[ 'USE_NODE' ] = true;
                    if ( "Patient"             === $ClassName || 
                         "LookUp"              === $ClassName || 
                         "NursingDoc"          === $ClassName || 
                         "Mymdws"              === $ClassName || 
                         "Messages"            === $ClassName || 
                         "Workflow"            === $ClassName || 
                         "Admin"               === $ClassName || 
                         "Session"             === $ClassName || 
                         "Orders"              === $ClassName || 
                         "EndTreatmentSummary" === $ClassName || 
                         "Flowsheet"           === $ClassName || 
                         "Git"                 === $ClassName || 
                         "Reports"             === $ClassName || 
                         "Search"              === $ClassName ||
                         "BSACalc"             === $ClassName
                    ) {
                            $point = "urlArray Matched";
                            $bootstrap_path = ROOT . DS . 'framework' . DS . 'library' . DS . 'bootstrap.php';
                            require_once $bootstrap_path;
                    } else {
                        $point             = "No urlArray Matched";
                        $TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
                        $rid               = $_SESSION[ 'rid' ];
                        $role              = $_SESSION[ 'role' ];
                        $page2Open         = $urlArray[ 0 ];
                        include_once "main.php";
                    }
                } else {
                    $point             = "No Url Called";
                    $rid               = $_SESSION[ 'rid' ];
                    $role              = $_SESSION[ 'role' ];
                    $TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
                    $page2Open         = $urlArray[ 0 ];
                    include_once "main.php";
                }
            }
        }
    } else {
        include "login.php";
    }
?>