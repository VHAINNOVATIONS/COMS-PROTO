<?php
include "session.php";
include "workflow.php";

$mid = $_GET['mid'];
UpdateMessageStatus($mid);
DecodeMessage($mid);

?>