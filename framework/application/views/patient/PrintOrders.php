<?php 
// PatientID = 6855D2FD-27A1-E111-903E-000C2935B86F
require_once "/ChromePhp.php";
// ChromePhp::log("\nStart of PrintOrders output");
ob_start();		// See article - http://digitalpbk.com/php/warning-cannot-modify-header-information-headers-already-sent

/**
 * Global Arrays used in this function
 * masterRecord
 * PatientInfo
 * oemRecords
 * oemMap
 * PatientDetailMap
 * Use get_defined_vars() to get ALL the defined variables in this scope
 **/



$mRecord = $masterRecord[0];
$temp = json_encode($mRecord);

$pInfo = $PatientInfo;
$temp = json_encode($pInfo);

$pTemplateHistory = $patientTemplate;	// List of PAST templates applied to this patient. The CURRENTLY applied template is NOT in this list!
$temp = json_encode($pTemplateHistory);

$patientAllergies = $patientAllergies;
$temp = json_encode($patientAllergies);

// Information about the current treatment
$pDetailMap = $PatientDetailMap[$pInfo['id']];
$temp = json_encode($pDetailMap);

if (!is_null($oemrecords) && is_null($oemsaved)) {
    $numeoemrecords = count($oemrecords);
    $numtemplates = count($masterRecord);
	ChromePhp::log("# OEM Records = $numeoemrecords");
	ChromePhp::log("# Templates = $numtemplates");
}

function Log_drug_dose_admin_table($doseNum, $instru, $drug, $dose, $units, $calcDose, $admin, $adminTime, $fluid, $vol, $flowRate, $infusionTime) {
}

function drug_dose_admin_table($drug, $sequence, $doseNum, $instru, $dose, $units, $calcDose, $admin, $adminTime, $fluid, $vol, $flowRate, $infusionTime) {
?>
		<tr style="vertical-align: top;">
			<td class="drug" style="text-align: center;"><?php echo $sequence; ?></td>
			<td class="drug"><?php echo $drug . "<div class=\"desc\">$instru</div>"; ?>

		<?php
	if ("IV" === $admin || "IVPB" === $admin) {
		?>
		<table width=100%>
		<tr class="header">
			<th>Fluid Type</th>
			<th>Fluid Volume</th>
			<th>Flow Rate</th>
			<th>Infusion Time</th>
		</tr>
		<tr>
			<td><?php echo $fluid; ?></td>
			<td><?php echo $vol; ?> ml</td>
			<td><?php echo $flowRate; ?> ml/hr</td>
			<td><?php echo $infusionTime; ?></td>
		</tr>
		</table>
		<?php
	}
?>			
			
			
			
			</td>
			<td><?php echo $dose . " " . $units; ?></td>
			<td><?php echo $calcDose; ?></td>
			<td><?php echo $admin; ?></td>
			<td><?php echo $adminTime; ?></td>
		</tr>
<?php
}

function renderTherapyData($oemrecord, $oemDetails, $tag) {
	$hydrations = $oemDetails[$tag . 'Therapy'];
	$numMeds = count($hydrations);




	$temp = json_encode($hydrations);
	if ("Pre" === $tag) {
		ChromePhp::log("$tag Therapy Hydrations\n$temp\n\n");
	}
	if ("Post" === $tag || "" === $tag) {
		if (strlen($temp) < 700) {
			ChromePhp::log("$tag Therapy Hydrations\n$temp\n\n");
		}
		else {
//			echo "POST - <br>";
//			var_dump($temp);
//			echo "<hr>";
		}
	}


	if ("" !== $tag) {
		$infusions = $oemDetails[$tag . 'TherapyInfusions'];
		$temp = json_encode($infusions);
		ChromePhp::log("$tag Therapy Infusions\n$temp\n\n");
	}

?>

			<tr class="TherapyType"><th colspan="6"><?php echo "$tag Therapy - "; if ($numMeds > 0) { echo "<span>" . $oemrecord[$tag . 'TherapyInstr'] . "</span>"; } ?></th></tr>
			<tr class="header">
				<th>Sequence #</th>
				<th>Drug</th>
				<th>Dose</th>
				<th>Calculated&nbsp;Dose</th>
				<th>Administration</th>
				<th>Administration&nbsp;Time</th>
			</tr>
<?php
			if ($numMeds) {
				$hydrationCount = 1;
				foreach ($hydrations as $hydration) {
					$numInfusions = 0;
					$adminTime = "";
					// Array Index is case sensitive, but data coming back is in different case depending on table :(
					if (array_key_exists("Sequence", $hydration)) {
						$sequence = $hydration["Sequence"];
					}
					else {
						$sequence = $hydration["sequence"];
					}

					if ("" !== $tag) {
						$myinfusions = $infusions[$hydration['id']];
						$numInfusions = count($myinfusions);
					}

					if (0 === $numInfusions) {
						if ("" === $tag) {
							drug_dose_admin_table(
								$hydration["drug"],
								$sequence,
								"", 
								$hydration["instructions"], 
								$hydration['regdose'], 
								$hydration['regdoseunit'], 
								$hydration['bsaDose'], 
								$hydration['route'],
								$hydration['adminTime'],
								$hydration['fluidType'], 
								$hydration['flvol'], 
								$hydration['flowRate'], 
								$hydration['infusion']
							);
						}
						else {
							drug_dose_admin_table("", "", "", "", "", "", "", "", "", "", "", "", "");
						}
					}
					else if (1 === $numInfusions) {
						$infusion = $myinfusions[0];
						drug_dose_admin_table(
							$hydration["drug"],
							$sequence,
							"", 
							$hydration["description"], 
							$infusion['amt'], 
							$infusion['unit'], 
							$infusion['bsaDose'], 
							$infusion['type'],
							$adminTime,
							$infusion['fluidType'], 
							$infusion['fluidVol'], 
							$infusion['flowRate'], 
							$infusion['infusionTime']
						);
					}
					else if ($numInfusions > 1) {
						$infusionCount = 1;
						foreach ($myinfusions as $infusion) {
							drug_dose_admin_table(
								$infusion["drug"], 
								$sequence,
								$infusionCount, 
								$hydration["description"], 
								$infusion['amt'], 
								$infusion['unit'], 
								$infusion['bsaDose'], 
								$infusion['type'],
								$adminTime,
								$infusion['fluidType'], 
								$infusion['fluidVol'], 
								$infusion['flowRate'], 
								$infusion['infusionTime']
							);
							$infusionCount++;
						}
					}
					$hydrationCount++;
				}
			}
			else {
				drug_dose_admin_table("", "", "", "None for this day", "", "", "", "", "", "", "", "", "");
			}
}

function OEM_DrugData($pInfo, $masterRecord, $mRecord, $pDetailMap, $oemrecords, $oemsaved, $oemMap) {
?>
<table border="1" width="100%" class="Therapy OEMRecord_Element InformationTable">
	<colgroup width="5%"></colgroup>
	<colgroup width="55%"></colgroup>
	<colgroup width="15%"></colgroup>
	<colgroup width="5%"></colgroup>
	<colgroup width="5%"></colgroup>
	<colgroup width="5%"></colgroup>
	<tbody>
<?php
		$loopVar = 1;
		foreach ($oemrecords as $oemrecord) {
			$oemDetails = $oemMap[$oemrecord['TemplateID']];
			$temp = json_encode($oemrecord);
			$temp = json_encode($oemDetails);
			$cycle = $oemrecord['CourseNum'];
			$numCycles  = $mRecord['CourseNumMax'];
			$dayNum = $oemrecord['Day'];
			$date =  $oemrecord['AdminDate'];
?>
			<tr><th colspan="6" style="text-align:left;">
			<table width=100% class="center-Header"><tr>
				<th><h2><?php echo "Cycle $cycle (of $numCycles)"; ?></h2></th>
				<th><h2><?php echo "Admin Day: $dayNum"; ?></h2></th>
				<th><h2><?php echo "Date: $date"; ?></h2></th>
			</tr></table>
			</th></tr>
<?php 
			renderTherapyData($oemrecord, $oemDetails, "Pre"); 
			renderTherapyData($oemrecord, $oemDetails, ""); 
			renderTherapyData($oemrecord, $oemDetails, "Post"); 
			$loopVar++;
		}
ob_end_flush();
?>
	</tbody>
</table>

<?php
}

function OEM_PatientInfo($pInfo, $mRecord, $pDetailMap) {
?>
<table border="1" width="100%" class="InformationTable">

<tr>
<th>Age:</th><td><?php echo $pInfo['Age'] ?></td>
<th>Date of Birth:</th><td><?php echo $pInfo['DOB'] ?></td>
<th colspan="2">Gender:</th><td colspan="2"><?php echo $pInfo['Gender'] ?></td>
<!-- <th>DFN:</th><td><?php echo $pInfo['DFN'] ?></td> -->
</tr>

<tr>
<th colspan="2">BSA Weight Method:</th><td colspan="2"><?php echo $pDetailMap['WeightFormula'] ?></td>
<th colspan="2">BSA Method:</th><td colspan="2"><?php echo $pDetailMap['BSAFormula'] ?></td>
</tr>
<tr>
<th>Goal:</th><td><?php echo $pDetailMap['Goal']; ?></td>
<th>Clinical Trial:</th><td><?php echo ("" === $mRecord['ClinicalTrial'] ? "NOT a clinical trial" : $mRecord['ClinicalTrial']) ; ?></td>
<th colspan="2">Performance&nbsp;Status:</th><td colspan="2"><?php echo $mRecord['PerfStatus']; ?></td>
</tr>

<tr>
<th colspan="2">Type(s) of Cancer:</th><td colspan="2"><?php echo $mRecord['DiseaseRecord'][0]['Name']; ?></td>
<th colspan="2">Stage:</th><td colspan="2"><?php echo $mRecord['DiseaseStage']; ?></td>
</tr>

<tr><th>Allergies:</th><td colspan="7">
<table width="100%"><tbody><tr><th style="text-align: center;">Name</th><th style="text-align: center;">Type</th><th style="text-align: center;">Comment</th></tr></tbody></table>

</td></tr>


<tr><th>Regimen:</th><td colspan="7"><?php echo $pDetailMap['TemplateName']; ?></td></tr>
<tr><th>Description:</th><td colspan="7"><?php echo $pDetailMap['TemplateDescription']; ?></td></tr>
<tr><th>Treatment Start</th><td colspan="7"><?php echo $pDetailMap['TreatmentStart']; ?></td></tr>
<tr><th>Treatment End</th><td colspan="7"><?php echo $pDetailMap['TreatmentEnd']; ?></td></tr>
<tr>
<th colspan="2">Regimen Instructions:</th><td colspan="4"><?php echo $mRecord['regimenInstruction']; ?></td>
<th >Regimen Status:</th><td><?php echo $mRecord['Status']; ?></td></tr>

<tr>
<th>No.&nbsp;of&nbsp;Cycles:</th><td><?php echo $mRecord['CourseNumMax']; ?></td>
<th>Cycle&nbsp;Length:</th><td colspan="5"><?php echo $mRecord['length'] . " " . $mRecord['CycleLengthUnit']; ?></td>
</tr>

<tr><th>Neutropenia&nbsp;Risk:</th><td><?php echo $mRecord['fnRisk']; ?>%</td>
<th>Recommendation:</th>
<td colspan="5">
The 2005 Update Committee agreed unanimously that reduction in febrile neutropenia(FN) is an important clinical outcome that justifies the use of CSFs, 
regardless of impact on other factors, when the risk of FN is approximately 20% and no other equally effective regimen that does not require CSFs is available. 
Primary prophylaxis is recommended for the prevention of FN in patients who are at high risk based on age, medical history, disease characteristics, and 
myelotoxicity of the chemotherapy regimen. 
CSF use allows a modest to moderate increase in dose-density and/or dose-intensity of chemotherapy regimens. 
Dose-dense regimens should only be used within an appropriately designed clinical trial or if supported by convincing efficacy data. 
Prophylactic CSF for patients with diffuse aggressive lymphoma aged 65 years and older treated with curative chemotherapy (CHOP or more aggressive regimens) 
should be given to reduce the incidence of FN and infections. 
Current recommendations for the management of patients exposed to lethal doses of total body radiotherapy, but not doses high enough to lead to certain death 
due to injury to other organs, includes the prompt administration of CSF or pegylated G-CSF
</td></tr>
<tr>
<th rowspan="2">Emesis&nbsp;Risk:</th>
<td rowspan="2"><?php echo $mRecord['emoLevel']; ?></td>
<th>ASCO Recommendation:</th><td colspan="5"><?php echo ""; ?></td></tr>
<tr><th>NCCN Recommendation:</th><td colspan="5"><?php echo ""; ?></td></tr>

</table>

<?php
}
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Order Entry Management Information - for <?php echo $pInfo['name']; ?></title>
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
		margin-top: 1em;
	}
	th { 
		text-align: right; 
	}

	.center-Header th {
		text-align: center!important;
	}
	</style>
</head>
<body style="background: white;">
<div id="application" style="width:98%;margin: 1em auto;border:none;">
	<header role="banner">
	<h1>Order Entry Management (OEM) Information</h1>

	
	
	<?php
		if($mRecord) {
	?>
	<h2>Patient: <?php echo $pInfo['name']; ?></h2>
	</header>

	<section>
	<?php 
	OEM_PatientInfo($pInfo, $mRecord, $pDetailMap); 
	OEM_DrugData($pInfo, $masterRecord, $mRecord, $pDetailMap, $oemrecords, $oemsaved, $oemMap);
	?>
	</section>
	<?php 
		}
		else {
	?>
	<h2>Patient Data Not Available</h2>
	</header>
	<?php
		}
	?>


	<footer>
	</footer>
</div>
</body>
</html>
