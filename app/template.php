<?php

function TemplateLevel($templateid,$Location,$NationalLevel,$TemplateOwner){

include "dbitcon.php";

//Insert into Template Availability
$tempaval = "INSERT INTO Template_Availability (TemplateID,Location,NationalLevel,TemplateOwner) VALUES ('$templateid',$Location,'$NationalLevel',$TemplateOwner)";
$InsertTemplateAvailability = sqlsrv_query($conn, $tempaval);

}


?>
