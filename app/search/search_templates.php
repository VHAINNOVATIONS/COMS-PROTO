<?php 
if(!empty($_GET['q'])) {
search();
}

function search() {

//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_VA");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";


/* Test Connection */
if( $conn === false ) {
    die( print_r( sqlsrv_errors(), true));
}

/* Passed Keywords */
$q = str_replace("'","''",$_GET['q']);

/* SQL Query */
$tsql = "SELECT
         Description
     FROM LookUp
     WHERE Description LIKE '%{$q}%' AND LookUp_Type = 25";

/* Execute Query */     
$stat = sqlsrv_query($conn,$tsql);

/* Test Query */
if( $stat === false) {
    die( print_r( sqlsrv_errors(), true) );
}

/* Print Results */
while( $row = sqlsrv_fetch_array( $stat, SQLSRV_FETCH_ASSOC) ) {
      echo $row['Description']."<br />";
}
sqlsrv_free_stmt( $stat);
} 
?> 