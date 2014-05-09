<?php
session_start();
$username = get_current_user();
$_SESSION['chktrack']= 1;
$_SESSION['sessionid'] = session_id();
$sessionid = $_SESSION['sessionid'];

/*function getSV(){

include "dbitcon.php";
//$tsql = "SELECT * FROM Roles WHERE username = '$username'";
//$getrole = sqlsrv_query($conn, $tsql);
$chktrack = 0;
$_SESSION['chktrack'] = $chktrack;
//$_SESSION['AccessCode']= $AccessCode;
//$_SESSION['VerifyCode']= $VerifyCode;

//while( $row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC))
//{
//$_SESSION['role']= $row['role'];
//$_SESSION['dname']= $row['DisplayName'];
//$_SESSION['rid']= $row['rid'];
//$_SESSION['cprsUsername']= $row['cprsUsername'];
//$_SESSION['cprsPass']= $row['cprsPass'];
//$_SESSION['Email']= $row['Email'];
//$_SESSION['Role_ID']= $row['Role_ID'];
//}

$globalsq = "SELECT sitelist, domain, mdws FROM Globals";
$getglobals = sqlsrv_query($conn, $globalsq);
while( $row = sqlsrv_fetch_array($getglobals, SQLSRV_FETCH_ASSOC))
{
$_SESSION['sitelist']= $row['sitelist'];
$_SESSION['domain'] = $row['domain'];
$_SESSION['mdws'] = $row['mdws'];
}


}
*/
function checkmdwsconnect($AccessCode,$VerifyCode) {
$sitelist = 901;
$client = new SoapClient("http://mdws.vacloud.us/mdws2/EmrSvc.asmx?WSDL");  
$connect = $client->connect(array('sitelist'=>$sitelist));
$login = $client->login(array('username'=>$AccessCode,'pwd'=>$VerifyCode,'context'=>''));
$chklogin = json_encode($login);

$str1 = stristr($chklogin, 'Missing');
$strreturn1 = stristr($str1, '"', true);

$str2 = stristr($chklogin, 'Not');
$strreturn2 = stristr($str2, '"', true);

}

function sessionkill(){
     session_unset();
    session_destroy();
    session_write_close();
    setcookie(session_name(),'',0,'/');
    session_regenerate_id(true);
	header("location:login.php");

}
?>