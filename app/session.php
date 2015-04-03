<?php
session_start();
$username = get_current_user();
$_SESSION['sessionid'] = session_id();
$sessionid = $_SESSION['sessionid'];

function sessionkill(){

	$_SESSION = array();
	if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
	}
	session_destroy();
	header("location:login.php");


}
?>