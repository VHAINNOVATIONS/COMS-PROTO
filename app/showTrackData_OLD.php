<?php
include "dbitcon.php";
include "session.php";

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

 
            $jsonRecord['success'] = true;            
            $jsonRecord['total'] = count($records);
            $jsonRecord['records'] = $records;
            $this->set('jsonRecord', $jsonRecord);
 
echo json_encode($json); 
 
//echo "</table>";


?>