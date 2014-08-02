<?php
include "dbitcon.php";
include "session.php";

<<<<<<< HEAD
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
=======
//echo "<table><tr><td>User Name</td><td>Role</td><td>Login Time</td></tr>";

$tsql = "SELECT * FROM COMS_Track";
$getrole = sqlsrv_query($conn, $tsql);
$json = array(); 
while( $row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC))
{
$json['COMS_Track'][]=$row; 
//$winauth = $row['winauth'];
//$username= $row['username'];
//$date2= $row['date2'];
//$time= $row['time'];

//echo "<tr><td>".$winauth."</td><td>".$username."</td><td>".$date2." ".$time."</td></tr>";

}

 

echo json_encode($json); 
 
//echo "</table>";


>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
?>