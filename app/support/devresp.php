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
<tr><td colspan="2" align="center">Development Response to UAT Ticket<br></td></tr>
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
$status = $row['status'];
}

//var_dump($queryq);
//var_dump($module);

?>
<form enctype="multipart/form-data" action="fprocdu.php" method="post">
  <tr><td colspan="2"><b>Ticket Number:</b> <?php echo $fid; ?><input type="hidden" name="TrackNumber" value="<?php echo $TrackNumber; ?>">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Ticket Status:</b> <select name="Status">
          <option value="Select"><?php echo $status; ?></option>
      <option value="Closed">Closed</option>
      <option value="In Progress">In Progress</option>
    </select>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Ticket Type:</b> <select name="Type1">
          <option value="Select"><?php echo $Type1; ?></option>
      <option value="Enhancement">Enhancement</option>
      <option value="Data Cleanup">Data Cleanup</option>
    </select>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Module:<? echo "".$module.""; ?></b> <select name="Module">
          <option value="Select"><?php echo $module; ?></option>
      <option value="Chemotherapy Template Order Source">Chemotherapy Template Order Source</option>
      <option value="Order Entry Management">Order Entry Management</option>
      <option value="Flow Sheet">Flow Sheet</option>
      <option value="Nursing Documentation">Nursing Documentation</option>
      <option value="End of Treatment Summary">End of Treatment Summary</option>
      <option value="COMS Overall">COMS Overall</option>
    </select>
	
	</td></tr>
 
  <tr><td colspan="2">&nbsp;</td></tr>
  <tr><td colspan="2"><?php echo $feedback; ?></td></tr>
  <tr><td colspan="2" align="Center"><?php echo "<a href='edit.php?fid=".$fid."&TrackNumber=".$TrackNumber."'>Edit</a> &nbsp; "; ?></td></tr>
  <tr><td colspan="2">&nbsp;</td></tr>
  <tr><td colspan="2"><b>Other Comments:</b><br><?php 
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
  
  
  <tr><td colspan="2"><b>How to repeat the problem:</b></td></tr>
  <tr><td colspan="2" align="center"><textarea name="RepeatSteps" cols="125" rows="8"></textarea></td></tr>
   <tr><td colspan="2"><b>Solution:</b></td></tr>
  <tr><td colspan="2" align="center"><textarea name="Solution" cols="125" rows="8"></textarea></td></tr>
   <tr><td colspan="2"><b>Files Changed:</b></td></tr>
  <tr><td colspan="2" align="center"><textarea name="FilesChanged" cols="125" rows="8"></textarea></td></tr>
   <tr><td colspan="2">&nbsp;</td></tr>
  <tr><td colspan="2"><b>Additional Comments</b></td></tr>
  <tr><td colspan="2" align="center"><textarea name="Comments" cols="125" rows="8"></textarea></td></tr>
  <tr>
    <td align="right" colspan="2"><input type="submit" value="Update UAT Ticket # <?php echo $fid; ?> wih your comments" />
                        </td>
    
  </tr>
</form>
</table>
</body>
</html>
