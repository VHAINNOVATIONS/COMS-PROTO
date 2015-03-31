<?php
function testsql(){
		include "dbitcon.php";
		$sqlq = "SELECT * FROM Roles";
		$test = sqlsrv_query($conn, $sqlq);
		while ($row = sqlsrv_fetch_array($test, SQLSRV_FETCH_ASSOC)) {
		printf("Name: %s Role: %s", $row[DisplayName], $row[role]);
		echo "<br><br>";}
		}
testsql();
?>