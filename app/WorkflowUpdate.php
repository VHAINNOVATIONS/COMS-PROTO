<?php
include "session.php";
include "workflow.php";

$wid = $_GET['wid'];
$srid = $_GET['srid'];
$Response = $_GET['Response'];
$ReasonNo = $_GET['ReasonNo'];
$oemrecordid = $_GET['oemrecordid'];
$WFStatus = "Update";

echo "<link rel='stylesheet' type='text/css' href='js/UAT_18June2012/COMS.css'>";
echo "<table align='center'>";
echo "<tr><td>&nbsp;</td></tr>";
echo "<tr><td>Update Workflow</td></tr>";

WFHistory($wid,$ReasonNo,$WFStatus,$Response);

if ($ReasonNo == 4 || 
$ReasonNo == 5 || 
$ReasonNo == 6 || 
$ReasonNo == 7 || 
$ReasonNo == 8 || 
$ReasonNo == 9 || 
$ReasonNo == 10 || 
$ReasonNo == 11){
echo "<tr><td><br>Show Changes<br><br></td></tr>";
echo "<tr><td><a href='WorkflowUpdate.php?Response=Approved&wid=".$wid."&oemrecordid=".$oemrecordid."&WFStatus=".$WFStatus."&ReasonNo=".$ReasonNo."&srid=".$srid."'>Approved</a> or <a href='WorkflowUpdate.php?Response=NotApproved&wid=".$wid."&oemrecordid=".$oemrecordid."&WFStatus=".$WFStatus."&ReasonNo=".$ReasonNo."&srid=".$srid."'>Not Approved</a><br></td></tr>";
echo "<tr><td>&nbsp;</td></tr>";
echo "<tr><td>You have marked your response as <b>".$Response."</b>.<br></td></tr>";
if ($Response != "Received"){
OEMeditUpdateWorkflow($WFStatus,$Response,$wid,$oemrecordid,$ReasonNo,$srid);
echo "<tr><td>The order has been updated and the sender has been notifed.</td></tr>";

}
}
echo "</table>";
?>