<html>
<head>
<title>COMS Feedback</title>
</head>
<body>
<?php
header("Cache-Control: no-cache");
$Modules = $_POST["Modules"];
$Feedback = $_POST["Feedback"];
$file_info = $_POST["file_info"];
$body .= "Modules: ".$Modules."\n";
$body .= "Feedback: ".$Feedback."\n";
$body .="\n";
$compname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
$ip_vistor = $_SERVER['REMOTE_ADDR'];
$userid = get_current_user();

$serverName = "DBITDATA\DBIT";
$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_Tracking");
$conn =  sqlsrv_connect( $serverName, $connectionOptions);

$sqlid = "SELECT id FROM COMS_Feedback ORDER BY id";
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

$tsql = "INSERT INTO COMS_Feedback (id,module,feedback,userid,attachment,file_info,compname,ip_vistor) VALUES ($newid,'$Modules','$Feedback','$userid','$filename','$file_info','$compname','$ip_vistor')";
$postfeedback = sqlsrv_query($conn, $tsql);

echo "<table align='center'><tr><td colspan='2' align='center'><font size='20'>db<font color='#000099'>IT</font>pro</font></td></tr><tr><td colspan='2' align='center'> COMS Application Feedback</td></tr><tr><td colspan='2'>&nbsp;</td></tr><tr><td>";

echo "Thank you ".$userid." for providing feedback. Your comments for the <i>".$Modules."</i> have been received.<br><br>We have that you entered: <i>".$Feedback."</i><br><br>";


if ($filename != "No Attachment")
{ echo "You also uploaded a file named <i>" . $filename . "</i> with a description of <i>".$file_info."</i>.<br><br>"; }
 
echo "<a href='update.php?fid=$newid'>Click here to change your comments.</a><br><br>";

echo "Please continue using the <a href='https://demo.dbitpro.com'>COMS Application</a> or you may also access the <a href='https://coms.dbitpro.com'>COMS Colloboration Portal</a><br><br>If you would like to communicate directly with someone, please contact Sean Cassidy at 732.920.8305, or email him at <a href='sean.cassidy@dbitpro.com'>sean.cassidy@dbitpro.com</a>.";

echo "</td></tr></table>";
  mail( "coms_feedback@dbitmail.com", "COMS Feedback", $body, "From: <do_not_reply@dbitpro.com>");
//  header( "Location: http://www.dbitpro.com/thankyou.htm" );
?>
</body>
</html>