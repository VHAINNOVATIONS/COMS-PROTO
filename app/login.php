<body bgcolor="#EFEFEF"><?php
$ErrMsg1 = "Authentication failed! Please enter your proper Access and Verify Codes below and click \"Login\"";
$theTable1 = "    <table border = '0' align='center' width='100%' cellpadding='6' cellspacing='6'>
        <tr><td align='center' colspan='2'><img src='images/va_logo_v2.png'></td></tr>
        <tr><td align='center' width='100%' colspan='2'>";

$theForm = "        <tr><td>
            <form name='input' action='index.php' method='post' accept-charset='ISO-8859-1'>
            <table align='center'>
                <tr><td align='right'>Access Code:</td><td align='left'> <input type='password' name='AccessCode' /></td></tr>
                <tr><td></td></tr>
                <tr><td align='right'>Verify Code:</td><td align='left'> <input type='password' name='VerifyCode' /></td></tr>
                <tr><td colspan=2></td></tr>
                <tr><td align='center' colspan=2><input type='submit' value='&nbsp;Login&nbsp;' />&nbsp;&nbsp;<input type='reset' value='&nbsp;Clear&nbsp;' /></tr>
            </table>
            </form>";

$theTable2 = "        </td></tr>
    </table>";


if (!isset($LoginError)) {
    error_log("Initializing LoginError");
    $LoginError = "";
}

$theFormErr = "        <tr><td>
            <table align='center'>
                <tr><td style=\"font-weight:bold; color:red;\">$LoginError</td></tr>
            </table>
        </td></tr>";

    echo $theTable1;
    error_log("Login - ]" . $LoginError . "[");
    if("" === $LoginError) {
        error_log("Login - string is empty");
        echo $theForm;
    }
    else if ($ErrMsg1 === $LoginError) {
        echo $theFormErr . $theForm;
    }
    else {
        echo "<h1 style=\"text-align: center; margin-top: 3em;\">$LoginError</h1>";
    }
    echo $theTable2;
?>