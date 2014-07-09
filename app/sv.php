<?php
include "session.php";
$_SESSION['sessionid'] = session_id();
echo "SessionID: ".session_id()."<br>";
echo "chkTrack: ".$_SESSION['chkTrack']."<br>";
echo "Display Name: ".$_SESSION['dname']."<br>";
echo "Role: ".$_SESSION['role']."<br>";
echo "Role ID: ".$_SESSION['rid']."<br>";
echo "Sitelist: ".$_SESSION['sitelist']."<br>";
echo "Email: ".$_SESSION['Email']."<br>";
echo "Domain: ".$_SESSION['domain']."<br>";
echo "Session Status: ".$_SESSION['sessionStatus']."<br>";
echo "TemplateAuthoring: ".$_SESSION['TemplateAuthoring']."<br>";
echo "Role_ID: ".$_SESSION['Role_ID']."<br>";
echo "ip_vistor: ".$_SESSION['ip_vistor']."<br>";
echo "compname: ".$_SESSION['compname']."<br>";
echo "REMOTE_USER: ".$_SESSION['ruser']."<br>";
echo "winauth: ".$_SESSION['winauth']."<br>";
echo "page: ".$_SESSION['page']."<br>";
echo "NWLoginR: ".$_SESSION['NWLoginR']."<br>";
echo "COMSLogin: ".$_SESSION['COMSLogin']."<br>";
echo "mdws: ".$_SESSION['mdws']."<br>";
echo "vista: ".$_SESSION['vista']."<br>";
echo "sshusr: ".$_SESSION['sshusr']."<br>";
echo "sshpwd: ".$_SESSION['sshpwd']."<br>";
echo "AC: ".$_SESSION['AC']."<br>";
echo "VC: ".$_SESSION['VC']."<br>";
echo "COMSchk: ".$_SESSION['COMSchk']."<br>";


echo "<br>";
echo "".var_dump($_SESSION)."<br>";

?>