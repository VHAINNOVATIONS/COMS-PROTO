<?php 
require_once "/ChromePhp.php";
ChromePhp::log("  ");
ChromePhp::log("Start of PrintOrders output");


// var_dump ( get_defined_vars() );

			$temp = json_encode($patientTemplate[0]);
			ChromePhp::log("patientTemplate(0) - " . $temp);


/**
 * Global Arrays used in this function
 * masterRecord
 * PatientInfo
 * oemRecords
 * oemMap
 * PatientDetailMap
 * Use get_defined_vars() to get ALL the defined variables in this scope
 **/
$temp = json_encode($masterRecord);
ChromePhp::log("masterRecord");
ChromePhp::log($temp);


// echo json_encode(get_defined_vars ( )); 
//echo json_encode($PatientInfo);
$temp = json_encode($PatientInfo);
ChromePhp::log("Patient Info");
ChromePhp::log($temp);



$pInfo = $PatientInfo;
ChromePhp::log("Name - " . $pInfo["name"]); 
// PatientID = 6855D2FD-27A1-E111-903E-000C2935B86F

if (!is_null($oemrecords) && is_null($oemsaved)) {
    $numeoemrecords = count($oemrecords);
    $numtemplates = count($masterRecord);

ChromePhp::log("Number of OEM Records - $numeoemrecords");
ChromePhp::log("Number of Templates - $numtemplates");


//$temp = json_encode($oemrecords);
//ChromePhp::log("oemrecords" . $temp);


















// var_dump($oemrecords);
//echo "<hr>";
//echo "<hr>OEM Map<br>";
// var_dump($oemMap);
// $jsonArray = json_decode($jsonRecord); 
//echo "jsonArray<br>";
//echo $jsonArray;
//$jsonArray = json_encode($jsonRecord); 
//echo "jsonArray-String<br>";
//echo $jsonArray;
//echo "<hr>";


//$test = $jsonRecord['Test'];
//$records = $oemMap;		// $jsonRecord['records'];
//$FirstRecord = $oemMap['records'][0];


?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Order Entry Management Information - for <?php echo $pInfo["name"]; ?></title>
	<meta name="description" content="Simple HTML 5 Boilerplate">
	<meta name="author" content="Mike Barlow">

	<link rel="stylesheet" type="text/css" href="/libs/ExtJS_4.1RC1/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="/js/UAT_18June2012/COMS.css">

	<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body>
	<header role="banner">
	<h1>Order Entry Management (OEM) Information</h1>
	<h2>Patient: <?php echo $pInfo['name']; ?></h2>
 <?php 
// $allRecords = $jsonArray->records;

//$aRecord = $allRecords[0];
//echo "All Records - " . $FirstRecord['Last_Name'];

  ?>
	</header>

	<section>
	<hr>

<style> th { text-align: right; }</style>
<table border="1" width="100%" class="Therapy InformationTable">



<tr>
<th>Age:</th><td><?php echo $pInfo['Age'] ?></td>
<th>Date of Birth:</th><td><?php echo $pInfo['DOB'] ?></td>
<th>Gender:</th><td><?php echo $pInfo['Gender'] ?></td>
</tr>

<tr><th>DFN:</th><td><?php echo $pInfo['DFN'] ?></td></tr>

<tr><th>Regimen:</th><td colspan="5"><?php echo $masterRecord[0]['name'] . "<br>" . $patientTemplate[0]['templatename']; ?></td></tr>
<tr>
<th>No.&nbsp;of&nbsp;Cycles:</th><td><?php echo $masterRecord[0]['CourseNumMax']; ?></td>
<th>Cycle&nbsp;Length:</th><td colspan="3"><?php echo $masterRecord[0]['length'] . " " . $masterRecord[0]['CycleLengthUnit']; ?></td>
</tr>

<tr><th>Neutropenia&nbsp;Risk:</th><td><?php echo $masterRecord[0]['fnRisk']; ?>%</td>
<th>Recommendation:</th>
<td colspan="3">
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
<td rowspan="2"><?php echo $masterRecord[0]['emoLevel']; ?></td>
<th>ASCO Recommendation:</th><td colspan="3"><?php echo ""; ?></td></tr>
<tr><th>NCCN Recommendation:</th><td colspan="3"><?php echo ""; ?></td></tr>

<tr><th>Goal:</th><td><?php echo $masterRecord[0]['Goal']; ?></td>
<th>Performance&nbsp;Status:</th><td colspan="3"><?php echo $masterRecord[0]['PerfStatus']; ?></td></tr>
</table>








<!--
<table border="1" width="100%" class="Therapy InformationTable">
<colgroup width=12%></colgroup>
<colgroup width=15%></colgroup>
<colgroup width=12%></colgroup>
<colgroup width=61%></colgroup>

<thead><tr><th colspan="4" class="large">Order Entry Management (<abbr title="Order Entry Management">OEM</abbr>) Information <span style="font-weight: normal;">- for Patient: {PatientName}</span></th></tr></thead>
<tr><th align="right">Regimen:</th><td colspan="3">{RegimenName}</td></tr>
<tr><th align="right">Description</th><td colspan="3">{RegimenDescription}</td></tr>
<tr><th align="right">Treatment Start:</th><td colspan="3">{TreatmentStart}</td></tr>
<tr><th align="right">Treatment End:</th><td colspan="3">{TreatmentEnd}</td></tr>

<tr class="MultiLineRow">
<th>Neutropenia&nbsp;Risk:</th>
<td><?php echo $masterRecord[0]['fnRisk']; ?>%</td>
<th>Recommendation:</th>
<td>The 2005 Update Committee agreed unanimously that reduction in febrile neutropenia(FN) is an important clinical outcome that justifies the use of CSFs, 
regardless of impact on other factors, when the risk of FN is approximately 20% and no other equally effective regimen that does not require CSFs is available. 
Primary prophylaxis is recommended for the prevention of FN in patients who are at high risk based on age, medical history, disease characteristics, and 
myelotoxicity of the chemotherapy regimen. 
CSF use allows a modest to moderate increase in dose-density and/or dose-intensity of chemotherapy regimens. 
Dose-dense regimens should only be used within an appropriately designed clinical trial or if supported by convincing efficacy data. 
Prophylactic CSF for patients with diffuse aggressive lymphoma aged 65 years and older treated with curative chemotherapy (CHOP or more aggressive regimens) 
should be given to reduce the incidence of FN and infections. 
Current recommendations for the management of patients exposed to lethal doses of total body radiotherapy, but not doses high enough to lead to certain death 
due to injury to other organs, includes the prompt administration of CSF or pegylated G-CSF
</td>
</tr>
<tr class="MultiLineRow">
<th>Emesis Risk:</th>
<td><?php echo $masterRecord[0]['emoLevel']; ?></td>
<th>Recommendation:</th>
<td>
<abbr title="American Society of Clinical Oncology">ASCO</abbr><p>{ELevelRecommendationASCO}</p>
<abbr title="National Comprehensive Cancer Network">NCCN</abbr><p>{ELevelRecommendationNCCN}</p>
</td>
</tr>

<tr><th>Goal</th><td colspan="3"><?php echo $masterRecord[0]['Goal']; ?></td></tr>
<tr><th>Performance&nbsp;Status</th><td colspan="3"><?php echo $masterRecord[0]['PerfStatus']; ?></td></tr>
</table>
-->








<h2>OEM Records</h2>
<!--
2013-2-0001-ABCD-5-FLUOROURACIL FLUOROURACIL INJ,SOLN5-20131108<br>
MWB-Test for ND<br>
<br>
Pre: 5-FLUOROURACIL FLUOROURACIL INJ,SOLN	5 mg	Oral	1-10<br>
Therapy: 5-FLUOROURACIL FLUOROURACIL INJ,SOLN	5 MicroGram	Oral	1-10<br>
Post: ADRIAMYCIN 50MG DOXORUBICIN INJ	5 mg	Oral	1-10<br>
<br>
-->
<?php
foreach ($oemrecords as $record) {
//	var_dump($record);

	$DetailsID = $record['TemplateID'];
	$Details = $oemMap[$DetailsID];

//	echo "<br>A Record - $Details<br>";


$Pre = $Details['PreTherapy'][0];

$PreDrug = $Pre['drug'];
$PreDesc = $Pre['description'];
$PreFluVol = $Pre['fluidVol'];
$PreFluRage = $Pre['flowRate'];
$PreAdminDay = $Pre['adminDay'];


//$Details['PreTherapyInfusions'];
//$Details['PostTherapy'];
//$Details['PostTherapyInfusions'];
//$Details['Therapy'];


/**
{
    "PreTherapy": [
        {
            "id": "A03B66AF-9A48-E311-9EF3-000C2935B86F",
            "drug": "5-FLUOROURACIL FLUOROURACIL INJ,SOLN",
            "description": "",
            "fluidVol": null,
            "flowRate": null,
            "adminDay": "1-10",
            "infusionTime": null,
            "Sequence": 1,
            "adminTime": "",
            "drugid": "7A95474E-A99F-E111-903E-000C2935B86F",
            "type": "Pre",
            "Order_ID": "9F3B66AF-9A48-E311-9EF3-000C2935B86F"
        }
    ],
    "PreTherapyInfusions": {
        "A03B66AF-9A48-E311-9EF3-000C2935B86F": [
            {
                "id": "A13B66AF-9A48-E311-9EF3-000C2935B86F",
                "amt": 5,
                "unit": "mg",
                "type": "Oral",
                "bsaDose": null,
                "fluidType": "D5W",
                "fluidVol": 0,
                "flowRate": "",
                "infusionTime": "",
                "Order_ID": "9F3B66AF-9A48-E311-9EF3-000C2935B86F"
            }
        ]
    },
    "PostTherapy": [
        {
            "id": "C73B66AF-9A48-E311-9EF3-000C2935B86F",
            "drug": "ADRIAMYCIN 50MG DOXORUBICIN INJ",
            "description": "",
            "fluidVol": null,
            "flowRate": null,
            "adminDay": "1-10",
            "infusionTime": null,
            "Sequence": 1,
            "adminTime": "",
            "drugid": "7E95474E-A99F-E111-903E-000C2935B86F",
            "type": "Post",
            "Order_ID": "C63B66AF-9A48-E311-9EF3-000C2935B86F"
        }
    ],
    "PostTherapyInfusions": {
        "C73B66AF-9A48-E311-9EF3-000C2935B86F": [
            {
                "id": "C83B66AF-9A48-E311-9EF3-000C2935B86F",
                "amt": 5,
                "unit": "mg",
                "type": "Oral",
                "bsaDose": null,
                "fluidType": "D5W",
                "fluidVol": 0,
                "flowRate": "",
                "infusionTime": "",
                "Order_ID": "C63B66AF-9A48-E311-9EF3-000C2935B86F"
            }
        ]
    },
    "Therapy": [
        {
            "id": "E53B66AF-9A48-E311-9EF3-000C2935B86F",
            "regnumber": null,
            "drug": "5-FLUOROURACIL FLUOROURACIL INJ,SOLN",
            "regdose": 5,
            "regdoseunit": "MicroGram",
            "regdosepct": null,
            "regreason": null,
            "patientdose": null,
            "patientdoseunit": null,
            "route": "Oral",
            "adminDay": "1-10",
            "flvol": "",
            "flunit": null,
            "infusion": "",
            "flowRate": "",
            "instructions": "",
            "sequence": 1,
            "adminTime": "",
            "drugid": "7A95474E-A99F-E111-903E-000C2935B86F",
            "bsaDose": null,
            "fluidType": "",
            "type": "Therapy",
            "Order_ID": "E43B66AF-9A48-E311-9EF3-000C2935B86F"
        }
    ]
}
 **/



$temp = json_encode($Details);
var_dump( $temp);
//ChromePhp::log("oemMap Details - " . $temp);


?>
<table>
<tr><th>Details ID:</th><td><?php echo $DetailsID; ?></td></tr>
<tr><th>Details:</th><td>
<?pre 
$Pre = $Details['PreTherapy'];
$PreDrug = $Pre['drug'];
$PreDesc = $Pre['description'];
$PreFluVol = $Pre['fluidVol'];
$PreFluRage = $Pre['flowRate'];
$PreAdminDay = $Pre['adminDay'];
?>
<table>
<tr><th>Drug</th><td><?php echo $PreDrug; ?></td></tr>
<tr><th>Desc</th><td><?php echo $PreDesc; ?></td></tr>
<tr><th>Fluid Vol</th><td><?php echo $PreFluiVol; ?></td></tr>
<tr><th>Fluid Range</th><td><?php echo $PreFluRange; ?></td></tr>
<tr><th>Admin Day</th><td><?php echo $PreAdminDay; ?></td></tr>
</table>




</td></tr>
<tr><th>ID:</th><td><?php echo $record['TemplateID']; ?></td></tr>
<tr><th>Cycle:</th><td><?php echo $record['CourseNum']; ?></td></tr>
<tr><th>Day:</th><td><?php echo $record['Day']; ?></td></tr>
<tr><th>Admin Date:</th><td><?php echo $record['AdminDate']; ?></td></tr>
<tr><th>Pre Therapy Instructions:</th><td><?php echo $record['PreTherapyInstr']; ?></td></tr>
</table>

TherapyInstr<br>
PostTherapyInstr<br>
PostTherapyInstr<br>




















<?php
}	// END of foreach look above

}	// End of IF statement from top of page
?>

	</section>

	<footer>
	</footer>

</body>
</html>
