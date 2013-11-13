<table align="center"><tr><td>
<?php
$userid = get_current_user();

$serverName = "DBITDATA\DBIT";
$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_Tracking");
$conn =  sqlsrv_connect( $serverName, $connectionOptions);

//$sqlid = "SELECT * FROM COMS_UAT WHERE userid = '$userid'";
$sqlid = "SELECT * FROM COMS_UAT WHERE Status = 'Open' Order by id";
$getid = sqlsrv_query($conn, $sqlid);

while( $row = sqlsrv_fetch_array($getid, SQLSRV_FETCH_ASSOC))
{
$id = $row['id'];
$TrackNumber = $row['TrackNumber'];

echo " <a href='update.php?fid=".$id."&TrackNumber=".$TrackNumber."'>".$id."</a> &nbsp; ";
}

 if (
  $userid === 'sean.cassidy' || 
  $userid === 'mike.barlow' ||
  $userid === 'louis.ferrucci' ||
  $userid === 'scott.smith'
  ){
  
$sql2q = "SELECT * FROM COMS_UAT WHERE Status = 'Closed' Order by id";
$sql2 = sqlsrv_query($conn, $sql2q);

while( $row = sqlsrv_fetch_array($sql2, SQLSRV_FETCH_ASSOC))
{
echo "<br><br><b>Closed Tickets</b><br>";
$id = $row['id'];
$TrackNumber = $row['TrackNumber'];

echo " <a href='viewticket.php?fid=".$id."&TrackNumber=".$TrackNumber."'>".$id."</a> &nbsp; ";
}
  
  }

?>
</td></tr></table>