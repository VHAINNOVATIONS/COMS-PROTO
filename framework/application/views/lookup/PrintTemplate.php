<?php
// require_once "/ChromePhp.php";
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
	<tr class="TemplateHeader">
		<th colspan="8" style="text-align: left; border-bottom-width:0;">
			<h2 style="text-align: left;"><?php echo $tag;?> Therapy</h2>
		</th>
	</tr>

	<tr class="TemplateHeader">
    <th colspan="8" style="text-align: left!important; font-weight: bold; border-top-width:0;">Instructions:

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
		<th>Fluid Type</th>
		<th>Infusion Time</th>
		<th>Administration Day</th>
	</tr>

	<?php
	$dose = '';
	$units = '';
	$route = '';
	$fluidVol = '';
	$fluidUnits = '';
	$infusionTime = '';
	$flowRate = '';
	$instructions = '';
	$sequence = '';
	$adminDay = '';
	$adminTime = '';
	$fluidType = '';
	if ($hydrations && count($hydrations) > 0) {
error_log("Render Therapy - Have Hydrations for $tag - " . count($hydrations));
		foreach($hydrations as $hydration) {
error_log("Render Therapy - Have Hydration - " . json_encode($hydration));
			$dose = '';
			$units = '';
			$route = '';
			$fluidVol = '';
			$fluidUnits = '';
			$infusionTime = '';
			$flowRate = '';
			$instructions = '';
			$sequence = '';
			$adminDay = '';
			$adminTime = '';
			$fluidType = '';
			$drug = explode(' : ', $hydration['drug']);
			$drug = $drug[0];
			if ("" !== $tag) {
				if (count($infusions[$hydration['id']]) > 0) {
					$infusion = $infusions[$hydration['id']][0];
					//Pre/Post Therapy Section Hydration - 
					//$drug = $hydration['drug'];
					$dose = $infusion['amt'];
					$units = $infusion['unit'];
					if (0 == $dose) {
						$dose = '';
						$units = '';
					}
					$route = $infusion['type'];
					$fluidVol = $infusion['fluidVol'];
					if (array_key_exists("flunit", $infusion)) {
						$fluidUnits = $infusion['flunit'];
					}
					else {
						$fluidUnits = "";
					}

					$infusionTime = $infusion['infusionTime'];
					$flowRate = $hydration['flowRate'];
					$instructions = $hydration['description'];
					$sequence = $hydration['Sequence'];
					$adminDay = $hydration['adminDay'];
					$adminTime = $hydration['adminTime'];
					$fluidType = $infusion['fluidType'];
				}
			}
			else {
				//Therapy Section Hydration - 
				//$drug = $hydration['drug'];
				$dose = $hydration['regdose'];
				$units = $hydration['regdoseunit'];
				if (0 == $dose) {
					$dose = '';
					$units = '';
				}
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

			$pos = strrpos($route, " : ");
			if ($pos !== false) {
				$R1 = explode(" : ", $route);
				$route = $R1[0];
			}


			echo "<td>$drug</td>\n";
			echo "<td>$dose $units</td>\n";
			echo "<td>$route</td>\n";
			if ("IV" === $route || "IVPB" == $route || "INTRAVENOUS" === $route || "IV PIGGYBACK" === $route) {
				echo "<td>$fluidVol $fluidUnits</td>\n";
				echo "<td>$fluidType</td>\n";
				echo "<td>$infusionTime</td>\n";
			} else {
				echo "<td>N/A</td>\n";
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
				echo "</tr><tr><td colspan=\"7\">$instructions</td>\n";
			}
			echo "</tr>\n";
		}
	}
	else {
		echo "<tr><th>&nbsp;</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
	}
	?>
<!-- </tbody></table> -->
<?php
}
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>
    <?php 
    if (is_null($templatedata)) {
        echo "COMS Treatment Template - Error";
    }
    else {
        echo "COMS Treatment Template - " . $templatedata[0]['description'];
    }
    ?>
    </title>
	<link rel="stylesheet" type="text/css" href="/libs/ExtJS_4.1.0/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="../../js/COMS.css">
	<style>
	div.desc { font-weight: normal; font-style: italic;background:none; }
	.OEMRecord_Element .header th {
		text-align: center;
	}
	td.drug {
		font-weight: bold!important;
	}
	h1 {
		font-size:200%;
	}
	th h2 {
		font-size:150%;
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
	<h1><?php 
    if (is_null($templatedata)) {
        echo "COMS Treatment Template - Error";
    }
    else {
        echo "COMS Treatment Template - " . $templatedata[0]['description'];
    }
    ?></h1>
	</header>

	<section class="CCOrderSheet">
	<?php if (is_null($templatedata)) {
		echo "<h2 style=\"margin-top:3em; text-align: center;\">No Template Found</h2>";
	}
	else {
		renderTemplateHeading($templatedata[0], $references);

        echo "<table style=\"border:none;\" class=\"InformationTable\"><tbody>";
		if (isset($prehydrations) && isset($preinfusions)) {
			renderTherapy($templatedata[0], "Pre", $prehydrations, $preinfusions);
		}
		else {
			renderTherapy($templatedata[0], "Pre", "", "");
		}

        echo "<tr><td style=\"border-left-width: 0; border-right-width:0; colspan=\"8\">&nbsp;</td></tr>";
		if (isset($regimens)) {
			renderTherapy($templatedata[0], "", $regimens, "");
		}
		else {
			renderTherapy($templatedata[0], "", "", "");
		}

        echo "<tr><td style=\"border-left-width: 0; border-right-width:0; colspan=\"8\">&nbsp;</td></tr>";
		if (isset($posthydrations)) {
			renderTherapy($templatedata[0], "Post", $posthydrations, $postinfusions);
		}
		else {
			renderTherapy($templatedata[0], "Post", "", "");
		}
        echo "</table>";
	}
	?>
	</section>
</div>

<?php
ob_end_flush();
?>
</body>
</html>