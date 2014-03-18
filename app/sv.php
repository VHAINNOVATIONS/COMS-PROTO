<?php
include "session.php";
$_SESSION['sessionid'] = session_id();
echo "SessionID: ".session_id()."<br>";
echo "chkTrack: ".$_SESSION['chktrack']."<br>";
echo "Display Name: ".$_SESSION['dname']."<br>";
echo "Role: ".$_SESSION['role']."<br>";
echo "Role ID: ".$_SESSION['rid']."<br>";
echo "CPRS Username: ".$_SESSION['cprsUsername']."<br>";
echo "CPRS Pass: ".$_SESSION['cprsPass']."<br>";
echo "Sitelist: ".$_SESSION['sitelist']."<br>";
echo "Email: ".$_SESSION['Email']."<br>";
echo "DFN: ".$_SESSION['DFN']."<br>";
echo "Domain: ".$_SESSION['domain']."<br>";
echo "Session Status: ".$_SESSION['sessionStatus']."<br>";
echo "TemplateAuthoring: ".$_SESSION['TemplateAuthoring']."<br>";
echo "Role_ID: ".$_SESSION['Role_ID']."<br>";
echo "AccessCode: ".$_SESSION['AccessCode']."<br>";
echo "VerifyCode: ".$_SESSION['VerifyCode']."<br>";
echo "ip_vistor: ".$_SESSION['ip_vistor']."<br>";
echo "compname: ".$_SESSION['compname']."<br>";
echo "REMOTE_USER: ".$_SESSION['ruser']."<br>";
echo "winauth: ".$_SESSION['winauth']."<br>";
echo "page: ".$_SESSION['page']."<br>";
echo "NWLoginR: ".$_SESSION['NWLoginR']."<br>";
echo "COMSLogin: ".$_SESSION['COMSLogin']."<br>";

echo "".var_dump($_SESSION)."";

?>