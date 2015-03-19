<?php
session_start();
$username = get_current_user();
$_SESSION['chkTrack']= 1;
$_SESSION['sessionid'] = session_id();
$sessionid = $_SESSION['sessionid'];

function sessionkill(){
     session_unset();
    session_destroy();
    session_write_close();
    setcookie(session_name(),'',0,'/');
    session_regenerate_id(true);
	header("location:login.php");

}
?>