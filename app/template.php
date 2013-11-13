<?php

function TemplateLevel($templateid,$Location,$NationalLevel,$TemplateOwner){

//Connect to database
//$serverName = "DBITDATA\DBIT";
//$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_UAT_TESTDB_June_19_2143");
//$conn =  sqlsrv_connect( $serverName, $connectionOptions);
include "dbitcon.php";

//Insert into Template Availability
$tempaval = "INSERT INTO Template_Availability (TemplateID,Location,NationalLevel,TemplateOwner) VALUES ('$templateid',$Location,'$NationalLevel',$TemplateOwner)";
$InsertTemplateAvailability = sqlsrv_query($conn, $tempaval);

// Close the connection.
//sqlsrv_close($conn);

}


?>
