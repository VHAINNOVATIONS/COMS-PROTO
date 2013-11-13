<?php
include "session.php";
include "workflow.php";

//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);

$mid = $_GET['mid'];
//$mid = 1281;
UpdateMessageStatus($mid);
DecodeMessage($mid);

?>