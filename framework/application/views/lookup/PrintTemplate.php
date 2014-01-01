<?php
require_once "/ChromePhp.php";
ob_start();		// See article - http://digitalpbk.com/php/warning-cannot-modify-header-information-headers-already-sent

function renderTemplateHeading($tData, $references) {
?>
<table>
	<colgroup width="20%"></colgroup>
	<colgroup width="5%"></colgroup>
	<colgroup width="10%"></colgroup>
	<colgroup width="65%"></colgroup>

	<tbody>
		<tr>
			<th>Max Number of Cycles:</th>
			<td><?php echo $tData['CourseNumMax']; ?></td>
			<th>Cycle Length:</th>
			<td><?php echo $tData['length'] . " " . $tData['CycleLengthUnit']; ?></td>
		</tr>
		<tr>
			<th>Chemotherapy Regimen Name:</th>
			<td colspan="3"><?php echo $tData['name']; ?></td>
		</tr>
		<tr>
			<th>Description:</th>
			<td colspan="3"><?php echo $tData['description']; ?></td>
		</tr>
        <tr><th colspan="4">&nbsp;</th></tr>
		<tr>
			<th>Emetogenic level:</th>
			<td colspan="3"><?php echo $tData['emoLevel']; ?></td>
		</tr>
		<tr>
			<th>Febrile Neutropenia risk:</th>
			<td colspan="3"><?php echo $tData['fnRisk']; ?> %</td>
		</tr>
		<tr>
			<th>Reference:</th>
			<td colspan="3">
			<?php getReferences($references); ?>
			</td>
		</tr>
	</tbody>
</table>
<?php
}


function getReferences($references) {
	$numreferences = count($references);
	if ($numreferences) {
		foreach ($references as $reference) {
			echo $reference['name'] . " - " . "<a href=\"" . $reference['description'] . "\" target=\"_blank\">Link to PMID</a><br />";
		}
	}
	echo "</table>";
}

function renderTherapy($tData, $tag, $hydrations, $infusions) {
?>
<table border="1" class="InformationTable">
<tbody>
	<tr>
		<th colspan="7" style="text-align: left; border: none !important;">
			<h2 style="text-align: left;"><?php echo $tag;?> Therapy</h2>
		</th>
	</tr>

	<tr><th colspan="7" style="text-align: left; border: none !important; font-weight: normal;">Instructions: 

	<?php 
		if ("Pre" === $tag) {
			echo $tData['preMHInstruct']; 
		}
		else if ("Post" === $tag) {
			echo $tData['postMHInstruct']; 
		}
		else {
			echo $tData['regimenInstruction']; 
		}
	?></th>
	</tr>

	<tr class="TemplateHeader">
		<th>Sequence #</th>
		<th>Drug</th>
		<th>Dose</th>
		<th>Route</th>
		<th>Fluid/Volume</th>
		<th>Infusion Time</th>
		<th>Administration Day</th>
	</tr>

	<?php
	foreach($hydrations as $hydration) {
		if ("" !== $tag) {
			$infusion = $infusions[$hydration['id']][0];

//	$temp = json_encode($hydration);
//	ChromePhp::log("Hydration Data\n" . $temp . "\n\n");

//	$temp = json_encode($infusion);
//	ChromePhp::log("Infusion Data\n" . $temp . "\n\n");

			//Pre/Post Therapy Section Hydration - 
			$drug = $hydration['drug'];
			$dose = $infusion['amt'];
			$units = $infusion['unit'];
			$route = $infusion['type'];
			$fluidVol = $infusion['fluidVol'];
			// $fluidUnits = $hydration['flunit'];
			$infusionTime = $infusion['infusionTime'];
			$flowRate = $hydration['flowRate'];
			$instructions = $hydration['description'];
			$sequence = $hydration['Sequence'];
			$adminDay = $hydration['adminDay'];
			$adminTime = $hydration['adminTime'];
			// $fluidType = $hydration['fluidType'];
		}
		else {
//	$temp = json_encode($hydration);
//	ChromePhp::log("Hydration Data\n" . $temp . "\n\n");

			//Therapy Section Hydration - 
			$drug = $hydration['drug'];
			$dose = $hydration['regdose'];
			$units = $hydration['regdoseunit'];
			$route = $hydration['route'];
			$adminDay = $hydration['adminDay'];
			$fluidVol = $hydration['flvol'];
			$fluidUnits = $hydration['flunit'];
			$infusionTime = $hydration['infusion'];
			$flowRate = $hydration['flowRate'];
			$instructions = $hydration['instructions'];
			$sequence = $hydration['sequence'];
			$adminTime = $hydration['adminTime'];
			$fluidType = $hydration['fluidType'];
		}
		echo "<tr>";
		if ("" === $instructions) {
			echo "<th>$sequence</th>\n";
		} else {
			echo "<th rowspan=\"2\">$sequence</th>\n";
		}
		echo "<td>$drug</td>\n";
		echo "<td>$dose $units</td>\n";
		echo "<td>$route</td>\n";
		if ("IV" === $route || "IVPB" == $route) {
			echo "<td>$fluidVol $fluidUnits</td>\n";
			echo "<td>$infusionTime</td>\n";
		} else {
			echo "<td>N/A</td>\n";
			echo "<td>N/A</td>\n";
		}
		echo "<td>$adminDay";
		if ("" === $adminTime) {
			echo "</td>\n";
		}
		else {
			echo " @ $adminTime</td>\n";
		}
		if ("" === $instructions) {
		} else {
			echo "</tr><tr><td colspan=\"6\">$instructions</td>\n";
		}
		echo "</tr>\n";
	}
	?>
</tbody></table>
<?php
}
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Cancer Chemotherapy IV Order Sheet</title>
	<link rel="stylesheet" type="text/css" href="/libs/ExtJS_4.1RC1/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="/js/UAT_18June2012/COMS.css">
	<style>
	div.desc { font-weight: normal; font-style: italic;background:none; }
	.OEMRecord_Element .header th {
		text-align: center;
	}
	td.drug {
		font-weight: bold!important;
	}
	th h2 {
		font-size:200%;
		/* margin-top: 1em; */
	}
	th { 
		text-align: right; 
		white-space: nowrap;
	}

	.center-Header th {
		text-align: center!important;
	}

	.InformationTable {
		margin-top: 1em!important;
	}
	</style>
</head>
<body style="background: white;">
<div id="application" style="width:98%;margin: 1em auto;border:none;">
	<header role="banner">
	<h1>Cancer Chemotherapy IV Order Sheet</h1>
	</header>

	<section class="CCOrderSheet">
	<?php if (is_null($templatedata)) {
		echo "<h2 style=\"margin-top:3em; text-align: center;\">No Template Found</h2>";
	}
	else {
		renderTemplateHeading($templatedata[0], $references);
		renderTherapy($templatedata[0], "Pre", $prehydrations, $preinfusions);
		renderTherapy($templatedata[0], "", $regimens, "");
		renderTherapy($templatedata[0], "Post", $posthydrations, $postinfusions);
	}
	?>
	</section>
</div>

<?php
ob_end_flush();
?>
</body>
</html>