<!doctype html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
		<title>Flowsheet for Chemotherapy Order Management System (COMS)</title>

<?php
require_once "..\app\session.php";
		$Deployment = "app.js";
		$Version = "js"; // Demo Server version
		$LibsVersion2 = "/libs/ExtJS_4.1.0";
		$LibsVersion = $LibsVersion2; // New Default Library <--- MWB - 6/29/2012 - Old Library Version


if ("High" == $_SESSION["BrowserMode"]) { ?>
        <link rel="stylesheet" id="COMS_Theme" type="text/css" <?php echo "href=\"$LibsVersion/resources/css/ext-all-access.css\"";?>>
        <link rel="stylesheet" id="COMS_Theme1" type="text/css" href="COMS-Access.css">
<?php 
}
else { ?>
        <link rel="stylesheet" id="COMS_Theme" type="text/css" <?php echo "href=\"$LibsVersion/resources/css/ext-all.css\"";?>>
        <link rel="stylesheet" id="COMS_Theme1" type="text/css" href="COMS.css">
<?php }?>

		<!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
		<script src="/libs/modernizr-2.0.6.js"></script>
		<style>
			div#heading { margin: 1em; display:none; font-size: 110%; }
			#heading ul { margin: 1em; }
			#heading li { margin-left: 3em; list-style-type: disc; }
			.fSheet-editCell { background-color: yellow!important; font-weight: bold!important; }
		</style>

	</head>
<body>
<div id="heading"></div>

<div id="GridPanel" style="width:98%; margin: 10px auto;"></div>
<script type="text/javascript" src="/libs/ExtJS_4.1.0/ext-all-debug.js"></script>
<script type="text/javascript" src="fsheet_3.js"></script>


</body>
</html>