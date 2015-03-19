<?php
    function NWLogin( $AccessCode, $VerifyCode ) {
        include "dbitcon.php";
        include "../framework/library/nodevista.class.php";

        $nodevista  = new NodeVista();
        $UserInfo   = $nodevista->get( "user/info" );
        $jdUserInfo = json_decode( $UserInfo );
        $UserName   = $jdUserInfo->{"duz"};

        $point = "NWlogin";
        PostTrack( $_SESSION[ 'ruser' ], $AccessCode, $point, 1, $_SESSION[ 'sessionid' ] );
        $ruser                       = $_SERVER[ 'REMOTE_USER' ];
        $_SESSION[ 'sessionStatus' ] = 0;

        $tsql    = "SELECT role,DisplayName,rid,Email,TemplateAuthoring,Role_ID FROM Roles WHERE username = '$UserName'";
        $getrole = sqlsrv_query( $conn, $tsql );
        $flg = false;
        while ( $row = sqlsrv_fetch_array( $getrole, SQLSRV_FETCH_ASSOC ) ) {
            $flg = true;
            error_log("Got Role Info " . json_encode($row));
            $_SESSION[ 'role' ]              = $row[ 'role' ];
            $_SESSION[ 'dname' ]             = $row[ 'DisplayName' ];
            $_SESSION[ 'rid' ]               = $row[ 'rid' ];
            $_SESSION[ 'Email' ]             = $row[ 'Email' ];
            $_SESSION[ 'TemplateAuthoring' ] = $row[ 'TemplateAuthoring' ];
            $_SESSION[ 'Role_ID' ]           = $row[ 'Role_ID' ];
            $_SESSION[ 'AC' ]                = $AccessCode;
            $_SESSION[ 'VC' ]                = $VerifyCode;
            $_SESSION[ 'NWLogin' ]           = 355;
        }
        if ($flg) { 
            error_log("Got User - '$AccessCode', '$VerifyCode'");
        }
        else {
            error_log("No User - '$AccessCode', '$VerifyCode'");
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
        $usql       = "Update Roles set Last_SessionID = '" . $_SESSION[ 'sessionid' ] . "' where username = '$UserName'";
        $updateRole = sqlsrv_query( $conn, $usql );
        $point      = "signed in";
        PostTrack( $_SESSION[ 'ruser' ], $_SESSION[ 'AC' ], $point, 99, $_SESSION[ 'sessionid' ] );
        $NWLoginR                = 1;
        $_SESSION[ 'COMSLogin' ] = 1;

        error_log("NWLogin Exit - Session Vars = " . json_encode($_SESSION));
        return $NWLoginR;
    }
?>