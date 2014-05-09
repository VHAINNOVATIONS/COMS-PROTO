<?php
include "dbitcon.php";
include "session.php";
$tsql = "SELECT * FROM COMS_Track WHERE ip != '74.102.74.34' AND ip != '108.33.77.130' AND ip != '50.190.93.103' AND ip != '172.19.110.122' AND date2 != '' ORDER BY timestamp DESC";
//$tsql = "SELECT winauth,point,pointno,time,date2 FROM COMS_Track WHERE winauth != 'innovations\vaphscassis' AND winauth != 'innovations\vaphsferrul' AND winauth != 'innovations\vaphsbarlom'";
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