<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Service Request</title>
<link rel="stylesheet" type="text/css" <?php echo "href=../\"$Version/COMS.css\"";?>>
<link rel="stylesheet" type="text/css" href="uat.css">
</head>

<body>
<?php header("Cache-Control: no-cache"); 


?>
<table align="center" width = "60%" border=0 bgcolor="#FFFFFF">
<tr><td>
<table align="center" width = "50%" border=0 bgcolor="#FFFFFF">
<tr><td colspan="1" align="center"><img src='../images/vainnovations.png'></td><td colspan="1" align="center"><font size="20">db<font color="#000099">IT</font>pro</font></td>
</tr>
</table>
<table align="center" width = "50%" border=0 bgcolor="#FFFFFF">
<tr><td colspan="2">&nbsp;</td></tr>
<tr><td colspan="2" align="center"> <b><font size = "+2">Chemotherapy Ordering Management System (COMS)</font></b><br> Application Prototype Testing Round One<br><br><b><font size = "+1">For immediate support, please call 732.920.8305 or 813.383.4963 between 8AM to 8PM EST.</font></b><br><br><b>Open Support Request Ticket Numbers:</b> <br><?php  include "tickets.php";  ?></td></tr>
<tr>
<td colspan="1" align="left"> Date: <?php echo date( "F d, Y", filemtime( 'index.php' ) ); ?></td>
<td colspan="1" align="right"> Tester: <?php include "../session.php"; echo "".$_SERVER[ 'LOGON_USER' ].", ".$_SESSION[ 'role' ]." "; ?></td>
</tr>
  <tr><td colspan="1">&nbsp;</td>
  <td colspan="1">&nbsp;</td></tr>
<form enctype="multipart/form-data" action="fproc.php" method="post">
  <tr><td colspan="2">Title: <input type="textbox" name="Title" size="80"><input id="TrackNumber" type="hidden" name="TrackNumber" value="<?php $serverName = "DBITDATA\DBIT";
$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_Tracking");
$conn =  sqlsrv_connect( $serverName, $connectionOptions);
$sqlid = "SELECT TrackNumber FROM COMS_UAT ORDER BY TrackNumber";
$getid = sqlsrv_query($conn, $sqlid);
while( $row = sqlsrv_fetch_array($getid, SQLSRV_FETCH_ASSOC))
{
$TrackNumber = $row['TrackNumber'] + 1;
}
echo "".$TrackNumber.""; ?>" size=40> </td></tr>
  <tr>
    <td colspan="1" align = "left">Module: <select name="Module">
          <option value="Select">Please select a module</option>
      <option value="Chemotherapy Template Order Source">Chemotherapy Template Order Source</option>
      <option value="Order Entry Management">Order Entry Management</option>
      <option value="Flow Sheet">Flow Sheet</option>
      <option value="Nursing Documentation">Nursing Documentation</option>
      <option value="End of Treatment Summary">End of Treatment Summary</option>
      <option value="COMS Overall">COMS Overall</option>
    </select></td>
	<td colspan="1"><div align="left"></div></td>
  </tr>

  <tr><td colspan="2">&nbsp;</td></tr>
  <tr>
  <td colspan="1" align="left">Severity -- Potential impact to the system:<br><select name="Severity">
          <option value="Select">Please select a module</option>
      <option value="Mission Critical --  system failure">Mission Critical --  System failure</option>
      <option value="Major -- Severe problems but possible to work around;">Major -- Severe problems but possible to work around;</option>
      <option value="Minor -- Does not impact functionality but is not according to specifications">Minor -- Does not impact functionality but is not according to specifications</option>
      </select></td>
	  <td colspan="1" align="left">File Attachment Description (optional): <input type="text" name="file_info" size="40"><input type="hidden" name="MAX_FILE_SIZE" value="10000000"> </td>
	</tr>
	<tr><td colspan="2">&nbsp;</td></tr>
	<tr>
	    <td colspan="1" align="left">Probability -- Likelihood the incident will occur:<br><select name="Probability">
          <option value="Select">Please select a module</option>
      <option value="High -- Incident is expected in most circumstances">High -- Incident is expected in most circumstances</option>
      <option value="Medium -- Event will probably occur in most circumstances">Medium -- Event will probably occur in most circumstances</option>
      <option value="Low -- Incident may occur at some time">Low -- Incident may occur at some time</option>
      </select></td>
	  <td colspan="1" align="left"><div align="left">File to upload:<br> <input type="file" name="attachment" id="attachment" size="40"></div></td>
	  </tr>
	  <tr><td colspan="2">&nbsp;</td></tr>
	  <tr>
	    <td colspan="1" align="left">Priority -- Order to address incidents<br><select name="Priority">
          <option value="Select">Please select a module</option>
      <option value="Immediate -- Fix as soon as possible">Immediate -- Fix as soon as possible</option>
      <option value="Delayed -- system is usable but incident must be fixed prior to next test">Delayed -- system is usable but incident must be fixed prior to next test</option>
      <option value="Deferred -- incident may remain if necessary due to time or costs">Deferred -- incident may remain if necessary due to time or costs</option>
      </select></td>
	  <td colspan="1" align="left"></td>
  </tr>
  <tr><td colspan="2">&nbsp;</td></tr>
     
  <tr><td colspan="2">Defect -- Provide as many details as possible <br><br> Steps, Inputs, Expected Results, Actual Results, Anomalies, Date/Time, Attempts to Repeat, and Screen Captures <br><br>
To copy the entire screen - Press PRINT SCREEN.  To copy only an active window - Press ALT+PRINT SCREEN.  To paste into MS Paint -- Click the Start button, select Programs, select Accessories, select Paint to open, then select Edit, select Paste, select File, select Save As, enter file name, change file type to TIFF, and select save file
</td></tr>
  <tr>
    <td colspan="2"><textarea name="Feedback" cols="110" rows="25"></textarea></td>
  </tr>
    <tr><td colspan="2">&nbsp;</td></tr>
  <tr>
    <td align="right"><input type="submit" name="upload" id="upload" value=" Submit " />
                        </td>
    <td align="left"><input type="reset" name="Reset" value="Clear Form"></td>
  </tr>
</form>
</table>
</td></tr></table>
</body>
</html>
