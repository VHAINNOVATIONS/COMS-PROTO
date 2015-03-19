<?php
    function NWLogin( $AccessCode, $VerifyCode ) {
        include "dbitcon.php";
        $point = "NWlogin";
        PostTrack( $_SESSION[ 'ruser' ], $AccessCode, $point, 1, $_SESSION[ 'sessionid' ] );
        $ruser                       = $_SERVER[ 'REMOTE_USER' ];
        $_SESSION[ 'sessionStatus' ] = 0;
        
        $tsql    = "SELECT role,DisplayName,rid,Email,TemplateAuthoring,Role_ID FROM Roles WHERE username = '$AccessCode' AND vcode = '$VerifyCode'";
        $getrole = sqlsrv_query( $conn, $tsql );
        while ( $row = sqlsrv_fetch_array( $getrole, SQLSRV_FETCH_ASSOC ) ) {
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
        $usql       = "Update Roles set Last_SessionID = '" . $_SESSION[ 'sessionid' ] . "' where username = '$AccessCode'";
        $updateRole = sqlsrv_query( $conn, $usql );
        $point      = "signed in";
        PostTrack( $_SESSION[ 'ruser' ], $_SESSION[ 'AC' ], $point, 99, $_SESSION[ 'sessionid' ] );
        $NWLoginR                = 1;
        $_SESSION[ 'COMSLogin' ] = 1;
        return $NWLoginR;
    }
    
?>