<?php
require_once "/ChromePhp.php";
ChromePhp::log("\nStart of PrintTemplate output");
ob_start();		// See article - http://digitalpbk.com/php/warning-cannot-modify-header-information-headers-already-sent

if (!is_null($templatedata)) {
	$temp = json_encode($templatedata);
	ChromePhp::log("Template Data\n" . $temp . "\n\n");

	$temp = json_encode($references);
	ChromePhp::log("References\n" . $temp . "\n\n");


/**
<section id="dspTemplateData-1087" class="x-container CCOrderSheet x-container-default" style="margin: 10px;">
<h1>CANCER CHEMOTHERAPY IV ORDER SHEET</h1>

<table><tbody><tr><td colspan="2"><table><tbody><tr><th>Max Number of Cycles:</th><td>4</td><th>Cycle Length:</th><td>4 Weeks</td></tr></tbody></table></td></tr><tr><th>Chemotherapy Regimen Name:</th><td>2012-2-0001-ABCD-CISPLATIN INJ,SOLN   50VINORELBINE INJ   25-20120614</td></tr><tr><th>Emetogenic level:</th><td>High</td></tr><tr><th>Febrile Neutropenia risk:</th><td>7 %</td></tr><tr><th>Reference:</th><td><table><tbody><tr><td>Winton T, Livingston R, Johnson D, et al. Vinorelbine plus cisplatin vs. observation in resected non-small-lung cancer. N Engl J Med 2005;352:2589-2597</td></tr><tr><td>(<a href="http://www.ncbi.nlm.nih.gov/pubmed/15972865" title="Link to PMID" target="_blank">Link to PMID</a>)</td></tr></tbody></table></td></tr></tbody></table><table border="1" class="InformationTable"><tbody><tr><th colspan="6" style="text-align: left; border: none !important;"><h2 style="text-align: left;">Pre Therapy</h2></th></tr><tr></tr><tr><th colspan="6" style="text-align: left; border: none !important; font-weight: normal;">Instructions: Administer as directed on Days 1 &amp; 8 prior to Cisplatin Chemotherapy</th></tr><tr></tr><tr class="TemplateHeader"><th>Sequence #</th><th>Drug</th><th>Dose</th><th>Route</th><th>Administration Day</th></tr><tr><th rowspan="2">1</th><td>APREPITANT CAP,ORAL   </td><td>125 mg  </td><td>Oral</td><td>1,8</td></tr><tr><th class="NoBorder">Fluid/Volume: </th><td class="NoBorder"></td><th class="NoBorder">Infusion Time: </th><td class="NoBorder" colspan="2"></td></tr><tr><th rowspan="2">2</th><td>DEXAMETHASONE TAB   </td><td>12 mg  </td><td>Oral</td><td>1,8</td></tr><tr><th class="NoBorder">Fluid/Volume: </th><td class="NoBorder"></td><th class="NoBorder">Infusion Time: </th><td class="NoBorder" colspan="2"></td></tr><tr><td colspan="5">Take on chemotherapy days</td></tr><tr><th rowspan="2">3</th><td>ONDANSETRON TAB   </td><td>24 mg  </td><td>Oral</td><td>1,8</td></tr><tr><th class="NoBorder">Fluid/Volume: </th><td class="NoBorder"></td><th class="NoBorder">Infusion Time: </th><td class="NoBorder" colspan="2"></td></tr><tr><td colspan="5">For chemotherapy days</td></tr></tbody></table><table border="1" class="InformationTable" style="border: thick solid blue; margin-top: 1em; margin-bottom: 1em;"><tbody><tr><th colspan="5" style="text-align: left; border: none !important;"><h2 style="text-align: left;">Therapy</h2></th></tr><tr></tr><tr><th colspan="5" style="text-align: left; border: none !important; font-weight: normal;">Instructions: Provide warm rice bags as needed for patient comfort</th></tr><tr></tr><tr class="TemplateHeader"><th>Sequence #</th><th>Drug</th><th>Dose</th><th>Route</th><th>Administration Day</th></tr><tr><th rowspan="2">1</th><td>CISPLATIN INJ,SOLN   </td><td>50 mg/m2</td><td>IV</td><td>1,8</td></tr><tr><th class="NoBorder">Fluid/Volume: </th><td class="NoBorder">250</td><th class="NoBorder">Infusion Time: </th><td class="NoBorder">1 hrs / 0 min</td></tr><tr><td colspan="5">Use Normal Saline</td></tr><tr><th rowspan="2">2</th><td>VINORELBINE INJ   </td><td>25 mg/m2</td><td>IVPB</td><td>1,8,15,22</td></tr><tr><th class="NoBorder">Fluid/Volume: </th><td class="NoBorder">25</td><th class="NoBorder">Infusion Time: </th><td class="NoBorder">0 hrs / 8 min</td></tr><tr><td colspan="5">Administer in Normal Saline over 6-10 minutes through line running Normal Saline</td></tr></tbody></table><table border="1" class="InformationTable"><tbody><tr><th colspan="6" style="text-align: left; border: none !important;"><h2 style="text-align: left;">Post Therapy</h2></th></tr><tr></tr><tr><th colspan="6" style="text-align: left; border: none !important; font-weight: normal;">Instructions: Administer or provide prescriptions to take as directed on specified days</th></tr><tr></tr><tr class="TemplateHeader"><th>Sequence #</th><th>Drug</th><th>Dose</th><th>Route</th><th>Administration Day</th></tr><tr><th rowspan="2">1</th><td>APREPITANT CAP,ORAL   </td><td>80 mg  </td><td>Oral</td><td>2-3, 9-10</td></tr><tr><th class="NoBorder">Fluid/Volume: </th><td class="NoBorder"></td><th class="NoBorder">Infusion Time: </th><td class="NoBorder" colspan="2"></td></tr><tr><td colspan="5">Patient to take by mouth daily on Days  2 &amp; 3 and 9 &amp; 10</td></tr><tr><th rowspan="2">2</th><td>DEXAMETHASONE TAB   </td><td>8 mg  </td><td>Oral</td><td>2-4, 9-11</td></tr><tr><th class="NoBorder">Fluid/Volume: </th><td class="NoBorder"></td><th class="NoBorder">Infusion Time: </th><td class="NoBorder" colspan="2"></td></tr><tr><td colspan="5">Patient to take 2 tablets (8mg total) by mouth daily on Days 2 thru 4 and Days 9 thru 11</td></tr><tr><th rowspan="2">3</th><td>PROCHLORPERAZINE TAB   </td><td>10 mg  </td><td>Oral</td><td>1-4</td></tr><tr><th class="NoBorder">Fluid/Volume: </th><td class="NoBorder"></td><th class="NoBorder">Infusion Time: </th><td class="NoBorder" colspan="2"></td></tr><tr><td colspan="5">Take 2 tablets (10mg total) by mouth every 6 hours as needed for nausea/vomiting</td></tr></tbody></table>

</section>
**/


} else {
    echo "{\"success\" : false, \"msg\" : \"No records found.\", \"frameworkErr\" : \"" . $frameworkErr . "\"}";
}


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
		$temp = json_encode($tData);
// 		ChromePhp::log("Therapy Data - \n $temp\n\n");

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
		if ("" !== $tag) {
			foreach($hydrations as $hydration) {
				$infusion = $infusions[$hydration['id']][0];
				$temp = json_encode($infusion);
				ChromePhp::log("Infusion - " . $temp);

				// Infusion - [{"id":"60C702AE-2FB6-E111-A560-000C2935B86F","amt":125,"unit":"mg","type":"Oral","bsaDose":null,"fluidType":"","fluidVol":0,"flowRate":"","infusionTime":"","Order_ID":null}] 
				$sequence = "";
				if (array_key_exists("Sequence", $hydration)) {
					$sequence = $hydration['Sequence'];
				}
				else {
					$sequence = $hydration['sequence'];
				}
		?>
		<tr>
		<?php if ("" === $hydration['description']) {?>
		<th><?php echo $sequence; ?></th>
		<?php } else { ?>
		<th rowspan="2"><?php echo $sequence; ?></th>
		<?php } ?>
		<td><?php echo $hydration['drug']; ?></td>
		<td><?php echo $infusion['amt']; ?></td>
		<td><?php echo $infusion['type']; ?></td>
		<?php if ("IV" === $infusion['type'] || "IVPB" == $infusion['type']) { ?>
		<td><?php echo $infusion['fluidVol']; ?></td>
		<td><?php echo $infusion['infusionTime']; ?></td>
		<?php } else { ?>
		<td><?php echo "N/A"; ?></td>
		<td><?php echo "N/A"; ?></td>
		<?php } ?>
		<td><?php echo $hydration['adminDay']; ?></td>

		<?php if ("" === $hydration['description']) {?>
		<?php } else { ?>
		</tr><tr><td colspan="6"><?php echo $hydration['description'] ?></td>
		<?php } ?>

		</tr>

	<?php
			}
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
		$temp = json_encode($prehydrations);
		ChromePhp::log("Hydrations - \n$temp\n\n");

        foreach ($templatedata as $oemrecord) {
			$temp = json_encode($oemrecord);
			ChromePhp::log("Template Data\n$temp\n\n");
		}
//		$temp = json_encode($templatedata);
//		ChromePhp::log("Template Data\n$temp\n\n");
		renderTemplateHeading($templatedata[0], $references);
		renderTherapy($templatedata[0], "Pre", $prehydrations, $preinfusions);
		renderTherapy($templatedata[0], "", "", "");
		renderTherapy($templatedata[0], "Post", $posthydrations, $postinfusions);
	}
	?>
	</section>
	<footer>
	</footer>
</div>

<?php
ob_end_flush();
?>
</body>
</html>