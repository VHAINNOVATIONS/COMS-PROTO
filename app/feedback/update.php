<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Feedback Form</title>
</head>

<body>
<table align="center">
<tr><td colspan="2" align="center"><font size="20">db<font color="#000099">IT</font>pro</font></td></tr>
<tr><td colspan="2" align="center"> Update Feedback</td></tr>
<?php
$serverName = "SQL\SERVER";
$connectionOptions = array("Database"=>"COMS_Demo");
$conn =  sqlsrv_connect($serverName, $connectionOptions);
$fid = $_GET[fid];

$sqlfeed = "SELECT * FROM COMS_Feedback WHERE id = $fid";
$getfeed = sqlsrv_query($conn, $sqlfeed);
while( $row = sqlsrv_fetch_array($getfeed, SQLSRV_FETCH_ASSOC))
{
$feedback = $row['feedback'];
$module = $row['module'];
}
?>
<form enctype="multipart/form-data" action="fproc.php" method="post">
  <tr>
    <td colspan="2">Module: <select name="Modules">
          <option value="<?php echo "".$module.""; ?>"><?php echo "".$module.""; ?></option>
      <option value="Chemotherapy Template Ordering Source">Chemotherapy Template Ordering Source</option>
      <option value="Order Entry Management">Order Entry Management</option>
      <option value="Flow Sheet">Flow Sheet</option>
      <option value="Nursing Documentation">Nursing Documentation</option>
      <option value="End of Treatment Summary">End of Treatment Summary</option>
      <option value="COMS Overall">COMS Overall</option>
    </select></td>
  </tr>
  <tr><td colspan="2">&nbsp;</td></tr>
  <tr><td colspan="2">Feedback -- Please be descriptive as possible. If any errors, please provide the error message.</td></tr>
  <tr>
    <td colspan="2"><textarea name="Feedback" cols="60" rows="25"><?php echo "".$feedback.""; ?></textarea></td>
  </tr>
  <tr>
    <td align="right"><input type="submit" value="Update Your Feedback" />
                        </td>
    <td align="left"><input type="reset" name="Reset" value="Clear Form"></td>
  </tr>
</form>
</table>
</body>
</html>
