<?php 
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

function drug_dose_admin_table($params) {
	// error_log("All Defined Variables within drug_dose_admin_table()- " . json_encode(get_defined_vars()));
	// error_log("drug_dose_admin_table - Params = " . json_encode($params));
?>

		<tr style="vertical-align: top;">
			<td class="drug" style="text-align: center;"><?php echo $params["sequence"]; ?></td>
			<td class="drug"><?php echo $params["drug"] . "<div class=\"desc\">" . $params["instr"] . "</div>"; ?>
		<?php
	if ("IV" === $params["admin"] || "IVPB" === $params["admin"]) {
?>
		<table width=100%>
		<tr class="header">
			<th>Fluid Type</th>
			<th>Fluid Volume</th>
			<th>Flow Rate</th>
			<th>Infusion Time</th>
		</tr>
		<tr>
			<td><?php echo $params["fluid"]; ?></td>
			<td><?php echo $params["vol"]; ?> ml</td>
			<td><?php echo $params["flowRate"]; ?> ml/hr</td>
			<td><?php echo $params["infusionTime"]; ?></td>
		</tr>
		</table>
<?php
	}
?>
			</td>
			<td><?php echo $params['dose'] . " " . $params['units']; ?></td>
			<td><?php echo $params["calcDose"]; ?></td>
			<td><?php echo $params["admin"]; ?></td>
			<td><?php echo $params["adminTime"]; ?></td>
		</tr>
<?php
}









function renderTherapyData($pInfo, $oemrecord, $oemDetails, $tag) {
	// error_log("All Defined Variables within renderTherapyData()-     " . json_encode(get_defined_vars()));
	$hydrations = $oemDetails[$tag . 'Therapy'];
	$numMeds = count($hydrations);
	$temp = json_encode($hydrations);

	if ("" !== $tag) {
		$infusions = $oemDetails[$tag . 'TherapyInfusions'];
		$temp = json_encode($infusions);
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
			$hDrug = $hydration['drug'];
			if (array_key_exists ( 'route' , $hydration ) && isset($hydration['route'])) {
				$hRoute = $hydration['route'];
			}
			else {
				$hRoute = "";
			}
			$pos = strrpos($hDrug, " : ");
			if ($pos !== false) {
				$R1 = explode(" : ", $hDrug);
				$hDrug = $R1[0];
			}
			$pos = strrpos($hRoute, " : ");
			if ($pos !== false) {
				$R1 = explode(" : ", $hRoute);
				$hRoute = $R1[0];
			}
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
				$params = array();
				if ("" === $tag) {
					$doseF = $hydration['regdose'];
					$unitsF = $hydration['regdoseunit'];
					$calcDose = $hydration['bsaDose'];
					if (null === $calcDose || "" === $calcDose) {
						$calcDoseA = $pInfo["Orders"]->BSA_DosingCalc($pInfo["BSA_Prep"], $doseF, $unitsF);
						$calcDose = $calcDoseA["dose"] . " " . $calcDoseA["unit"];
					}
					$params["pInfo"] = $pInfo;
					$params["drug"] = $hDrug;
					$params["sequence"] = $sequence;
					$params["doseNum"] = "";
					$params["instr"] = $hydration["instructions"];
					$params["dose"] = $doseF;
					$params["units"] = $unitsF;
					$params["calcDose"] = $calcDose;
					$params["admin"] = $hRoute;
					$params["adminTime"] = $hydration['adminTime'];
					$params["fluid"] = $hydration['fluidType'];
					$params["vol"] = $hydration['flvol'];
					$params["flowRate"] = $hydration['flowRate'];
					$params["infusionTime"] = $hydration['infusion'];
				}
				else {
					$params["pInfo"] = "";
					$params["drug"] = "";
					$params["sequence"] = "";
					$params["doseNum"] = "";
					$params["instr"] = "";
					$params["dose"] = "";
					$params["units"] = "";
					$params["calcDose"] = "";
					$params["admin"] = "";
					$params["adminTime"] = "";
					$params["fluid"] = "";
					$params["vol"] = "";
					$params["flowRate"] = "";
					$params["infusionTime"] = "";
				}
				drug_dose_admin_table($params);
			}
			else if (1 === $numInfusions) {
				$infusion = $myinfusions[0];
				$iDrug = $hydration["drug"];
				$iRoute = $infusion['type'];
				$pos = strrpos($iDrug, " : ");
				if ($pos !== false) {
					$R1 = explode(" : ", $iDrug);
					$iDrug = $R1[0];
				}
				$pos = strrpos($iRoute, " : ");
				if ($pos !== false) {
					$R1 = explode(" : ", $iRoute);
					$iRoute = $R1[0];
				}

					$doseF = $infusion['amt'];
					$unitsF = $infusion['unit'];
					$calcDose = $infusion['bsaDose'];
					if (null === $calcDose || "" === $calcDose) {
						$calcDoseA = $pInfo["Orders"]->BSA_DosingCalc($pInfo["BSA_Prep"], $doseF, $unitsF);
						$calcDose = $calcDoseA["dose"] . " " . $calcDoseA["unit"];
					}

				$params = array();
				$params["pInfo"] = $pInfo;
				$params["drug"] = $iDrug;
				$params["sequence"] = $sequence;
				$params["doseNum"] = "";
				$params["instr"] = $hydration["description"];
				$params["dose"] = $doseF;
				$params["units"] = $unitsF;
				$params["calcDose"] = $calcDose;
				$params["admin"] = $iRoute;
				$params["adminTime"] = $adminTime;
				$params["fluid"] = $infusion['fluidType'];
				$params["vol"] = $infusion['fluidVol'];
				$params["flowRate"] = $infusion['flowRate'];
				$params["infusionTime"] = $infusion['infusionTime'];
				drug_dose_admin_table($params);
			}

			else if ($numInfusions > 1) {
				$infusionCount = 1;
				foreach ($myinfusions as $infusion) {
					$iDrug = $infusion["drug"];
					$iRoute = $infusion['type'];

					$pos = strrpos($iDrug, " : ");
					if ($pos !== false) {
						$R1 = explode(" : ", $iDrug);
						$iDrug = $R1[0];
					}
					$pos = strrpos($iRoute, " : ");
					if ($pos !== false) {
						$R1 = explode(" : ", $iRoute);
						$iRoute = $R1[0];
					}

					$doseF = $infusion['amt'];
					$unitsF = $infusion['unit'];
					$calcDose = $infusion['bsaDose'];
					if (null === $calcDose || "" === $calcDose) {
						$calcDoseA = $pInfo["Orders"]->BSA_DosingCalc($pInfo["BSA_Prep"], $doseF, $unitsF);
						$calcDose = $calcDoseA["dose"] . " " . $calcDoseA["unit"];
					}

					$params = array();
					$params["pInfo"] = $pInfo;
					$params["drug"] = "iDrug2 - $iDrug";
					$params["sequence"] = $sequence;
					$params["doseNum"] = $infusionCount;
					$params["instr"] = $hydration["description"];
					$params["dose"] = $doseF;
					$params["units"] = $unitsF;
					$params["calcDose"] = $calcDose;
					$params["admin"] = $iRoute;
					$params["adminTime"] = $adminTime;
					$params["fluid"] = $infusion['fluidType'];
					$params["vol"] = $infusion['fluidVol'];
					$params["flowRate"] = $infusion['flowRate'];
					$params["infusionTime"] = $infusion['infusionTime'];
					drug_dose_admin_table($params);
					$infusionCount++;
				}
			}
			$hydrationCount++;
		}
	}
	else {
		$params = array();
		$params["pInfo"] = $pInfo;
		$params["drug"] = "";
		$params["sequence"] = "";
		$params["doseNum"] = "";
		$params["instr"] = "None for this day";
		$params["dose"] = "";
		$params["units"] = "";
		$params["calcDose"] = "";
		$params["admin"] = "";
		$params["adminTime"] = "";
		$params["fluid"] = "";
		$params["vol"] = "";
		$params["flowRate"] = "";
		$params["infusionTime"] = "";
		drug_dose_admin_table($params);
	}
}

function OEM_DrugData($pInfo, $masterRecord, $mRecord, $pDetailMap, $oemrecords, $oemsaved, $oemMap) {
	// error_log("All Defined Variables within OEM_DrugData()- " . json_encode(get_defined_vars()));
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
			renderTherapyData($pInfo, $oemrecord, $oemDetails, "Pre"); 
			renderTherapyData($pInfo, $oemrecord, $oemDetails, ""); 
			renderTherapyData($pInfo, $oemrecord, $oemDetails, "Post"); 
			$loopVar++;
		}
ob_end_flush();

?>
	</tbody>
</table>

<?php
}





















function OEM_PatientInfo($pInfo, $mRecord, $pDetailMap) {
	// error_log("All Defined Variables within OEM_PatientInfo()- " . json_encode(get_defined_vars()));
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
<td colspan="5"><?php echo html_entity_decode(htmlspecialchars_decode($mRecord["fnrDetails"])); ?>%</td>

</td></tr>
<tr>
<th rowspan="2">Emesis&nbsp;Risk:</th>
<td rowspan="2"><?php echo $mRecord['emoLevel']; ?></td>

<th>Recommendation:</th><td colspan="5"><?php echo html_entity_decode(htmlspecialchars_decode($mRecord["emodetails"])); ?></td></tr>

</table>

<?php
}

/*************************** END OF FUNCTION DEFINITIONS ***************************/



// error_log("All GLOBALLY Defined Variables - " . json_encode(get_defined_vars()));
$mRecord = $masterRecord[0];
$pInfo = $PatientInfo;
$PatientID = $pInfo["id"];

$pTemplateHistory = $patientTemplate;	// List of PAST templates applied to this patient. The CURRENTLY applied template is NOT in this list!
$patientAllergies = $patientAllergies;

// Information about the current treatment
$pDetailMap = $PatientDetailMap[$pInfo['id']];


$controller = 'OrdersController';
$OrdersController = new $controller('Orders', 'orders', null);
$BSA_Prep = $OrdersController->Prep4BSA_DosingCalc($PatientID);      // Do once at start
$pInfo["BSA_Prep"] = $BSA_Prep;
$pInfo["Orders"] = $OrdersController;


$doseF = 32;
$unitsF = "mg/m2";
$rslts = $pInfo["Orders"]->BSA_DosingCalc($pInfo["BSA_Prep"], $doseF, $unitsF);


if (!is_null($oemrecords) && is_null($oemsaved)) {
    $numeoemrecords = count($oemrecords);
    $numtemplates = count($masterRecord);
}


?>


<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>COMS Chemotherapy Orders for <?php echo $pInfo['name']; ?></title>
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
	<h1>COMS Chemotherapy Orders for <br><?php echo $pInfo['name']; ?></h1>
	<?php
		if($mRecord) {
	?>
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
