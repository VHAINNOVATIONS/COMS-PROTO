<?php 
if(!empty($_GET['q'])) {
    search();
}

function search() {
    include "dbitcon.php";
    if( $conn === false ) {
        die( print_r( sqlsrv_errors(), true));
    }

    /* Passed Keywords */
    $q = str_replace("'","''",$_GET['q']);
    $tsql = "SELECT Description FROM LookUp WHERE Description LIKE '%{$q}%' AND LookUp_Type = 25";
    $stat = sqlsrv_query($conn,$tsql);
    if( $stat === false) {
        die( print_r( sqlsrv_errors(), true) );
    }
    while( $row = sqlsrv_fetch_array( $stat, SQLSRV_FETCH_ASSOC) ) {
          echo $row['Description']."<br />";
    }
    sqlsrv_free_stmt($stat);
} 
?> 