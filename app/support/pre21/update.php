<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Update Ticket Form</title>
<link rel="stylesheet" type="text/css" <?php echo "href=../\"$Version/COMS.css\"";?>>
<link rel="stylesheet" type="text/css" href="uat.css">

</head>

<body>
<table align="center" border=0 width="800">
<tr><td colspan="2" align="center"><font size="20">db<font color="#000099">IT</font>pro</font></td></tr>
<tr><td colspan="2" align="center"> Update UAT Ticket<br></td></tr>
<tr><td colspan="2" align="center"><?php include "menu.php"; ?><br></td></tr>
<tr><td colspan="2" align="center"><?php include "tickets.php"; ?><br></td></tr>
<?php
$serverName = "DBITDATA\DBIT";
$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_Tracking");
$conn =  sqlsrv_connect($serverName, $connectionOptions);
$fid = $_GET[fid];
$TrackNumber = $_GET[TrackNumber];


$queryq = "SELECT * FROM COMS_UAT WHERE id = $fid";
$query = sqlsrv_query($conn, $queryq);

while( $row = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC))
{
$feedback = $row['feedback'];
$module = $row['module'];
}

//var_dump($feedback);
//var_dump($module);

?>
<form enctype="multipart/form-data" action="fprocu.php" method="post">
  <tr><td colspan="2">Ticket Number: <?php echo $fid; ?><input type="hidden" name="TrackNumber" value="<?php echo $TrackNumber; ?>"></td></tr>
  <tr><td colspan="2">Module: <?php echo $module; ?></td></tr>
  <tr><td colspan="2">&nbsp;</td></tr>
  <tr><td colspan="2"><?php echo $feedback; ?></td></tr>
  <tr><td colspan="2" align="Center"><?php echo "<a href='edit.php?fid=".$fid."&TrackNumber=".$TrackNumber."'>Edit</a> &nbsp; "; ?></td></tr>
  <tr><td colspan="2">&nbsp;</td></tr>
  <tr><td colspan="2">Other Comments:<br><?php 
$queryq2q= "SELECT * FROM COMS_UAT WHERE (status = 'Comment') AND (TrackNumber = $TrackNumber)";
$query2 = sqlsrv_query($conn, $queryq2q);

while( $row = sqlsrv_fetch_array($query2, SQLSRV_FETCH_ASSOC))
{ 
  $feedback = $row['feedback'];
  echo $feedback;
  
  echo "<br>";
  echo "<br>";
  }
  
  ?></td></tr>
  <tr><td colspan="2">&nbsp;</td></tr>
  <tr><td colspan="2">Feedback -- Please be descriptive as possible. If any errors, please provide the error message.</td></tr>
  <tr>
    <td colspan="2" align="center"><textarea name="Feedback" cols="125" rows="15"></textarea></td>
  </tr>
  <tr>
    <td align="right" colspan="2"><input type="submit" value="Update UAT Ticket # <?php echo $fid; ?> wih your comments" />
                        </td>
    
  </tr>
</form>
</table>
</body>
</html>
