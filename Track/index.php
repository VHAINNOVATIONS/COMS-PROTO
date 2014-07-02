<!doctype html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
		<title>User Tracking for Chemotherapy Order Management System (COMS)</title>

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
		</style>

	</head>
<body>
<div id="heading">
</div>

<div id="GridPanel"></div>
 <script type="text/javascript" <?php echo "src=\"$LibsVersion/ext-all-debug.js\"";?>></script>

<script>
Ext.onReady(function(){
	var heading = Ext.get("heading");
	heading.dom.style.display="block";
	var minWidth = Ext.getBody().getViewSize().width - 150;
	var minHeight = Ext.getBody().getViewSize().height - 200;
	if (minWidth < 0) {
		minWidth = 200;
	}
	if (minHeight < 0) {
		minHeight = 200;
	}
	var puWin = function(title, msg) {
		var bodyWin = Ext.create("Ext.window.Window", { 
			title: title,
			layout: "fit",
			html: msg,
			minWidth: minWidth,
			minHeight: minHeight,
			autoScroll: true,
			bodyPadding: '10',
			modal: true
		});
		bodyWin.show();
	}
	Ext.define('Track', {
		extend: 'Ext.data.Model',
		fields: [
			"id", "ip",
			"timestamp", "compname", "ref", "username", "winauth", "point", "pointno", "time", "date2"
		]
	});

	var store = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: "Track",
		groupField: "label",
		proxy: {
			type: "rest",
			url: "/showTrackData.php",
			reader: {
				type: "json",
				root: "COMS_Track"
			}
		}
	});

	var grid = Ext.create('Ext.grid.Panel', {
		selType: 'rowmodel',
		title: 'User Tracking',
		store: store,
		margin: '25',
		frame: true,
		layout: "fit",
		columns: [
			{ text: 'ID', dataIndex: 'id', width:50},
			{ text: 'IP', dataIndex: 'ip'},
			{ text: 'Comp Name', dataIndex: 'compname', width:270, autoSizeColumn: true},
			{ text: 'User Name', dataIndex: 'username'},
			{ text: 'Win Auth', dataIndex: 'winauth', width:120, autoSizeColumn: true},
			{ text: 'Point', dataIndex: 'point'},
			{ text: 'Point #', dataIndex: 'pointno'},
			{ text: 'Date', dataIndex: 'date2'},
			{ text: 'Time', dataIndex: 'time'},
			{ text: 'ref', dataIndex: 'ref', width:200, autoSizeColumn: true}
		],
		renderTo: Ext.get("GridPanel")
	});

	Ext.EventManager.onWindowResize(function () {
		var tmpWidth = Ext.getBody().getViewSize().width - 50;
		var tmpHeight = Ext.getBody().getViewSize().height - 160;
		grid.setSize(tmpWidth, tmpHeight);
	});

	var tmpWidth = Ext.getBody().getViewSize().width - 50;
	var tmpHeight = Ext.getBody().getViewSize().height - 160;
	grid.setSize(tmpWidth, tmpHeight);

});
</script>
</body>
</html>