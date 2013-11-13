<?php 
ignore_user_abort(true);
set_time_limit(0);

/////////////////////////
/////Begin - Get Last Issued Workflow ID
/////////////////////////
function GetLastWFID(){

//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Get Last Workflow ID
$wfid = "SELECT LastIssuedWorkflowID FROM WorkflowIDsLastIssued";
$wfidl = sqlsrv_query($conn, $wfid);
while( $row = sqlsrv_fetch_array($wfidl, SQLSRV_FETCH_ASSOC))
{
$owid = $row['LastIssuedWorkflowID'];
$nwid = $row['LastIssuedWorkflowID']+1;
}
$uwfid = "Update WorkflowIDsLastIssued set LastIssuedWorkflowID = $nwid where LastIssuedWorkflowID = '" .$owid."'";
$updateWorkflowID = sqlsrv_query($conn, $uwfid);

return $nwid;

// Close the connection.
//sqlsrv_close( $conn );
}

/////////////////////////
/////End - Get Last Issued Workflow ID
/////////////////////////

/////////////////////////
/////Begin - Get Current Step of Workflow ID
/////////////////////////
function GetCurrentStepWFID($wid){

//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Get Current Step for WID
$wfidcs = "SELECT CurrentStep FROM WorkflowHistory WHERE wid = $wid";
$wfidcsl = sqlsrv_query($conn, $wfidcs);
while( $row = sqlsrv_fetch_array($wfidcsl, SQLSRV_FETCH_ASSOC))
{
$CurrentStep = $row['CurrentStep'];
//echo "CS: ".$CurrentStep."";
}

//$uwfid = "Update WorkflowIDsLastIssued set LastIssuedWorkflowID = $nwid where LastIssuedWorkflowID = '" .$owid."'";
//$updateWorkflowID = sqlsrv_query($conn, $uwfid);

return $CurrentStep;

// Close the connection.
//sqlsrv_close( $conn );
}

/////////////////////////
/////End - Get Current Step of Workflow ID
/////////////////////////

/////////////////////////
/////Begin - Notify of Orders to Pharmacy
/////////////////////////
function OrdersNotify($patientId,$templateId,$dateApplied,$dateStarted,$dateEnded,$goal,$clinicalTrial,$performanceStatus){
//echo "<br>Begin Orders Notify<br>";
$ReasonNo = 3;

//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

$wid = GetLastWFID();

//Get Number of Steps for Workflow
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$nosteps = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($nosteps, SQLSRV_FETCH_ASSOC))
{
//$id = $row['ID'];
//$nwid = $row['LastIssued']+1;
//$wid = $row['LastIssued'];
$NoSteps = $row['NoSteps'];
$Reason = $row['Reason'];
//$ReasonNo = $row['ReasonNo'];
$Body = $row['Body'];
}

//Get Patient's Name from Patient Table
$pname = "SELECT First_Name,Last_Name FROM Patient WHERE Patient_ID = '$patientId'";
$piname = sqlsrv_query($conn, $pname);
while( $row = sqlsrv_fetch_array($piname, SQLSRV_FETCH_ASSOC))
{
$FirstName = $row['First_Name'];
$LastName = $row['Last_Name'];
}

//Get Pharmacist's Email Addresses from Roles Table
$tsql = "SELECT * FROM Roles WHERE role = 'Pharmacist'";
$getemail = sqlsrv_query($conn, $tsql);
while( $row = sqlsrv_fetch_array($getemail, SQLSRV_FETCH_ASSOC))
{
$PharmEmail = $row['Email'];

//Write Message
$To = $PharmEmail;
$CC = $_SESSION['Email'];
$senderEmail = $_SESSION['Email'];
$MFrom = $senderEmail;
$Subject = "INFO: Order Notification to Pharmacist for patient ".$FirstName." ".$LastName."";
$headers = "From: <do_not_reply@dbitpro.com>\r\n";
//$headers .= "Reply-To: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
//$headers .= "CC: sean.cassidy@dbitmail.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

//$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."";
//$Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "?ReasonNo=".$ReasonNo."";
//send message
//$message = "<html><body>Update Workflow Status: <a href=".$Link.">Respond</a><br><br>".$Body."</body></html>";
//$message = "<html><body>Order Notification to Pharmacist (Workflow ID: ".$wid.")<br><br>Link: <a href=".$Link.">Link</a> <br>Patient ID: ".$patientId."<br>Template ID: ".$templateId."<br>dateApplied: ".$dateApplied."<br> dateStarted : ".$dateStarted."<br>dateEnded Id: ".$dateEnded."<br>Goal: ".$goal."<br>clinicalTrial: ".$clinicalTrial."<br>performanceStatus: ".$performanceStatus."</body></html>";
$message = "<html><body><br>".$Body."<br>Date Applied: " . $dateApplied . "<br>Date Started: " . $dateStarted . "<br>Date Ended: " . $dateEnded . "<br>Goal: " . $goal . "<br>Clinical Trial: " . $clinicalTrial . "</body></html>";
mail($To, $Subject, $message, $headers);
//echo "Message: ".$message."";

//Store Message
StoreMessage($To,$CC,$Subject,$message,$MFrom,$wid);
}
$WFStatus = "Start";
$Response = "Sent";
//Write Workflow History
WFHistory($wid,$ReasonNo,$WFStatus,$Response);
//echo "<br>End Orders Notify<br>";

// Close the connection.
//sqlsrv_close( $conn );
}

/////////////////////////
/////End - Notify of Orders to Pharmacy
/////////////////////////

/////////////////////////
/////Begin - OEM Edit Workflow
/////////////////////////
function OEMeditWorkflow($templateid,$oemrecordid,$therapyid,$therapytype,$instructions,$admintime,$medid,$med,$dose,$bsadose,$units,$infusionmethod,$fluidtype,$fluidvol,$flowrate,$infusiontime,$dose2,$bsadose2,$units2,$infusionmethod2,$fluidtype2,$fluidvol2,$flowrate2,$infusiontime2){

$Template_ID = $templateid;

//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Get Patient ID
$psql = "SELECT Patient_ID from Master_Template where Template_ID = '$oemrecordid'";
$pid = sqlsrv_query($conn, $psql);
while( $row = sqlsrv_fetch_array($pid, SQLSRV_FETCH_ASSOC))
{
$Patient_ID = $row['Patient_ID'];
}

//Get Patient's Name from Patient Table
$pname = "SELECT First_Name,Last_Name FROM Patient WHERE Patient_ID = '$Patient_ID'";
$piname = sqlsrv_query($conn, $pname);
while( $row = sqlsrv_fetch_array($piname, SQLSRV_FETCH_ASSOC))
{
$FirstName = $row['First_Name'];
$LastName = $row['Last_Name'];
}

//Get Owner of Template's ID
$gsql = "SELECT * FROM Patient_Assigned_Templates WHERE Patient_ID = '$Patient_ID' AND Template_ID = '$Template_ID'";
$getassignor = sqlsrv_query($conn, $gsql);
while( $row = sqlsrv_fetch_array($getassignor, SQLSRV_FETCH_ASSOC))
{
$AssignedByRoleID = $row['AssignedByRoleID'];
}
//echo "Role ID: ".$AssignedByRoleID."";
$srid = $_SESSION['rid'];
$senderEmail = $_SESSION['Email'];

//Get Owner's Email Address from Roles Table
$tsql = "SELECT * FROM Roles WHERE rid = '$AssignedByRoleID'";
$getemail = sqlsrv_query($conn, $tsql);
while( $row = sqlsrv_fetch_array($getemail, SQLSRV_FETCH_ASSOC))
{
$PhysicianEmail = $row['Email'];
}

//For Testing, we set the Reason No, later, this will be set when the user makes a change and selects a Reason, will then pass the ReasonNo which decides the message
$ReasonNo = 8;
//echo $ReasonNo;

$WFStatus = "Nothing";
//if (empty($WFStatus)) {
if ($WFStatus == "Update"){
//update workflow
}
else{
$wid = GetLastWFID();

if ($ReasonNo == 4){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
$Subject = "".$SubjectPreHeader."Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName."";
//$message = "<html><body>Order Edit Notification (Workflow ID: ".$wid.")<br><br>Link: <a href=".$Link.">Link</a><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
elseif ($ReasonNo == 5){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
$Link = "http://sictest.dbitpro.com/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Drug Shortage - Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
//$Subject = "".$SubjectPreHeader."Drug Shortage - Workflow ID: ".$wid."";
$Subject = "".$SubjectPreHeader."Drug Shortage";
//$message = "<html><body>Drug Shortage - Order Edit Notification (Workflow ID: ".$wid.")<br><br>Link: <a href=".$Link.">Link</a><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body>Link: <a href=".$Link.">Link</a><br><br>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
elseif ($ReasonNo == 6){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Policy/Protocol - Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
//$Subject = "".$SubjectPreHeader."Policy/Protocol - Workflow ID: ".$wid."";
$Subject = "".$SubjectPreHeader."Policy/Protocol";
//$message = "<html><body>Policy/Protocol - Order Edit Notification (Workflow ID: ".$wid.")<br><br>Link: <a href=".$Link.">Link</a><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
elseif ($ReasonNo == 7){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Change in Patient-specific Parameters - Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
//$Subject = "".$SubjectPreHeader."Change in Patient-specific Parameters, Workflow ID: ".$wid."";
$Subject = "".$SubjectPreHeader."Change in Patient-specific Parameters";
//$message = "<html><body>Change in Patient-specific Parameters - Order Edit Notification (Workflow ID: ".$wid.")<br><br>Link: <a href=".$Link.">Link</a><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body>Link: <a href=".$Link.">Link</a><br><br>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
elseif ($ReasonNo == 8){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Non-formulary - Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
//$Subject = "".$SubjectPreHeader."Non-formulary - Workflow ID: ".$wid."";
$Subject = "".$SubjectPreHeader."Non-formulary";
//$message = "<html><body>Non-formulary - Order Edit Notification (Workflow ID: ".$wid.")<br><br>Link: <a href=".$Link.">Link</a><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
elseif ($ReasonNo == 9){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Change Route of Administration - Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
//$Subject = "".$SubjectPreHeader."Change Route of Administration, Workflow ID: ".$wid."";
$Subject = "".$SubjectPreHeader."Change Route of Administration";
//$message = "<html><body>Change Route of Administration - Order Edit Notification (Workflow ID: ".$wid.")<br><br>Link: <a href=".$Link.">Link</a><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
elseif ($ReasonNo == 10){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Change Administration Time - Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
//$Subject = "".$SubjectPreHeader."Change Administration Time - Workflow ID: ".$wid."";
$Subject = "".$SubjectPreHeader."Change Administration Time";
//$message = "<html><body>Change Administration Time - Order Edit Notification (Workflow ID: ".$wid.")<br><br>Link: <a href=".$Link.">Link</a><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
elseif ($ReasonNo == 11){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Change Sequencing - Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
//$Subject = "".$SubjectPreHeader."Change Sequencing - Workflow ID: ".$wid."";
$Subject = "".$SubjectPreHeader."Change Sequencing ";
//$message = "<html><body>Change Sequencing - Order Edit Notification (Workflow ID: ".$wid.")<br><br>Link: <a href=".$Link.">Link</a><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
elseif ($ReasonNo == 12){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
//$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Dose rounding - Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
//$Subject = "".$SubjectPreHeader."Dose rounding - Workflow ID: ".$wid."";
$Subject = "".$SubjectPreHeader."Dose rounding";
//$message = "<html><body>Dose rounding - Order Edit Notification (Workflow ID: ".$wid.")<br><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
elseif ($ReasonNo == 13){
//Get body for Message and workflow NoSteps
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$wfi = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($wfi, SQLSRV_FETCH_ASSOC))
{
$Body = $row['Body'];
$NoSteps = $row['NoSteps'];
}

//Set Subject Pre Header
if ($NoSteps === 1){
$SubjectPreHeader = "Info: ";
}
else{
$SubjectPreHeader = "Resign Required: ";
}

//Set Link
//$Link = "http://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
//$Link = "http://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";

//Write Message
$To = $PhysicianEmail;
$CC = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Fluid/Volume Change - Order Edit Notification to Provider for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
//$Subject = "".$SubjectPreHeader."Fluid/Volume Change - Workflow ID: ".$wid."";
$Subject = "".$SubjectPreHeader."Fluid/Volume Change";
//$message = "<html><body>Fluid/Volume Change - Order Edit Notification (Workflow ID: ".$wid.")<br><br> The OEM Record ID: ".$oemrecordid."<br>Patient ID: ".$Patient_ID."<br>Template ID: ".$Template_ID."<br>Instructions: ".$instructions."<br> Admin Time: ".$admintime."<br>Med Id: ".$medid."<br>Med: ".$med."<br>Does: ".$dose."<br>BSA Dose: ".$bsadose."<br>Units: ".$units."<br>Infusion Method: ".$infusionmethod."<br>Fluid Type: ".$fluidtype."<br>Fluid Volume: ".$fluidvol."<br>Flow Rate: ".$flowrate."<br>Infusion Time: ".$infusiontime."<br><br>Or<br><br>Dose: ".$dose2."<br>BSA Does:".$bsadose2."<br>Units: ".$units2."<br>Infusion Method: ".$infusionmethod2."<br>Fluid Type: ".$fluidtype2."<br>Fluid Volume: ".$fluidvol2."<br>Flow Rate: ".$flowrate2."<br>Infusion Time: ".$infusiontime2."</body></html>";
$message = "<html><body>".$Body."</body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);
}
else{
echo "No Reason";
}

//Set Workflow Status and Response
$WFStatus = "Start";
$Response = "Sent";
}

//Store Message
StoreMessage($To,$CC,$Subject,$message,$MFrom,$wid);
//Write Workflow History
WFHistory($wid,$ReasonNo,$WFStatus,$Response);

// Close the connection.
//sqlsrv_close($conn);
}
/////////////////////////
/////End - OEM Edit Workflow
/////////////////////////

/////////////////////////
/////Begin - OEM Edit Update Workflow
/////////////////////////
function OEMeditUpdateWorkflow($WFStatus,$Response,$wid,$oemrecordid,$ReasonNo,$srid){

//Connect to database
$serverName = "DBITDATA\DBIT";
$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_VA_TEST");
$conn =  sqlsrv_connect( $serverName, $connectionOptions);

//Get Patient ID
$psql = "SELECT Patient_ID from Master_Template where Template_ID = '$oemrecordid'";
$pid = sqlsrv_query($conn, $psql);
while( $row = sqlsrv_fetch_array($pid, SQLSRV_FETCH_ASSOC))
{
$Patient_ID = $row['Patient_ID'];
}

//Get Patient's Name from Patient Table
$pname = "SELECT First_Name,Last_Name FROM Patient WHERE Patient_ID = '$Patient_ID'";
$piname = sqlsrv_query($conn, $pname);
while( $row = sqlsrv_fetch_array($piname, SQLSRV_FETCH_ASSOC))
{
$FirstName = $row['First_Name'];
$LastName = $row['Last_Name'];
}

//Get Sender of Change Email Address from Roles Table
$tsql = "SELECT * FROM Roles WHERE rid = '$srid'";
$getemail = sqlsrv_query($conn, $tsql);
while( $row = sqlsrv_fetch_array($getemail, SQLSRV_FETCH_ASSOC))
{
$PharmEmail = $row['Email'];
}

if ($WFStatus == "Update"){
if ($Response == "Approved"){

//Write Message
$To = $PharmEmail;
//$To = "dbitpro@gmail.com";
$CC = $_SESSION['Email'];
$senderEmail = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "Order Change Approved for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
$Subject = "Order Change Approved for Patient ".$FirstName." ".$LastName."";
$message = "<html><body>Order Change Approved (Workflow ID: ".$wid.")<br><br> </body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
//$headers .= "Reply-To: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
//$headers .= "CC: sean.cassidy@dbitmail.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);

//Store Message
StoreMessage($To,$CC,$Subject,$message,$MFrom,$wid);
//Write Workflow History
WFHistory($wid,$ReasonNo,$WFStatus,$Response);


}
elseif ($Response == "NotApproved"){

//Write Message
$To = $PharmEmail;
//$To = "dbitpro@gmail.com";
$CC = $_SESSION['Email'];
$senderEmail = $_SESSION['Email'];
$MFrom = $senderEmail;
$Subject = "Order Change Not Approved for Patient ".$FirstName." ".$LastName.", Workflow ID: ".$wid."";
$message = "<html><body>Order Change Not Approved (Workflow ID: ".$wid.")<br><br> </body></html>";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
//$headers .= "Reply-To: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
//$headers .= "CC: sean.cassidy@dbitmail.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($To, $Subject, $message, $headers);

//Store Message
StoreMessage($To,$CC,$Subject,$message,$MFrom,$wid);
//Write Workflow History
WFHistory($wid,$ReasonNo,$WFStatus,$Response);

}
}

// Close the connection.
//sqlsrv_close($conn);
}
/////////////////////////
/////End - OEM Edit Update Workflow
/////////////////////////


/////////////////////////
/////Begin - Write Message to Database
/////////////////////////
function StoreMessage($To,$CC,$Subject,$message,$MFrom,$wid){

//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

$midq = "SELECT mid FROM Messages ORDER BY mid";
$wfhist = sqlsrv_query($conn, $midq);
while( $row = sqlsrv_fetch_array($wfhist, SQLSRV_FETCH_ASSOC))
{
$mid = $row['mid']+1;
}

$rid = $_SESSION['rid'];
//$dateSent = date('l jS \of F Y h:i:s A');
//$dateSent =  date(DATE_RFC822);
$dateSent = date('F j, Y');
$timeSent = date('Hi');
$timeZone = date('e');
$MStatus = "Unread";

//echo "Message: ".$message."";
//$newmessage = htmlspecialchars("<a href='test'>Test</a>", ENT_QUOTES);

$newmessage = htmlentities($message);
$newsubject = htmlentities($Subject);
//echo "New Message: ".$newmessage."";

//$OpenLinkSrc = "https://demo.dbitpro.com/showMessage.php?mid=".$mid."";
$OpenLinkSrc = "https://".$_SESSION['domain']."/showMessage.php?mid=".$mid."";
//$link = "<html><body><a href=".$OpenLinkSrc.">Open Message</a></body></html>";
//$OpenLink = htmlentities($link);
//$OpenLink ="Test";

//Insert into Messages
$messageq = "INSERT INTO Messages (mid,MTo,CC,Subject,Message,MFrom,rid,wid,dateSent,timeSent,timeZone,MStatus,OpenLink) VALUES ($mid,'$To','$CC','$newsubject','$newmessage','$MFrom','$rid','$wid','$dateSent','$timeSent','$timeZone','$MStatus','$OpenLinkSrc')";
$InsertMessageHistory = sqlsrv_query($conn, $messageq);

//echo "END MESSAGE";

//Decode the HTML
//$dmsg = html_entity_decode($newmessage);
//echo $dmsg;

return $mid;

// Close the connection.
//sqlsrv_close( $conn );
}

/////////////////////////
/////End - Write Message to Database
/////////////////////////

/////////////////////////
/////Begin - WFHistory Function
/////////////////////////
function WFHistory($wid,$ReasonNo,$WFStatus,$Response){
//echo "<br>Begin WFHistory<br>";

//echo "wid: ".$wid."<br>";
//echo "ReasonNo: ".$ReasonNo."<br>";

$rid = $_SESSION['rid'];

//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

$CurrentStep = 0;
$wfhis = "SELECT CurrentStep,Status FROM WorkflowHistory WHERE wid = '$wid' ORDER BY CurrentStep";
$wfhist = sqlsrv_query($conn, $wfhis);
while( $row = sqlsrv_fetch_array($wfhist, SQLSRV_FETCH_ASSOC))
{
$CurrentStep = $row['CurrentStep'];
$CurrentStatus = $row['Status'];
}


if ($CurrentStep == 0){
$CurrentStep = 1;
}

//echo "Current Step WFHistory: ".$CurrentStep."<br>";

//Get Number of Steps for Workflow, Get Last Workflow ID
$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
$nosteps = sqlsrv_query($conn, $wfinfo);
while( $row = sqlsrv_fetch_array($nosteps, SQLSRV_FETCH_ASSOC))
{
$id = $row['ID'];
$NoSteps = $row['NoSteps'];
$Reason = $row['Reason'];
}

if ($CurrentStep <= $NoSteps){
 
 //Update Last Issued
 $tsql = "Update Workflows set LastIssued = $wid where ID = '" .$id."'";
 $updateWorkflow = sqlsrv_query($conn, $tsql);
 //Update Workflow History
// echo "ID: ".$id."<br>";
// echo "WID: ".$wid."<br>";
// echo "NoSteps: ".$NoSteps."<br>";
// echo "Current Step: ".$CurrentStep."<br>";
 $NextStep = $CurrentStep + 1;
// echo "Next Step: ".$NextStep."<br>";

 if ($NoSteps == $CurrentStep){
 $Status = "Complete";
 }
 else {
 $Status = "Not Complete";
 }

//echo "Status: ".$Status."<br>";
 
}
//echo "Current Step: ".$CurrentStep."<br>";
//echo "Next Step: ".$NextStep."<br>";

if ($WFStatus == "Update") {
 if ($NoSteps == $NextStep){
 $Status = "Complete";
 }
 else {
 $Status = "Not Complete";
 }
//if ($NextStep < $NoSteps){
if ($CurrentStatus == "Complete"){
//Do Nothing
}
else{
$tsql3 = "INSERT INTO WorkflowHistory (wid,CurrentStep,NumOfSteps,Status,Response,rid,ReasonNo) VALUES ($wid,$NextStep,$NoSteps,'$Status','$Response',$rid,$ReasonNo)";
$updateWorkflowHistory = sqlsrv_query($conn, $tsql3);
}
}
//elseif ($CurrentStep == 1){
elseif ($WFStatus == "Start"){
//Insert into WorkflowHistory
$tsql3 = "INSERT INTO WorkflowHistory (wid,CurrentStep,NumOfSteps,Status,Response,rid,ReasonNo) VALUES ($wid,$CurrentStep,$NoSteps,'$Status','$Response',$rid,$ReasonNo)";
$updateWorkflowHistory = sqlsrv_query($conn, $tsql3);
}

//echo "check end";
//echo "<br>End WFHistory<br>";

// Close the connection.
//sqlsrv_close( $conn );
}
/////////////////////////
/////End - WFHistory Function
/////////////////////////

/////////////////////////
/////Begin - Decode HTML Message in Database Function
/////////////////////////
function DecodeMessage($mid){
//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Select Message to Decode
$msgq = "SELECT Message,OpenLink,Subject,dateSent,timeSent,CC,MTo,MFrom FROM Messages WHERE mid = $mid";
$msgqu = sqlsrv_query($conn, $msgq);
while( $row = sqlsrv_fetch_array($msgqu, SQLSRV_FETCH_ASSOC))
{
$MTo = $row['MTo'];
$MFrom = $row['MFrom'];
$CC = $row['CC'];
$Message = $row['Message'];
$OpenLink = $row['OpenLink'];
$Subject = $row['Subject'];
$dateSent = $row['dateSent'];
$timeSent = $row['timeSent'];
}

//Decode the HTML
$dmsg = html_entity_decode($Message);

//Echo the Message
echo "<link rel='stylesheet' type='text/css' href='js/UAT_18June2012/COMS.css'>";
echo "<table border='' cellspacing='4' cellpadding='4' align='center'>";
echo "<tr><td><b>Message ID:".$mid."</b></td><td align='right'><a href='https://".$_SESSION['domain']."/reply.php?mid=".$mid."'>Reply</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://".$_SESSION['domain']."/forward.php?mid=".$mid."'>Forward</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://".$_SESSION['domain']."/delete.php?mid=".$mid."'>Delete</a></td></tr>";
echo "<tr><td><b>From:</b> ".$MFrom."</td><td><b>To:</b> ".$MTo."</td></tr>";
echo "<tr><td colspan='2'><b>CC:</b> ".$CC."</td></tr>";
echo "<tr><td colspan='2'><b>Subject:</b> ".$Subject."</td></tr>";
echo "<tr><td colspan='2'><b>Sent:</b> ".$dateSent.", ".$timeSent."</td></tr>";
echo "<tr><td colspan='2'> ".$dmsg."</td></tr>";
echo "<tr><td align='center' colspan='2'><a href='https://".$_SESSION['domain']."/reply.php?mid=".$mid."'>Reply</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://".$_SESSION['domain']."/forward.php?mid=".$mid."'>Forward</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://".$_SESSION['domain']."/delete.php?mid=".$mid."'>Delete</a></td></tr>";
echo "</table>";
//echo "<br>Open Link:<br> ".$OpenLink."";

// Close the connection.
//sqlsrv_close( $conn );
}
/////////////////////////
/////End - Decode HTML Message in Database Function
/////////////////////////

/////////////////////////
/////Begin - Set Workflow Steps
/////////////////////////
function UpdateWorkflowSteps($ReasonNo,$NoSteps){
//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Update Workflow
$wfu = "Update Workflows set NoSteps = $NoSteps where ReasonNo = '" .$ReasonNo."'";
$updateWorkflowq = sqlsrv_query($conn, $wfu);

echo "Updated";

// Close the connection.
//sqlsrv_close( $conn );
}
/////////////////////////
/////End - Set Workflow Steps
/////////////////////////

/////////////////////////
/////Begin - Set Message Status
/////////////////////////
function UpdateMessageStatus($mid){
//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Update Workflow
$msgu = "UPDATE Messages SET MStatus = 'Read' WHERE mid = " .$mid."";
$updateMessageq = sqlsrv_query($conn, $msgu);

//echo "Updated";

// Close the connection.
//sqlsrv_close( $conn );
}
/////////////////////////
/////End - Set Message Status
/////////////////////////

/////////////////////////
/////Begin - Delete Message
/////////////////////////
function deleteMessage($mid){
//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

$mid = $_GET['mid'];

//Update Workflow
$msgu = "UPDATE Messages SET MStatus = 'Delete' WHERE mid = " .$mid."";
$updateMessageq = sqlsrv_query($conn, $msgu);

echo "<link rel='stylesheet' type='text/css' href='js/UAT_18June2012/COMS.css'>";
echo "<table align='center'>";
echo "<tr><td>&nbsp;</td></tr>";
echo "<tr><td>Message marked for Deletion.</td></tr>";
echo "</table>";


// Close the connection.
//sqlsrv_close( $conn );
}
/////////////////////////
/////End - Delete Message
/////////////////////////

/////////////////////////
/////Begin - Reply to Message
/////////////////////////
function ReplyMessage($mid){
//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Select Message to Reply to
$msgq = "SELECT Message,OpenLink,Subject,dateSent,timeSent,MTo,wid FROM Messages WHERE mid = $mid";
$msgqu = sqlsrv_query($conn, $msgq);
while( $row = sqlsrv_fetch_array($msgqu, SQLSRV_FETCH_ASSOC))
{
$MTo = $row['MTo'];
$Message = $row['Message'];
$OpenLink = $row['OpenLink'];
$Subject = $row['Subject'];
$dateSent = $row['dateSent'];
$timeSent = $row['timeSent'];
$wid = $row['wid'];
}

//Decode the HTML
$dmsg = html_entity_decode($Message);

//Echo the Message
echo "<link rel='stylesheet' type='text/css' href='js/UAT_18June2012/COMS.css'>";
echo "<form enctype='multipart/form-data' method='POST' action='".$_SERVER['PHP_SELF']."'>";
echo "<input type='hidden' name='MTo' value='".$MTo."'>";
echo "<input type='hidden' name='wid' value='".$wid."'>";
echo "<table border='1' cellspacing='4' cellpadding='4' align='center'>";
//echo "<tr><td>Message ID:".$mid."</td></tr>";
echo "<tr><td>Subject: <input name='Subject' value='RE: ".$Subject."' size='100'></td></tr>";
//echo "<tr><td>Sent: ".$dateSent.", ".$timeSent."</td></tr>";
echo "<tr><td><textarea rows=15 cols=100 name='msgreply'></textarea></td></tr>";
echo "<tr><td align='center'><input type='Submit' name='sendMessage' value='&nbsp;&nbsp;Send&nbsp;&nbsp;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='Reset' name='Clear' value='&nbsp;&nbsp;Clear&nbsp;&nbsp;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='Reset' name='Cancel' value='&nbsp;&nbsp;Cancel&nbsp;&nbsp;'></td></tr>";
echo "<tr><td><b>Previous Message</b></td></tr>";
echo "<tr><td><i>".$dmsg."</i></td></tr>";
echo "<tr><td align='center'><a href='https://".$_SESSION['domain']."/reply.php'>Reply</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://".$_SESSION['domain']."/forward.php'>Forward</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://".$_SESSION['domain']."/delete.php'>Delete</a></td></tr>";
echo "</table>";
echo "</form>";

// Close the connection.
//sqlsrv_close( $conn );
}
/////////////////////////
/////End - Reply to Message
/////////////////////////

/////////////////////////
/////Begin - Forward Message
/////////////////////////
function ForwardMessage($mid){
//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Select Message to Forward to
$msgq = "SELECT Message,OpenLink,Subject,dateSent,timeSent,MTo,wid FROM Messages WHERE mid = $mid";
$msgqu = sqlsrv_query($conn, $msgq);
while( $row = sqlsrv_fetch_array($msgqu, SQLSRV_FETCH_ASSOC))
{
$MTo = $row['MTo'];
$Message = $row['Message'];
$OpenLink = $row['OpenLink'];
$Subject = $row['Subject'];
$dateSent = $row['dateSent'];
$timeSent = $row['timeSent'];
$wid = $row['wid'];
}

//Decode the HTML
$dmsg = html_entity_decode($Message);

//Echo the Message
echo "<link rel='stylesheet' type='text/css' href='js/UAT_18June2012/COMS.css'>";
echo "<form enctype='multipart/form-data' method='POST' action='".$_SERVER['PHP_SELF']."'>";
//echo "<input type='hidden' name='MTo' value='".$MTo."'>";
echo "<input type='hidden' name='wid' value='".$wid."'>";
echo "<table border='1' cellspacing='4' cellpadding='4' align='center'>";
//echo "<tr><td>Message ID:".$mid."</td></tr>";
echo "<tr><td>To: <input name='MTo' size='100'></td></tr>";
echo "<tr><td>CC: <input name='CC' size='100'></td></tr>";
//echo "<tr><td>BCC: <input name='BCC' size='100'></td></tr>";
echo "<tr><td>Subject: <input name='Subject' value='FW: ".$Subject."' size='100'></td></tr>";
//echo "<tr><td>Sent: ".$dateSent.", ".$timeSent."</td></tr>";
echo "<tr><td><textarea rows=15 cols=100 name='msgreply'></textarea></td></tr>";
echo "<tr><td align='center'><input type='Submit' name='sendMessage' value='&nbsp;&nbsp;Send&nbsp;&nbsp;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='Reset' name='Clear' value='&nbsp;&nbsp;Clear&nbsp;&nbsp;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='Reset' name='Cancel' value='&nbsp;&nbsp;Cancel&nbsp;&nbsp;'></td></tr>";
echo "<tr><td><b>Previous Message</b></td></tr>";
echo "<tr><td><i>".$dmsg."</i></td></tr>";
echo "<tr><td align='center'><a href='https://".$_SESSION['domain']."/reply.php'>Reply</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://".$_SESSION['domain']."/forward.php'>Forward</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://".$_SESSION['domain']."/delete.php'>Delete</a></td></tr>";
echo "</table>";
echo "</form>";

// Close the connection.
//sqlsrv_close( $conn );
}
/////////////////////////
/////End - Forward Message
/////////////////////////

/////////////////////////
/////Begin - Send Message
/////////////////////////
function sendMessage(){
//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Grab data from the form
$msgreply = $_POST['msgreply'];
$MsgSubject = $_POST['Subject'];
$wid = $_POST['wid'];

//Write Message
$To = $_POST['MTo'];
$CC = $_SESSION['Email'];
$senderEmail = $_SESSION['Email'];
$MFrom = $senderEmail;
//$Subject = "RE: ".$MsgSubject."";
$Subject = "".$MsgSubject."";
$message = "".$msgreply."";

$headers = "From: <do_not_reply@dbitpro.com>\r\n";
$headers .= "Reply-To: ". strip_tags($MFrom) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
//Send the Message
mail($To, $Subject, $message, $headers);

//Store the Message
$mid = StoreMessage($To,$CC,$Subject,$message,$MFrom,$wid);

//Update Message Status
$msgs = "UPDATE Messages SET MStatus = 'Sent' WHERE mid = " .$mid."";
$updateMessageq = sqlsrv_query($conn, $msgs);

//echo "message sent";
//header( "Location: ".$_SESSION['domain']."" );
// Close the connection.
//sqlsrv_close( $conn );
}
/////////////////////////
/////End - Send Message
/////////////////////////

if (isset($_POST['sendMessage'])) {
sendMessage();
}
?>