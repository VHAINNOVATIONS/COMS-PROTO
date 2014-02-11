<?php
ChromePhp::log("Lab Results - View");
    if(isset($jsonRecord)) {
        echo json_encode($jsonRecord);
    }
    else {
        echo "Failure";
    }

?>