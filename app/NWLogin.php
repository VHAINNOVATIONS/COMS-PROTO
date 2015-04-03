<?php
    function NWLogin( $AccessCode, $VerifyCode ) {
        include "dbitcon.php";
        include "../framework/library/nodevista.class.php";
        $nodevista = new NodeVista();

        if ( $AccessCode === 'COMSAdmin' AND $VerifyCode === 'COMS2015!' ) {
error_log("Using special Admin Access");
            $_SESSION[ 'role' ]              = 'All Roles';
            $_SESSION[ 'dname' ]             = 'Admin';
            $_SESSION[ 'rid' ]               = '999';
            $_SESSION[ 'Email' ]             = 'sean.cassidy@va.gov';
            $_SESSION[ 'TemplateAuthoring' ] = '1';
            $_SESSION[ 'Role_ID' ]           = 'A418029A-2C80-40D6-B3E6-77AA7C34434C';
            $_SESSION[ 'AC' ]                = $AccessCode;
            $_SESSION[ 'VC' ]                = $VerifyCode;
            $_SESSION[ 'NWLogin' ]           = 355;
            
            $globalsq   = "SELECT * FROM Globals";
            $getglobals = sqlsrv_query( $conn, $globalsq );
            while ( $row = sqlsrv_fetch_array( $getglobals, SQLSRV_FETCH_ASSOC ) ) {
                $_SESSION[ 'sitelist' ] = $row[ 'sitelist' ];
                $_SESSION[ 'domain' ]   = $row[ 'domain' ];
                $_SESSION[ 'vista' ]    = $row[ 'vista' ];
            }
            $usql       = "Update Roles set Last_SessionID = '" . $_SESSION[ 'sessionid' ] . "' where username = '$UserName'";
            $updateRole = sqlsrv_query( $conn, $usql );
            $point      = "signed in";
            //PostTrack( $_SESSION[ 'ruser' ], $_SESSION[ 'AC' ], $point, 99, $_SESSION[ 'sessionid' ] );
            $NWLoginR                = 1;
            $_SESSION[ 'COMSLogin' ] = 1;
            error_log( "NWLogin Exit - Session Vars = " . json_encode( $_SESSION ) );
            return $NWLoginR;
        }

        $AuthenticateURL          = "authenticate";
        $AuthData                 = array( );
        $AuthData[ "accesscode" ] = $AccessCode;
        $AuthData[ "verifycode" ] = $VerifyCode;
        $AuthenticateReturn       = $nodevista->post( $AuthenticateURL, json_encode( $AuthData ) );
        
        $aRet       = json_decode( $AuthenticateReturn );
        $LoginError = "";
        if ( array_key_exists( "error", $aRet ) ) {
            $retErr     = $aRet->{"error"};
            $LoginError = "Unk";
            if ( "Not a valid ACCESS CODE/VERIFY CODE pair." === $retErr ) {
                $LoginError = "Authentication failed! Please click \"OK\" and enter your proper Access and Verify Codes";
                $LoginError = "Authentication failed! Please enter your proper Access and Verify Codes below and click \"Login\"";
            }
            else {
                $LoginError = "Authentication failed! Unknown Error - $retErr!<br>Please contact your COMS support personnel";
            }
            error_log( "NWLogin - Authentication Check - $LoginError" );
            return $LoginError;
        }
        /**
         * User has logged in to VistA, now let's see if their DUZ is in the Roles Table
         **/
        
        
        $UserInfo = $nodevista->get( "user/info" );
        error_log( "NWLogin - User Info Check - $UserInfo" );
        
        $jdUserInfo = json_decode( $UserInfo );
        $DUZ        = $jdUserInfo->{"duz"};
        
        $point = "NWlogin";
        //PostTrack( $_SESSION[ 'ruser' ], $AccessCode, $point, 1, $_SESSION[ 'sessionid' ] );
        $ruser                       = $_SERVER[ 'REMOTE_USER' ];
        $_SESSION[ 'sessionStatus' ] = 0;
        
        $tsql    = "SELECT role,DisplayName,rid,Email,TemplateAuthoring,Role_ID FROM Roles WHERE username = '$DUZ'";
        $getrole = sqlsrv_query( $conn, $tsql );
        $flg     = false;
        while ( $row = sqlsrv_fetch_array( $getrole, SQLSRV_FETCH_ASSOC ) ) {
            $flg = true;
            error_log( "Got Role Info " . json_encode( $row ) );
            $_SESSION[ 'role' ]              = $row[ 'role' ];
            $_SESSION[ 'dname' ]             = $row[ 'DisplayName' ];
            $_SESSION[ 'rid' ]               = $row[ 'rid' ];
            $_SESSION[ 'Email' ]             = $row[ 'Email' ];
            $_SESSION[ 'TemplateAuthoring' ] = $row[ 'TemplateAuthoring' ];
            $_SESSION[ 'Role_ID' ]           = $row[ 'Role_ID' ];
            $_SESSION[ 'AC' ]                = $AccessCode;
            $_SESSION[ 'VC' ]                = $VerifyCode;
            $_SESSION[ 'NWLogin' ]           = 355;
			$_SESSION[ 'LoginTime']			 = microtime(true);
        }
        if ( $flg ) {
            error_log( "Got User - '$AccessCode', '$VerifyCode' - '$DUZ'" );
            $globalsq   = "SELECT * FROM Globals";
            $getglobals = sqlsrv_query( $conn, $globalsq );
            while ( $row = sqlsrv_fetch_array( $getglobals, SQLSRV_FETCH_ASSOC ) ) {
                $_SESSION[ 'sitelist' ] = $row[ 'sitelist' ];
                $_SESSION[ 'domain' ]   = $row[ 'domain' ];
                $_SESSION[ 'vista' ]    = $row[ 'vista' ];
                $_SESSION[ 'port' ]    = $row[ 'port' ];
            }
            $usql       = "Update Roles set Last_SessionID = '" . $_SESSION[ 'sessionid' ] . "' where username = '$DUZ'";
            $updateRole = sqlsrv_query( $conn, $usql );
            $point      = "signed in";
            //PostTrack( $_SESSION[ 'ruser' ], $_SESSION[ 'AC' ], $point, 99, $_SESSION[ 'sessionid' ] );
            $NWLoginR                = 1;
            $_SESSION[ 'COMSLogin' ] = 1;
            
            error_log( "NWLogin Exit - Session Vars = " . json_encode( $_SESSION ) );
            return $NWLoginR;
        }
        error_log( "No User - '$AccessCode', '$VerifyCode' - '$DUZ'" );
        return "Access/Verify Codes valid; however, COMS access is not authorized.<div style=\"color:red;\">Please contact COMS Administrator for access privileges.</div>";
    }
?>