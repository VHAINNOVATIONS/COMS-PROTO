<?php
include "dbitcon.php";
include "session.php";

$tsql = "SELECT * FROM COMS_Track";
$tsql = "SELECT id, ip, compname, ref, username, winauth, point, pointno, time, date2, sessionid, page FROM COMS_Track order by id desc";
  
$getrole = sqlsrv_query($conn, $tsql);
$json = array(); 
$count = 10000;
while( $row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC) and $count > 0) {
    $count--;
    $json['COMS_Track'][]=$row; 

}
echo json_encode($json); 
?>