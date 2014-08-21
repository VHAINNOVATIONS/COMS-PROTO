<?php
    function varDumpToString( $var ) {
        ob_start();
        var_dump( $var );
        $result = ob_get_clean();
        return $result;
    }
    function mwbEcho( $str ) {
        // echo $str;
    }
    
    $FirstLogin = null;
    $LastLogin  = null;
    $AccessCode = null;
    $VerifyCode = null;
    
    $mwbTemp = "Unknown URI";
    if ( isset( $_GET[ 'url' ] ) ) {
        $mwbTemp = $_GET[ 'url' ];
    }
    error_log( "-------------------------" );
    error_log( "Start Process - $mwbTemp" );
    
    //Include and Set phpseclib path
    //set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib'); <-- Commented on on 30 May 2014
    //Include SSH2 file
    //include('Net/SSH2.php');
    require_once "dbitcon.php";
    require_once "session.php";
    
    //page count per session
    if ( isset( $_SESSION[ 'pgct' ] ) ) {
        $_SESSION[ 'pgct' ] = ( 1 + $_SESSION[ 'pgct' ] );
    } else {
        $_SESSION[ 'pgct' ] = 0;
    }
    
    require_once "NWLogin.php";
    require_once "track.php";
    require_once "/ChromePhp.php";
    $point = "start";
    
    $winauth               = $_SERVER[ 'AUTH_USER' ];
    $_SESSION[ 'winauth' ] = $winauth;
    $ruser                 = $_SERVER[ 'REMOTE_USER' ];
    $_SESSION[ 'ruser' ]   = $ruser;
    
    $_SESSION[ 'BrowserMode' ] = "";
    if ( !empty( $_GET[ 'cmode' ] ) ) {
        $_SESSION[ 'BrowserMode' ] = htmlspecialchars( $_GET[ 'cmode' ] );
    }
    
    if ( isset( $_SESSION[ 'COMSLogin' ] ) ) {
        $COMSLogin = $_SESSION[ 'COMSLogin' ];
    } else {
        $COMSLogin = 0;
    }
    
    if ( isset( $_POST[ 'AccessCode' ] ) ) {
        mwbEcho( "Have ACCESS CODE<br>" );
        
        $_SESSION[ 'AccessCode' ] = $_POST[ 'AccessCode' ];
        $_SESSION[ 'VerifyCode' ] = $_POST[ 'VerifyCode' ];
        $AccessCode               = $_SESSION[ 'AccessCode' ];
        $VerifyCode               = $_SESSION[ 'VerifyCode' ];
        
        $point                  = "Pre Check";
        $NWLoginR               = NWLogin( $_SESSION[ 'AccessCode' ], $_SESSION[ 'VerifyCode' ] );
        $_SESSION[ 'NWLoginR' ] = $NWLoginR;
    } else {
        mwbEcho( "NO Access Code<br>" );
        $point  = "Pre Check";
        $notset = "Not Set";
        PostTrack( $_SESSION[ 'ruser' ], $notset, $point, 0, $_SESSION[ 'sessionid' ] );
    }
    
    mwbEcho( "Credentials - AccessCode = $AccessCode/$VerifyCode<br>" );
    
    mwbEcho( "Get Last Login<br>" );
    $ipcheck        = gethostbyaddr( $_SERVER[ 'REMOTE_ADDR' ] );
    $sessionid      = $_SESSION[ 'sessionid' ];
    $queryLastLogin = "SELECT TOP 1 DATEDIFF (ss,getdate(),DateEntered) as LastLogin
        FROM COMS_Sessions
        WHERE compname = '$ipcheck'
        AND point = 'signed in'
        order by timestamp desc ";
    mwbEcho( "Query - $queryLastLogin<br>" );
    
    $ChkLastLogin = sqlsrv_query( $conn, $queryLastLogin );
    while ( $row = sqlsrv_fetch_array( $ChkLastLogin, SQLSRV_FETCH_ASSOC ) ) {
        $LastLogin = $row[ 'LastLogin' ];
        mwbEcho( "Last Login - $LastLogin<br>" );
    }
    // $LastLogin1 = $LastLogin - ( $LastLogin * 2 ); <-- MOVED below If Check

    if ( $LastLogin === NULL ) {
        $queryFirstLogin = "SELECT TOP 1 DATEDIFF (ss,getdate(),DateEntered) as LastLogin
            FROM COMS_Sessions
            WHERE compname = '$ipcheck'
            AND point = 'Pre Check'
            order by timestamp desc ";
        mwbEcho( "Login === null; Query - $query<br>" );
        
        $ChkFirstLogin = sqlsrv_query( $conn, $queryFirstLogin );
        while ( $row = sqlsrv_fetch_array( $ChkFirstLogin, SQLSRV_FETCH_ASSOC ) ) {
            $FirstLogin = $row[ 'LastLogin' ];
        }
        $FirsLogin1 = $FirstLogin * 3;
    }
    $LastLogin1 = $LastLogin - ( $LastLogin * 2 );
    
    $TimeOutMax = 300;
    $TimeOutMax = 6000;
    $LastLogin1 = $TimeOutMax;
    
    
    if ( $LastLogin1 > $TimeOutMax ) {
        mwbEcho( "Timed Out, Login<br>" );
        // echo "<script>alert('Timed Out, you must login again');</script>";
        include "login.php";
    } elseif ( $FirstLogin === 0 ) {
        mwbEcho( "Not Logged in - Login<br>" );
        // echo "<script>alert('You must login to continue');</script>";
        include "login.php";
    } else {
        mwbEcho( "We are logged in - $LastLogin &lt;= $TimeOutMax<br>" );
        $query   = "SELECT TOP 1 sessionid
            ,timestamp
            ,compname
            ,ref
            ,username
            ,winauth
            ,time
            ,date2
            ,dname
            ,role
            ,rid
            ,sitelist
            ,Role_ID
            ,ruser
            ,Email
            ,NWLoginR
            ,COMSLogin
            ,mdws
            ,AC
            ,VC
            ,DateEntered
            ,DateGood
            FROM COMS_Sessions
            WHERE $LastLogin <= $TimeOutMax
            AND AC != '' 
            AND compname = '$ipcheck' 
            order by timestamp desc ";
        $ChkSesq = sqlsrv_query( $conn, $query );
        mwbEcho( "Logged In Query; Query - $query<br>" );
        
        while ( $row = sqlsrv_fetch_array( $ChkSesq, SQLSRV_FETCH_ASSOC ) ) {
            $compname               = $row[ 'compname' ];
            $AC                     = $row[ 'AC' ];
            $VC                     = $row[ 'VC' ];
            $_SESSION[ 'dname' ]    = $row[ 'dname' ];
            $_SESSION[ 'role' ]     = $row[ 'role' ];
            $_SESSION[ 'rid' ]      = $row[ 'rid' ];
            $_SESSION[ 'sitelist' ] = $row[ 'sitelist' ];
            $_SESSION[ 'Email' ]    = "";
            if ( array_key_exists( 'Email', $row ) ) {
                $_SESSION[ 'Email' ] = $row[ 'Email' ];
            }
            $_SESSION[ 'mdws' ]  = $row[ 'mdws' ];
            $_SESSION[ 'ruser' ] = $row[ 'ruser' ];
            $RowDump             = "compname = $compname<br>
            AC = $AC<br>
            VC = $VC<br>
            _SESSION[ 'dname' ] = " . $_SESSION[ 'dname' ] . "<br>
            _SESSION[ 'role' ] = " . $_SESSION[ 'role' ] . "<br>
            _SESSION[ 'rid' ] = " . $_SESSION[ 'rid' ] . "<br>
            _SESSION[ 'sitelist' ] = " . $_SESSION[ 'sitelist' ] . "<br>
            _SESSION[ 'Email' ] = " . $_SESSION[ 'Email' ] . "<br>";
            
            if ( array_key_exists( 'Email', $row ) ) {
                $RowDump .= "            _SESSION[ 'Email' ] = " . $_SESSION[ 'Email' ] . "<br>";
            }
            $RowDump .= "            _SESSION[ 'mdws' ] = " . $_SESSION[ 'mdws' ] . "<br>
            _SESSION[ 'ruser' ] = " . $_SESSION[ 'ruser' ] . "<br>";
            mwbEcho( "Logged In Row Dump - $RowDump<br>" );
            
        }
        
        $NWLoginR                    = 1;
        $COMSLogin                   = 1;
        $_SESSION[ 'AC' ]            = $AC;
        $_SESSION[ 'VC' ]            = $VC;
        $_SESSION[ 'NWLoginR' ]      = 1;
        $_SESSION[ 'COMSLogin' ]     = 1;
        $_SESSION[ 'sessionStatus' ] = 0;
        
        if ( $compname === $ipcheck ) {
			$tsql = "SELECT role,dname,rid,Email,TemplateAuthoring,Role_ID FROM COMS_Sessions   WHERE compname = '$ipcheck' and Role_ID != ''";
            $getrole = sqlsrv_query( $conn, $tsql );
            $flag    = false;
            mwbEcho( "Get Role Info = $tsql<br>" );
            
            while ( $row = sqlsrv_fetch_array( $getrole, SQLSRV_FETCH_ASSOC ) ) {
                $flag                            = true;
                $_SESSION[ 'role' ]              = $row[ 'role' ];
                $_SESSION[ 'dname' ]             = "";
                if ( array_key_exists( 'DisplayName', $row ) ) {
                    $_SESSION[ 'dname' ]             = $row[ 'DisplayName' ];
                }
                $_SESSION[ 'rid' ]               = $row[ 'rid' ];
                $_SESSION[ 'Email' ]             = $row[ 'Email' ];
                $_SESSION[ 'TemplateAuthoring' ] = $row[ 'TemplateAuthoring' ];
                $_SESSION[ 'Role_ID' ]           = $row[ 'Role_ID' ];
                $_SESSION[ 'AC' ]                = $AccessCode;
                $_SESSION[ 'VC' ]                = $VerifyCode;
                
                $RowDump = "_SESSION[ 'role' ] = " . $_SESSION[ 'role' ] . "<br>
                _SESSION[ 'dname' ] = " . $_SESSION[ 'dname' ] . "<br>
                _SESSION[ 'rid' ] = " . $_SESSION[ 'rid' ] . "<br>
                _SESSION[ 'Email' ] = " . $_SESSION[ 'Email' ] . "<br>
                _SESSION[ 'TemplateAuthoring' ] = " . $_SESSION[ 'TemplateAuthoring' ] . "<br>
                _SESSION[ 'Role_ID' ] = " . $_SESSION[ 'Role_ID' ] . "<br>
                _SESSION[ 'AC' ] = " . $_SESSION[ 'AC' ] . "<br>
                _SESSION[ 'VC' ] = " . $_SESSION[ 'VC' ] . "<br>";
                mwbEcho( "CompNameMatch Row Dump - $RowDump<br>" );
            }
            
            if ( $flag ) {
                mwbEcho( "Have NEW Session Info<br>" );
            } else {
                mwbEcho( "do NOT have NEW Session Info<br>" );
            }
            $globalsq   = "SELECT * FROM Globals";
            $getglobals = sqlsrv_query( $conn, $globalsq );
            while ( $row = sqlsrv_fetch_array( $getglobals, SQLSRV_FETCH_ASSOC ) ) {
                $_SESSION[ 'sitelist' ] = $row[ 'sitelist' ];
                $_SESSION[ 'domain' ]   = $row[ 'domain' ];
                $_SESSION[ 'mdws' ]     = $row[ 'mdws' ];
                $_SESSION[ 'vista' ]    = $row[ 'vista' ];
                $_SESSION[ 'sshusr' ]   = $row[ 'sshusr' ];
                $_SESSION[ 'sshpwd' ]   = $row[ 'sshpwd' ];
                $_SESSION[ 'sshusr2' ]  = $row[ 'sshusr2' ];
            }
            
            $dname    = $_SESSION[ 'dname' ];
            $role     = $_SESSION[ 'role' ];
            $rid      = $_SESSION[ 'rid' ];
            $ruser    = $_SESSION[ 'ruser' ];
            $sitelist = $_SESSION[ 'sitelist' ];
            $Email    = $_SESSION[ 'Email' ];
			$TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
            
            include_once "workflow.php";
            include_once "template.php";
            include_once "NWPatient.php";
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
                $FirstParam = $urlArray[ 0 ];
                $point      = "Logged In";
                //		PostTrack($_SESSION['ruser'],$_SESSION['AC'],$point,3,$_SESSION['sessionid']);
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
                    $point = "urlArray Matched";
                    PostTrack( $_SESSION[ 'ruser' ], $_SESSION[ 'AC' ], $point, 4, $_SESSION[ 'sessionid' ] );
                    $bootstrap_path = ROOT . DS . 'framework' . DS . 'library' . DS . 'bootstrap.php';
                    require_once $bootstrap_path;
            }		
            else {
                    $point             = "No urlArray Matched";
                    //	PostTrack($_SESSION['ruser'],$_SESSION['AC'],$point,5,$_SESSION['sessionid']);
                    $TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
                    $rid               = $_SESSION[ 'rid' ];
                    $role              = $_SESSION[ 'role' ];
                    $page2Open         = $urlArray[ 0 ];
                    include_once "main.php";
                }
		}
		else {
                $point             = "No Url Called";
                //PostTrack($_SESSION['ruser'],$_SESSION['AC'],$point,6,$_SESSION['sessionid']);
                //session_destroy();
                $rid               = $_SESSION[ 'rid' ];
                $role              = $_SESSION[ 'role' ];
                $TemplateAuthoring = $_SESSION[ 'TemplateAuthoring' ];
                $page2Open         = $urlArray[ 0 ];
                include_once "main.php";
            }
        }
    }
?>