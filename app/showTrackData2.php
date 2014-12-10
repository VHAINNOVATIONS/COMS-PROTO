<?php
include "dbitcon.php";
include "session.php";
$tsql = "SELECT * FROM COMS_Track";
$getrole = sqlsrv_query($conn, $tsql);
$json = array();
$jsonRecord = array();
$records = array();
$aRec = array();
while( $row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC)) {
	$aRec = $row;
	$aDate = $aRec["date"];
	$records[] = $row;
}

$jsonRecord['success'] = true;            
$jsonRecord['total'] = count($records);
$jsonRecord['records'] = $records;
 
echo json_encode($jsonRecord); 
?>