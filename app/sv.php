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

?>