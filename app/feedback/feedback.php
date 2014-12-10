<?php
$Modules = $_POST["Modules"];
$Feedback = $_POST["Feedback"];
$body .= "Modules: ".$Modules."\n";
$body .= "Feedback: ".$Feedback."\n";
$body .="\n";

$serverName = "SQL\SERVER";
$connectionOptions = array("Database"=>"COMS_Demo");
$conn =  sqlsrv_connect($serverName, $connectionOptions);

//$sqlid = "SELECT id FROM COMS_Feedback ORDER BY id";
$sqlid = "SELECT id FROM COMS_Feedback";
$getid = sqlsrv_query($conn, $sqlid);
while( $row = sqlsrv_fetch_array($getid, SQLSRV_FETCH_ASSOC))
{
$newid = $row['id'] + 1;
}

$tsql = "INSERT INTO COMS_Feedback (id,module,feedback) VALUES ($newid,'$Modules','$Feedback')";
$postfeedback = sqlsrv_query($conn, $tsql);

echo "<table align='center'><tr><td colspan='2' align='center'><font size='20'>db<font color='#000099'>IT</font>pro</font></td></tr><tr><td colspan='2' align='center'> COMS Application Feedback</td></tr><tr><td>";

echo "Your comments for the ".$Modules." has been received.<br><br>We have that you entered: <i>".$Feedback."</i><br><br>";
//echo "<a href='update.php?fid=$newid'>Click here to change your comments.</a><br><br>";

echo "Thank you for providing feedback. Please continue using the <a href='https://demo.dbitpro.com'>COMS Application</a> or you may also access the <a href='https://coms.dbitpro.com'>COMS Colloboration Portal</a><br><br>If you would like to speak with someone, please contact Sean Cassidy at 732.920.8305, or email him at <a href='sean.cassidy@dbitpro.com'>sean.cassidy@dbitpro.com</a> or <a href='sean.cassidy@dbitmail.com'>sean.cassidy@dbitmail.com</a>";

echo "</td></tr></table>";
  mail( "coms_feedback@dbitmail.com", "COMS Feedback", $body, $message, "From: <do_not_reply@dbitpro.com>");
//  header( "Location: http://www.dbitpro.com/thankyou.htm" );
?>

