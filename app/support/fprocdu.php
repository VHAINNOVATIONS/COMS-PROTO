<html>
<head>
<title>COMS Feedback</title>
</head>
<body>
<?php
header("Cache-Control: no-cache");
$Module = $_POST["Module"];
$Title = $_POST["Title"];
$Feedback = $_POST["Feedback"];
$file_info = $_POST["file_info"];
$Severity = $_POST["Severity"];
$Probability = $_POST["Probability"];
$Priority = $_POST["Priority"];
$file_info = $_POST["file_info"];
$file_info = $_POST["file_info"];
$TrackNumber = $_POST["TrackNumber"];
$RepeatSteps = $_POST["RepeatSteps"];
$Solution = $_POST["Solution"];
$FilesChanged = $_POST["FilesChanged"];
$Comments = $_POST["Comments"];

$body .= "Module: ".$Module."\n";
$body .= "Feedback: ".$Feedback."\n";
$body .= "Severity: ".$Severity."\n";
$body .= "Probability: ".$Probability."\n";
$body .= "Priority: ".$Priority."\n";
$body .= "TrackNumber: ".$TrackNumber."\n";
$body .= "RepeatSteps: ".$RepeatSteps."\n";
$body .= "Solution: ".$Solution."\n";
$body .= "FilesChanged: ".$FilesChanged."\n";
$body .= "Comments: ".$Comments."\n";
$body .="\n";
$compname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
$ip_vistor = $_SERVER['REMOTE_ADDR'];
$userid = get_current_user();

$serverName = "DBITDATA\DBIT";
$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_Tracking");
$conn =  sqlsrv_connect( $serverName, $connectionOptions);

$sqlid = "SELECT id FROM COMS_UAT ORDER BY id";
$getid = sqlsrv_query($conn, $sqlid);
while( $row = sqlsrv_fetch_array($getid, SQLSRV_FETCH_ASSOC))
{
$newid = $row['id'] + 1;
}

$target = 'attachments/';
if(move_uploaded_file($_FILES['attachment']['tmp_name'], $target.basename( $_FILES['attachment']['name'])))
  { $filename = $_FILES['attachment']['name'];   }
   else
       { $filename = "No Attachment"; }

$tsql = "INSERT INTO COMS_UAT (id,module,feedback,userid,attachment,file_info,compname,ip_vistor,Severity,Probability,Priority,Title,Status,TrackNumber,RepeatSteps,Solution,FilesChanged,Comments,Type) 
VALUES ($newid,'$Module','$Feedback','$userid','$filename','$file_info','$compname','$ip_vistor','$Severity','$Probability','$Priority','$Title','Closed','$TrackNumber','$RepeatSteps','$Solution','$FilesChanged','$Comments','DevResponse')";
$postfeedback = sqlsrv_query($conn, $tsql);
//echo $tsql;
echo "<html><head><link rel='stylesheet' type='text/css' href='uat.css'></head><body>";
echo "<table align='center'><tr><td colspan='2' align='center'><font size='20'>db<font color='#000099'>IT</font>pro</font></td></tr><tr><td colspan='2' align='center'> COMS UAT Support Ticket# ".$newid." </td></tr><tr><td colspan='2'>&nbsp;</td></tr><tr><td><br><br>";

echo "Thank you ".$userid." for providing your informtaion. Your description of the issue is for the <i>".$Module."</i>.<br><br>Title: ".$Title."<br><br>We have that you entered: <i>".$Feedback."</i><br><br>";


if ($filename != "No Attachment")
{ echo "You also uploaded a file named <i>" . $filename . "</i> with a description of <i>".$file_info."</i>.<br><br>"; }
 
echo "<a href='update.php?fid=$newid'>Click here to change your comments.</a><br><br>";

echo "Please continue using the <a href='https://coms-uat.dbitpro.com'>COMS Application</a> or click <a href='index.php'>here</a> to create another ticket. <br><br>If you would like to communicate directly with someone, please contact Sean Cassidy at 732.920.8305, or email him at <a href='sean.cassidy@dbitpro.com'>sean.cassidy@dbitpro.com</a>.";

echo "</td></tr></table></body></html>";
///$To = 'dbitpro@gmail.com,lferrucci@caci.com,sean.cassidy@dbitpro.com';
$To = 'dbitpro@gmail.com,sean.cassidy@dbitpro.com,barlowm@gmail.com,ssmith@technatomy.com'; 
$Subject = "COMS UAT Ticket: ".$newid."";
//$To = 'dbitpro@gmail.com';
  mail( $To, $Subject, $body, "From: <do_not_reply@dbitpro.com>");
//  header( "Location: http://www.dbitpro.com/thankyou.htm" );
?>
</body>
</html>