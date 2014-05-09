<?php
echo "Userlog";

include "dbitcon.php";

$q = "SELECT * FROM COMS_Track";
$getrole = sqlsrv_query($conn, $q);
	echo "<table cell spacing='4' cellpadding='4'><tr><td>ip</td><td>date</td><td>compname</td><td>Access Code</td><td>Username</td></tr>";
	while($row = sqlsrv_fetch_array($getrole, SQLSRV_FETCH_ASSOC)) {
		$ip= $row['ip'];
		//echo $ip;
		//$date= $row['date'];
		//$date2 = strtotime($row['date']));
		//$daten = DateTime::createFromFormat("l dS F Y", $row['date']);
		//$daten = $daten->format('d/m/Y'); // for example
		$compname= $row['compname'];
		$username= $row['username'];
		$winauth= $row['winauth'];
		//sqlsrv_fetch($getrole);
		//$date2 = sqlsrv_get_field ( $getrole, 0, SQLSRV_PHPTYPE_STRING("UTF-8"));
		
		echo "<tr><td>".$ip."</td><td>".$date2."</td><td>".$compname."</td><td>".$username."</td><td>".$winauth."</td></tr>";
		}
	echo "</table>";

?>