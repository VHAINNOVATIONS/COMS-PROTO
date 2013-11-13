<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Feedback Form</title>
</head>

<body>
<?php header("Cache-Control: no-cache"); ?>
<table align="center">
<tr><td colspan="2" align="center"><font size="20">db<font color="#000099">IT</font>pro</font></td></tr>
<tr><td colspan="2" align="center"> COMS Application Feedback</td></tr>
<tr><td colspan="2" align="center"><? $userid = get_current_user(); echo "".$userid.""; ?></td></tr>

<form enctype="multipart/form-data" action="feedback.php" method="post">
  <tr>
    <td colspan="2">Module: <select name="Modules">
          <option value="Select">Please select a module</option>
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
    <td colspan="2"><textarea name="Feedback" cols="60" rows="25"></textarea></td>
  </tr>
  
      <tr><td><div align="right">File Attachment Description (optional):</div></td><td><input type="text" name="file_info" size="40"><input type="hidden" name="MAX_FILE_SIZE" value="10000000"> </td></tr>
    <tr><td><div align="right">File to upload:</div></td><td><input type="file" name="attachment" id="attachment" size="30"></td></tr>
  
  <tr>
    <td align="right"><input type="submit" name="upload" id="upload" value="Send Your Feedback" />
                        </td>
    <td align="left"><input type="reset" name="Reset" value="Clear Form"></td>
  </tr>
</form>
</table>
</body>
</html>
