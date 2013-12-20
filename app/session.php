<?php
session_start();
$username = get_current_user();
//$_SESSION['sessionStatus']= 0;
$_SESSION['chktrack']= 1;

function chkacct($AccessCode){
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";
$tsql = "SELECT cprsUsername FROM Roles WHERE cprsUsername = '$AccessCode'";
$getrole = sqlsrv_query($conn, $tsql);
$chktrack = 0;
while( $row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC))
{
$cprsUsernamechk = $row['cprsUsername'];
}
//echo "cprsUsernamechk: ".$cprsUsernamechk."";

return $cprsUsernamechk;
}

function veracct($VerifyCode){
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";
$tsql = "SELECT cprsPass FROM Roles WHERE cprsPass = '$VerifyCode'";
$getrole = sqlsrv_query($conn, $tsql);
$chktrack = 0;
while( $row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC))
{
$cprsPasschk = $row['cprsPass'];
}
//echo "cprsUsernamechk: ".$cprsUsernamechk."";

return $cprsPasschk;
}

function getSV(){
//if (empty($_SESSION['role'])) {
//if ($SESSION['sessionStatus'] = 0){
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";
$tsql = "SELECT * FROM Roles WHERE username = '$username'";
$getrole = sqlsrv_query($conn, $tsql);
$chktrack = 0;
$_SESSION['chktrack'] = $chktrack;

//$_SESSION['sessionStatus']= 0;


while( $row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC))
{
$_SESSION['role']= $row['role'];
$_SESSION['dname']= $row['DisplayName'];
$_SESSION['rid']= $row['rid'];
$_SESSION['cprsUsername']= $row['cprsUsername'];
$_SESSION['cprsPass']= $row['cprsPass'];
//$_SESSION['sitelist']= $row['sitelist'];
$_SESSION['Email']= $row['Email'];
$_SESSION['Role_ID']= $row['Role_ID'];
//$_SESSION['DFN']= $row['DFN'];
//$_SESSION['domain'] = $row['domain'];
}

$globalsq = "SELECT * FROM Globals";
$getglobals = sqlsrv_query($conn, $globalsq);
while( $row = sqlsrv_fetch_array($getglobals, SQLSRV_FETCH_ASSOC))
{
$_SESSION['sitelist']= $row['sitelist'];
$_SESSION['domain'] = $row['domain'];
}
//}

}

/*
// User Tracking, Check Session
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
while( $row = sqlsrv_fetch_array($getid, SQLSRV_FETCH_ASSOC))
{
$newid = $row['id'] + 1;
}
//Set Variables
$ip_vistor=$_SERVER['REMOTE_ADDR'];
$compname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
$page = curPageName();
$url = (!empty($_SERVER['HTTPS'])) ? "https://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] : "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
//Insert into SQL
$tsql = "INSERT INTO COMS_Track (id,ip,compname,ref,username) VALUES ($newid,'$ip_vistor','$compname','$url','$username')";
$posttrack = sqlsrv_query($conn, $tsql);
//Set Session Variable
$_SESSION['chktrack']=1;
}
*/

function checkmdwsconnect($AccessCode,$VerifyCode) {
$sitelist = 901;
$client = new SoapClient("http://mdws.vacloud.us/mdws2/EmrSvc.asmx?WSDL");  
$connect = $client->connect(array('sitelist'=>$sitelist));
$login = $client->login(array('username'=>$AccessCode,'pwd'=>$VerifyCode,'context'=>''));
$chklogin = json_encode($login);
//echo json_encode($login);

// -----------------------------------------------------------------
// MWB 5/24/2012 - LEFT Justification of COMS problem is from here...
//
// The following commented lines both echo out "nothing" but since they are echoing out HTML tags
// (which ends up rendering BEFORE the <DOCTYPE> tag) it throws off the normal CSS of the page.
// We COULD echo out the data ONLY if there's something in the $strreturn and $strreturn2 variables if necessary
//
// Also, shouldn't the "$strreturn" variable really be a "$strreturn1" variable?
$str1 = stristr($chklogin, 'Missing');
$strreturn1 = stristr($str1, '"', true);
//echo "<center><b>".$strreturn1."</b></center>";	<----- MWB 5/24/2012 This line (and the one below) are what cause COMS to left justify

$str2 = stristr($chklogin, 'Not');
$strreturn2 = stristr($str2, '"', true);
//echo "<center><b>".$strreturn2."</b></center>";	<----- MWB 5/24/2012 This line (and the one above) are what cause COMS to left justify

}

function sessionkill(){
	session_unset();
	session_destroy();
	session_write_close();
	setcookie(session_name(),'',0,'/');
	session_regenerate_id(true);
	header("location:/login.php");
}

// Close the connection.
//sqlsrv_close( $conn );
?>