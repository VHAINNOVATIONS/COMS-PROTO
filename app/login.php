<body bgcolor="#EFEFEF">

<?php
echo "<table border = '2' align='center' width='100%'>";
echo "<tr><td align='center' colspan='2'><img src='images/va_logo_v1.png'></td></tr>";
echo "<tr><td align='center' width='75%'>";
echo "<br>*****<B>TEST SYSTEM</B>******<BR> 
   *************************************************************************<br> 
           You have accessed the CPM  Cache Account and VistaLink is installed in this account<br>
   Access privilege is based on specified need.  As a user on this system,
   YOU are responsible for complying with all security regulations regarding access.  YOU are not to share access codes with anyone or to access accounts that do not pertain to YOUR job.  YOU are responsible for
   maintaining the integrity, confidentiality, and security of all information contained in this system.<br><br>
 
   USERs who use this system inappropriately will have their access terminated and removed from the system.  <br><br>
 
   VIEWing this message indicates that YOU agree with the terms of system
   use.<br><br>
 
            MISUSE of this system constitutes a Federal Crime.<br>
   *************************************************************************<br>
";
echo "</td>";
echo "<td align='left' width='25%'>";
echo "<table><tr><td align='right'><form name='input' action='index.php' method='post' accept-charset='ISO-8859-1'><br>
Access Code:</td><td align='left'> <input type='password' name='AccessCode' /></td></tr><tr><td></td></tr><tr><td align='right'>Verify Code:</td><td align='left'> <input type='password' name='VerifyCode' /></td></tr><tr><td colspan=2></td></tr><tr><td align='center' colspan=2>	
<input type='submit' value='&nbsp;Submit&nbsp;' />&nbsp;&nbsp;<input type='reset' value='&nbsp;Clear&nbsp;' />
</form></tr></table>";
echo "</td></tr>";


echo "</table>";
?>
