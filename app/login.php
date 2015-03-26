<body bgcolor="#EFEFEF">

<form name='input' action='index.php' method='post' accept-charset='ISO-8859-1'>
    <table border = '0' align='center' width='100%' cellpadding='6' cellspacing='6'>
        <tr><td align='center' colspan='2'><img src='images/va_logo_v2.png'></td></tr>
        <tr><td align='center' width='100%' colspan='2'>

<?php

if($LoginError && "" !== $LoginError) {
    error_log("Login Error - $LoginError");
?>
<!--
        <tr><td>
            <table align='center'>
                <tr><td style="font-weight:bold; color:red;">Invalid Access/Verify Code ($LoginError). Please try again</td></tr>
            </table>
        </td></tr>
-->
<?php
}
else {
?>

<h1>No Login Error</h1>
<?php
}
?>


        <tr><td>
            <table align='center'>
                <tr><td align='right'>Access Code:</td><td align='left'> <input type='password' name='AccessCode' /></td></tr>
                <tr><td></td></tr>
                <tr><td align='right'>Verify Code:</td><td align='left'> <input type='password' name='VerifyCode' /></td></tr>
                <tr><td colspan=2></td></tr>
                <tr><td align='center' colspan=2><input type='submit' value='&nbsp;Login&nbsp;' />&nbsp;&nbsp;<input type='reset' value='&nbsp;Clear&nbsp;' /></tr>
            </table>
        </td></tr>
    </table>
</form>

