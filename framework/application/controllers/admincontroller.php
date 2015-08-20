<?php
class AdminController extends Controller {



    function checkForErrors($errorMsg, $retVal) {

        if (null != $retVal && array_key_exists('error', $retVal)) {

            if (DB_TYPE == 'sqlsrv') {
                foreach ($retVal['error'] as $error) {
                    $errorMsg .= "SQLSTATE: " . $error['SQLSTATE'] . " code: " . $error['code'] . " message: " . $error['message'];
                }
            } else if (DB_TYPE == 'mysql') {
                $errorMsg .= $retVal['error'];
            }

            $this->set('frameworkErr', $errorMsg);

            return true;
        }

        return false;
    }
    
    function Globals(){
        $jsonRecord = array();
        $records = $this->Admin->getGlobals();
        if ($this->checkForErrors('Get Globals Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        $jsonRecord['success'] = true;
        $jsonRecord['total'] = count($records);
        $jsonRecord['records'] = $records;
        $this->set('jsonRecord', $jsonRecord);
    }


/***********************************************************************************************************************************************************
 *
 * This block of code is a "hack" to render the DB Table Schema as a Web Page
 * Part of this hack is to list out the primary and foreign key relationships between the tables 
 * (since there was none created when the tables were initially designed, and it's a code nightmare to try and fix at this point)
 *
 * The Schema page is rendered by calling the "schema" service call and passing the DB Table Name:
 *     Admin/schema/COMS_TEST_7
 *     http://coms-mwb.dbitpro.com:355/Admin/schema
 *
 *     Note: Constant Strings (e.g. Admin::GUIDDesc) are defined in the Admin Model file
 **/

	public $TableInfo = array(
		"Order_Status" => array(
			"Columns" => array(
				"Order_ID" => Admin::GUIDDesc,
				"Template_ID" => " to Master_Template",
				"PAT_ID" => " to Patient_Assigned_Templates",
				"Template_IDMT" => " to Master_Template",
				"Patient_ID" => " to Patient",
				"Drug_ID" => " to Medication_Hydration (as MH_ID)",

				"Date_Modified" => Admin::NullDesc,
				"Notes" => Admin::NoMeaningDesc,
				"FluidType" => Admin::NullDesc,
				"FluidVol" => Admin::NullDesc,
				"InfusionTime" => Admin::NullDesc,
				"AdminTime" => Admin::NullDesc,
				"FluidVol" => Admin::NullDesc,
				"FluidVol" => Admin::NullDesc,
				"FluidVol" => Admin::NullDesc,
				"FluidVol" => Admin::NullDesc,
				"Type" => Admin::NullDesc,
				"RegNum" => Admin::NullDesc,
				"RegDose" => Admin::NullDesc,
				"RegDoseUnit" => Admin::NullDesc,
				"RegDosePct" => Admin::BlankDesc,
				"RegReason" => Admin::BlankDesc,
				"PatientDose" => Admin::BlankDesc,
				"PatientDoseUnit" => Admin::BlankDesc,
				"flunit" => Admin::BlankDesc,
				"bsaDose" => Admin::BlankDesc,
				"Reason" => Admin::BlankDesc
			),
			"Keys" => array(
				"Order_ID" => "<em>Primary Key</em>",
				"Template_ID" => "Foreign Key",
				"PAT_ID" => "Foreign Key",
				"Template_IDMT" => "Foreign Key",
				"Patient_ID" => "Foreign Key",
				"Drug_ID" => "Foreign Key"
			)
		),
		"Med_Reminders" => array(
			"Columns" => array(
				"TemplateID" => " to Master_Template (as Template_ID)"
			),
			"Keys" => array(
				"MR_ID" => "<em>Primary Key</em>",
				"TemplateID" => "Foreign Key"
			)
		),
		"Template_Availability" => array(
			"Columns" => array(
				"TemplateID" => " to Master_Template (as Template_ID)"
			),
			"Keys" => array(
				"TemplateID" => "Foreign Key"
			)
		),
		"Medication_Hydration" => array(
			"Columns" => array(
				"Template_ID" => " to Master_Template"
			),
			"Keys" => array(
				"Template_ID" => "Foreign Key"
			)
		),
		"Template_Regimen" => array(
			"Columns" => array(
				"Template_ID" => " to Master_Template"
			),
			"Keys" => array(
				"Template_ID" => "Foreign Key"
			)
		),



		"BLANK" => array(
			"Columns" => array(
			),
			"Keys" => array(
			)
		)

	);

	function getColumnInfo($aColumn) {
		$tName = $aColumn["TABLE_NAME"];
		$cName = $aColumn["COLUMN_NAME"];

		if (array_key_exists($tName, $this->TableInfo)) {
			$t = $this->TableInfo[$tName]["Columns"];
			if (array_key_exists($cName, $t)) {
				return $t[$cName];
			}
		}
		return "";
	}
	function getColumnKeyInfo($aColumn) {
		$tName = $aColumn["TABLE_NAME"];
		$cName = $aColumn["COLUMN_NAME"];

		if (array_key_exists($tName, $this->TableInfo)) {
			$t = $this->TableInfo[$tName]["Keys"];
			if (array_key_exists($cName, $t)) {
				return $t[$cName];
			}
		}
		return "";
	}

	function getListofRowCounts() {
		$query = "select t.name TableName, i.rows Records
from sysobjects t, sysindexes i
where t.xtype = 'U' and i.id = t.id and i.indid in (0,1)
order by TableName";

		$records = $this->Admin->query( $query );
		if ($this->checkForErrors('Get Users Failed. ', $records)) {
			$this->set('jsonRecord', "$soPage<h2>ERROR</h2><p>\n" . $this->get('frameworkErr') . "</p></html>");
			return;
		}


		$RowCounts = array();
		foreach($records as $table) {
			$RowCounts[$table["TableName"]] = $table["Records"];
		}
		return $RowCounts;
	}

	function LookUpTableReferences() {
		return "<h2>LookUp Table References</h2>\n" .
			" <table>" .
			"   <tr><th style=\"width:10%;\">Lookup_Type</th><th style=\"width:20%;\">Name</th><th>Description</th></tr>\n" .
			//"   <tr><td>00</td><td>HYDRATION</td><td>InPatient</td></tr>\n" .
			"   <tr><td>01</td><td>Diagnosis</td><td>Diagnosis Type Lookup</td></tr>\n" .
			"   <tr><td>02</td><td>Drug</td><td>Drug Type Lookup</td></tr>\n" .
			"   <tr><td>03</td><td>TreatmentIndicator</td><td>Treatment Indicator Selector Values</td></tr>\n" .
			"   <tr><td>04</td><td>Regimen</td><td>Template Selector Values with Template Name in Description</td></tr>\n" .
			"   <tr><td>05</td><td>TIProtocol</td><td>Treatment Indicator Protocol Selector Values</td></tr>\n" .
			"   <tr><td>06</td><td>DiseaseCat</td><td>Disease Category Selector values</td></tr>\n" .
			"   <tr><td>07</td><td>DiseaseType</td><td>Disease Types (aka Cancer Types) with Abbreviations in Description</td></tr>\n" .
			"   <tr><td>08</td><td>DCBlood</td><td>Disease Blood Category Selector values</td></tr>\n" .
			"   <tr><td>09</td><td>References</td><td>LookUp for References with URI in Description</td></tr>\n" .
			"   <tr><td>10</td><td>PerformanceStatus</td><td>Patient Status with Sequence in Description</td></tr>\n" .
			"   <tr><td>11</td><td>Unit</td><td>Medication Unit Measurement</td></tr>\n" .
			"   <tr><td>12</td><td>Route</td><td>Regiment Route Type</td></tr>\n" .
			"   <tr><td>13</td><td>Emetogenic</td><td>Emetogenic Level</td></tr>\n" .
			"   <tr><td>14</td><td>LabTest</td><td>Lab Test Types</td></tr>\n" .
			"   <tr><td>15</td><td>Health</td><td>Care Provider	Health Care Provider Type</td></tr>\n" .
			"   <tr><td>16</td><td>Specimen</td><td>Specimen Type</td></tr>\n" .
			"   <tr><td>17</td><td>Lab</td><td>Test Site	Lab Test Site</td></tr>\n" .
			"   <tr><td>18</td><td>TimeFrameUnit</td><td>Various Time Frame Units</td></tr>\n" .
			"   <tr><td>19</td><td>Total_Courses_Max</td><td>5</td></tr>\n" .
			"   <tr><td>20</td><td>Cycle_Length_Max</td><td>8</td></tr>\n" .
			"   <tr><td>21</td><td>MasterTemplateRefXRef</td><td>Cross Reference from Master Template to References Lookups</td></tr>\n" .
			"   <tr><td>22</td><td>TemplateSource</td><td>Location of Templates</td></tr>\n" .
			"   <tr><td>23</td><td>DiseaseStage</td><td>Disease Stage</td></tr>\n" .
			"   <tr><td>24</td><td>User</td><td>User Name/ID</td></tr>\n" .
			"   <tr><td>25</td><td>TemplateAlias</td><td>Alias for template name</td></tr>\n" .
			"   <tr><td>26</td><td>NonFormaDrug</td><td>Add Non-Formulary Drug</td></tr>\n" .
			"   <tr><td>27</td><td>PatientAllergies</td><td>Allergies For a Patient</td></tr>\n" .
			"   <tr><td>28</td><td>FluidType</td><td>Fluid Types</td></tr>\n" .
			"   <tr><td>29</td><td>Allergies</td><td>Type of Allergy</td></tr>\n" .
			"   <tr><td>30</td><td>PatientAmputations</td><td>Amputations for a Patient</td></tr>\n" .
			"   <tr><td>32</td><td>Med</td><td>Listing	Programatically Unknown Medications Listing</td></tr>\n" .
			"   <tr><td>40</td><td>Temperature</td><td>Location	List of Locations where patients temperature can be taken from</td></tr>\n" .
			"   <tr><td>41</td><td>Emesis Risk ASCO Recommendation</td><td>ASCO Recommendations for Emesis Risk</td></tr>\n" .
			"   <tr><td>42</td><td>Emesis Risk NCCN Recommendation</td><td>NCCN Recommendations for Emesis Risk</td></tr>\n" .
			"   <tr><td>43</td><td>Delivery</td><td>Mechanism	Delivery Mechanism</td></tr>\n" .
			"   <tr><td>44</td><td>Febrile</td><td>Neutropenia	Febrile Neutropenia</td></tr>\n" .
			"   <tr><td>60</td><td>Cumulative</td><td>Dosing Meds	Medication ID</td></tr>\n" .
			"   <tr><td>61</td><td>SyncMedsListDate</td><td>List of Dates where the Medications have been synchronized with VistA</td></tr>\n</table>";
	}

	function getPKeyDefault($aColumn) {
		return "(newsequentialid())";
	}

	function buildTableRow($aColumn, $ColDefault, &$pKeyMap) {
		$pKey = $ColDefault === $this->getPKeyDefault($aColumn) ? "Primary Key" : "";
		$fKey = $aColumn["DATA_TYPE"] === "uniqueidentifier" ? "Foreign Key" : "";

		$tName = $aColumn["TABLE_NAME"];
		$cName = $aColumn["COLUMN_NAME"];

		$keyType = $this->getColumnKeyInfo($aColumn);
		if ("" === $keyType) {
			if ("" !== $pKey) {
				if (!array_key_exists($tName, $pKeyMap)) {
					$pKeyMap[$tName] = $cName;
				}
			}
			else if ("" !== $fKey) {
				$fkBuf = "";
				$keyType = "Foreign Key = Unknown Table Reference";

				if ("COMS_Track" == $tName && "id" === $cName) {
					$keyType = "Primary Key";
				}
				else if ("CPRS_Local_Locations" == $tName && "ID" === $cName) {
					$keyType = "Primary Key";
				}
				else if ("CPRS_Schedule" == $tName && "ID" === $cName) {
					$keyType = "Primary Key";
				}
				else if ("Discharge_Instruction" == $tName && "pat_id" === $cName) {
					$keyType = "Foreign Key = Patient_Assigned_Templates ??";
				}
				else if ("DischargeInstructionsLink" == $tName && "DischargeID" === $cName) {
					$keyType = "Primary Key - " . Admin::GUIDDesc;
				}
				else if ("DischargeInstructionsLink" == $tName && "PatientID" === $cName) {
					$keyType = "Foreign Key = Patient_Assigned_Templates (as PAT_ID)";
				}
				else if ("DischargeInstructions" == $tName && "DischargeID" === $cName) {
					$keyType = "Foreign Key - DischargeInstructionsLink";
				}
				else if ("DiseaseStaging" == $tName && "DiseaseID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 7)";
				}
				else if ("EoTS_Vitals" == $tName && "Id" === $cName) {
					$keyType = "Primary Key";
				}
				else if ("EoTS_Vitals_Amputations" == $tName && "EoTS_Vitals_Id" === $cName) {
					$keyType = "Foreign Key = EoTS_Vitals ??";
				}
				else if ("Locations" == $tName && "LocationID" === $cName) {
					$keyType = "Primary Key";
				}
				else if ("ND_ToxicityGrid" == $tName && "ID" === $cName) {
					$keyType = "Primary Key";
				}

	/*
				else if ("Order_Status" == $tName && "Order_ID" === $cName) {
					$keyType = "Primary Key";
				}
				else if ("Order_Status" == $tName && "Template_IDMT" === $cName) {
					$keyType = "Foreign Key";
				}
				else if ("Order_Status" == $tName && "Drug_ID" === $cName) {
					$keyType = "Foreign Key";
				}
	*/

				else if ("CumulativeDoseMeds" == $tName && "CumulativeDoseUnits" === $cName) {
					$keyType = "Foreign Key = LookUp ??";
				}
				else if ("IVFluidTypes" == $tName && "FluidType_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 28)";
				}
				else if ("IVFluidTypes" == $tName && "Med_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 2)";
				}
				else if ("Locations" == $tName && "LocationID" === $cName) {
					$keyType = "Primary Key";
				}
				else if ("Master_Template" == $tName && "Cancer_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 7)";
				}
				else if ("Master_Template" == $tName && "Disease_Stage_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 23)";
				}
				else if ("Master_Template" == $tName && "Regimen_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 4)";
				}
				else if ("Master_Template" == $tName && "Location_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 22)";
				}
				else if ("Master_Template" == $tName && "Cycle_Time_Frame_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 18)";
				}
				else if ("Master_Template" == $tName && "Emotegenic_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 13)";
				}
				else if ("Master_Template" == $tName && "Modified_By" === $cName) {
					$keyType = "Foreign Key = Not used at this time";
				}
				else if ("Medication_Hydration" == $tName && "Drug_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 2)";
				}
				else if ("Medication_Hydration" == $tName && "Order_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}

				else if ("Med_Docs" == $tName && "Med_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 2)";
				}
				else if ("Patient_CumulativeDoseHistory" == $tName && "MedID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 2 ???)";
				}
				else if ("Patient_CumulativeDoseHistory" == $tName && "CumulativeDoseUnits" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 11)";
				}
				else if ("Patient_History" == $tName && "Performance_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 10)";
				}
				else if ("Patient_History" == $tName && "Chemo_ID" === $cName) {
					$keyType = "Foreign Key = Not Used";
				}
				else if ("Patient_History" == $tName && "Radiation_ID" === $cName) {
					$keyType = "Foreign Key = Not Used";
				}
				else if ("Patient_History" == $tName && "OEM_ID" === $cName) {
					$keyType = "Foreign Key = Not Used";
				}
				else if ("PatientDiseaseHistory" == $tName && "Disease_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 7)";
				}
				else if ("PatientDiseaseHistory" == $tName && "DiseaseStage_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 23)";
				}




				else if ("CumulativeDoseMeds" == $tName && "MedID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 2 ???)";
				}

				else if ("MH_Infusion" == $tName && "Order_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("MH_Infusion" == $tName && "Infusion_Unit_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 11)";
				}
				else if ("MH_Infusion" == $tName && "Infusion_Type_ID" === $cName) {
					$keyType = "Unknown, all values = 00000000-0000-0000-0000-000000000000";
				}
				else if ("ND_Treatment" == $tName && "Order_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("ND_TreatmentAmmend" == $tName && "Order_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("Template_Regimen" == $tName && "Order_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("Template_Regimen" == $tName && "Fl_Vol_Unit_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("Template_Regimen" == $tName && "Route_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("Template_Regimen" == $tName && "Patient_Dose_Unit_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("Template_Regimen" == $tName && "Regimen_Dose_Unit_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("Template_Regimen" == $tName && "Drug_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("Template_Regimen" == $tName && "Order_ID" === $cName) {
					$keyType = "Foreign Key = Order_Status";
				}
				else if ("Flowsheet_Provider_Notes" == $tName && "PAT_ID" === $cName) {
					$keyType = "Foreign Key = Patient_Assigned_Templates";
				}
				else if ("ND_GenInfo" == $tName && "Patient_ID" === $cName) {
					$keyType = "Foreign Key = Patient_Assigned_Templates (as PAT_ID)";
				}
				else if ("ND_InfuseReactions" == $tName && "Patient_ID" === $cName) {
					$keyType = "Foreign Key = Patient_Assigned_Templates (as PAT_ID)";
				}
				else if ("ND_ToxicityGrid" == $tName && "PAT_ID" === $cName) {
					$keyType = "Foreign Key = Patient_Assigned_Templates ";
				}
				else if ("ND_Treatment" == $tName && "PAT_ID" === $cName) {
					$keyType = "Foreign Key = Patient_Assigned_Templates ";
				}
				else if ("Patient_Assigned_Templates" == $tName && "Perf_Status_ID" === $cName) {
					$keyType = "Foreign Key = LookUp (Lookup_ID; Lookup_Type == 10)";
				}
				else if ("InventoryReports" == $tName && "iReport_ID" === $cName) {
					$keyType = "Foreign Key = InventoryReportsLinks (as ID)";
				}
				else if ("" == $tName && "ID" === $cName) {
					$keyType = "Primary Key";
				}
				else {
					foreach($pKeyMap as $aKey => $value) {
						if ($value == $cName) {
							$keyType = "Foreign Key = $aKey";
							break;
						}
					}
				}
			}
			else if ("DischargeInstructions" == $tName && "fieldName" === $cName) {
				$keyType = " == Applied_Template;<br>Value is Foreign Key to Master_Template-&gt;Template_ID";
			}
		}

		return "   <tr>" . 
			"<td>" .$aColumn["COLUMN_NAME"] . "</td>" . 
			"<td>$ColDefault</td>" . 
			"<td>" .$aColumn["IS_NULLABLE"] . "</td>" . 
			"<td>" .$aColumn["DATA_TYPE"] . "</td>" . 
			"<td>" .$aColumn["CHARACTER_MAXIMUM_LENGTH"] . "</td>" . 
			"<td>$keyType</td>" . 
			"<td>" . $this->getColumnInfo($aColumn) . "</td>" .
			"</tr>\n";
	}




	function getTableRow($aColumn, &$keyMap) {
		$TableName = $aColumn["TABLE_NAME"];
		$ColumnName = $aColumn["COLUMN_NAME"];
		$type = "null";

		$type = ($TableName === "COMS_Sessions" && $ColumnName === "DateGood") ? "(dateadd(minute,(-5),getdate()))" : $type;
		$type = ($TableName === "COMS_Queries" && $ColumnName == "Date_Entered") ? "(getdate())" : $type;
		$type = ($TableName === "CumulativeDoseMeds" && $ColumnName === "Date_Changed") ? "(getdate())" : $type;
		$type = ($TableName === "MH_Infusion" && $ColumnName === "Date_Entered") ? "(getdate())" : $type;
		$type = ($TableName === "Medication_Hydration" && $ColumnName === "Date_Entered") ? "(getdate())" : $type;
		$type = ($TableName === "Template_Regimen" && $ColumnName === "Date_Entered") ? "(getdate())" : $type;
		$type = ($TableName === "Order_Status" && $ColumnName === "Date_Entered") ? "(getdate())" : $type;
		$type = ($TableName === "PatientDiseaseHistory" && $ColumnName === "Date_Assessment") ? "(getdate())" : $type;
		$type = ($TableName === "Flowsheet_ProviderNotes " && $ColumnName === "Date_Entered") ? "(getdate())" : $type;
		$type = ($TableName === "COMS_Sessions" && $ColumnName === "DateEntered") ? "(getdate())" : $type;
		$type = ($TableName === "Patient_CumulativeDoseHistory" && $ColumnName === "Date_Changed") ? "(getdate())" : $type;

		$type = ($TableName === "CumulativeDoseMeds" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "ND_InfuseReactions" && $ColumnName === "IReact_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "InventoryReportsLinks" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "InventoryReports" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "EditLockout" && $ColumnName === "id") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Med_Reminders" && $ColumnName === "MR_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Patient_CumulativeDoseHistory" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "ND_Assessment_Details" && $ColumnName === "Asmnt_Detail_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "ND_Assessment" && $ColumnName === "Asmnt_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "MH_Infusion" && $ColumnName === "Infusion_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "ND_Treatment" && $ColumnName === "Treatment_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "ND_ReactAssess" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "ND_IVSite" && $ColumnName === "IVSite_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "ND_GenInfo" && $ColumnName === "GenInfo_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "PatientDiseaseHistory" && $ColumnName === "PDH_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "SiteCommonInformation" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Roles" && $ColumnName === "Role_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Radiation_History" && $ColumnName === "Radiation_History_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Patient_History" && $ColumnName === "Patient_History_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Patient_BSA" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Patient_Assigned_Templates" && $ColumnName === "PAT_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Patient_Allergies" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Patient" && $ColumnName === "Patient_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Med_Docs" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Master_Template" && $ColumnName === "Template_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "LookUp" && $ColumnName === "Lookup_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Medication_Hydration" && $ColumnName === "MH_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Template_Regimen" && $ColumnName === "Patient_Regimen_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Lab_Info_Results" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Lab_Info" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "IVFluidTypes" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "EoTS" && $ColumnName === "EoTS_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "DiseaseStaging" && $ColumnName === "ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Discharge_Instruction" && $ColumnName === "id") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "ND_InfuseReactions_Details" && $ColumnName === "IReact_Detail_ID") ? $this->getPKeyDefault($aColumn) : $type;
		$type = ($TableName === "Flowsheet_ProviderNotes " && $ColumnName === "FS_ID") ? $this->getPKeyDefault($aColumn) : $type;

		$type = ($TableName === "InventoryReportsLinks" && $ColumnName === "Date") ? "(sysdatetimeoffset())" : $type;

		return $this->buildTableRow($aColumn, $type, $keyMap);
	}


	function InitSchemaTable($tableName, $RowCounts) {
		$Rows = "";
		$Rows = $RowCounts[$tableName];
		return "<h2>$tableName - $Rows records</h2>
 <table>
   <tr>" .
	   "<th style=\"width:20%;\">Column</th>" .
	   "<th style=\"width:10%;\">Default</th>" .
	   "<th style=\"width:5%;\">Nullable</th>" .
	   "<th style=\"width:10%;\">Data&nbsp;Type</th>" .
	   "<th style=\"width:7%;\">Max Size</th>" .
	   "<th style=\"width:20%;\">Key Type</th>" .
	   "<th>Comment</th>" .
	   "</tr>\n";
	}

	function schema($db = null) {
		$title = "<title>COMS Table Schema</title>\n";
		$styles = 
			" <style>\n" . 
			"	em { \n" .
			"		font-weight: bold; \n" .
			"		font-size: 110%; \n" .
			"	} \n" .

			"	h1 { \n" .
			"		text-align: center; \n" .
			"		font-size: 200%; \n" .
			"	} \n" .
			"	p { \n" .
			"		margin: 0 2em;\n" .
			"	} \n" .
			"	div { \n" .
			"		margin: 0 4em;\n" .
			"	} \n" .
			"	h2 { \n" .
			"		text-align: left; \n" .
			"		margin: 1em 0 0 6em;\n" .
			"		font-size: 125%; \n" .
			"	} \n" .
			"	table { \n" .
			"		width: 90%;\n" .
			"		margin: 0 2em;\n" .
			"		border-collapse: collapse; \n" .
			"	} \n" .
			"	table, td, th { \n" .
			"		border: 2px solid gray; \n" .
			"		padding: 0 0.5em;\n" .
			"	} \n" .
			"	th { \n" .
			"		text-align: center; \n" .
			"		font-weight: bold; \n" .
			"		background: silver; \n" .
			"	} \n" .
			" </style>\n";

		$soPage = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n <meta charset=\"UTF-8\">\n $title\n $styles\n</head>\n<body>\n<h1><abbr title=\"Chemotherapy Ordering Management System\">COMS</abbr> Table Schema</h1>\n";

		$query = "Select 
		TABLE_CATALOG, 
		TABLE_NAME, 
		COLUMN_NAME, 
		COLUMN_DEFAULT, 
		IS_NULLABLE , 
		DATA_TYPE, 
		CHARACTER_MAXIMUM_LENGTH 
		From $db.Information_Schema.Columns 
		order by TABLE_NAME";
		
		$records = $this->Admin->query( $query );
		if ($this->checkForErrors('Get Users Failed. ', $records)) {
			$this->set('jsonRecord', "$soPage<h2>ERROR</h2><p>\n" . $this->get('frameworkErr') . "</p></html>");
			return;
		}


		$Table = "";
		$buf = "";
		$keyMap = array();
		// Build the list of Primary Keys
		foreach ($records as $aColumn) {
			if ($aColumn["TABLE_NAME"] == $Table) {
				$buf = $buf . $this->getTableRow($aColumn, $keyMap);
			}
			else {
				$Table = $aColumn["TABLE_NAME"];
				$buf = $buf . $this->getTableRow($aColumn, $keyMap);
			}
		}

		$Table = "";
		$buf = $this->LookUpTableReferences();
		$RowCounts = $this->getListofRowCounts();
		foreach ($records as $aColumn) {
			if ($aColumn["TABLE_NAME"] == $Table) {
				$buf = $buf . $this->getTableRow($aColumn, $keyMap);
			}
			else {
				if ("" !== $Table) {
					$buf = $buf . " </table>\n\n";
				}
				$Table = $aColumn["TABLE_NAME"];

				$buf = $buf . $this->InitSchemaTable($Table, $RowCounts);
				$buf = $buf . $this->getTableRow($aColumn, $keyMap);
			}
		}

		$queryUsed = "<!-- <h2 style=\"text-align:left; margin-left: 3em;\">Query Used</h2>\n<p style=\"margin:0 3em;\">Select</p>
		<div>TABLE_CATALOG,</div>
		<div>TABLE_NAME,</div>
		<div>COLUMN_NAME,</div>
		<div>COLUMN_DEFAULT,</div>
		<div>IS_NULLABLE ,</div>
		<div>DATA_TYPE,</div>
		<div>CHARACTER_MAXIMUM_LENGTH</div>
		<p style=\"margin:0 3em;\">From $db.Information_Schema.Columns <br>
		order by TABLE_NAME</p>\n -->\n\n";

		$this->set('jsonRecord', "$soPage\n $queryUsed <p>$buf</p></html>");
	}
/**
 *
 *
 ***********************************************************************************************************************************************************/



    function Users(){
        $jsonRecord = array();
        $records = $this->Admin->getUsers();
        if ($this->checkForErrors('Get Users Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);
        $jsonRecord['records'] = $records;
        $this->set('jsonRecord', $jsonRecord);
    }

    function UserRoles(){
        $jsonRecord = array();

        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            $query = "SELECT * FROM Roles ORDER BY username";
            $records = $this->Admin->query( $query );
            if ($this->checkForErrors('Get Users Failed. ', $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 
            $jsonRecord['total'] = count($records);
            $jsonRecord['records'] = $records;
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            $form_data = json_decode(file_get_contents('php://input'));
            $rid = $form_data->{'rid'};
            $username = $form_data->{'username'};
            $role = $form_data->{'role'};
            $DisplayName = $form_data->{'DisplayName'};
            $Email = $form_data->{'Email'};
            $TemplateAuthoring = $form_data->{'TemplateAuthoring'};
            $Preceptee = $form_data->{'Preceptee'};

$query = "Update Roles 
            set username = '$username',
            role ='$role', 
            DisplayName ='$DisplayName', 
            Email = '$Email',
            TemplateAuthoring ='$TemplateAuthoring',
            Preceptee = '$Preceptee'
            where rid = '$rid'";
error_log("UPDATE Record - $query");
            $records = $this->Admin->query( $query );
            if ($this->checkForErrors('Update User Failed. ', $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $form_data = json_decode(file_get_contents('php://input'));
            $rid = $form_data->{'rid'};
            $username = $form_data->{'username'};
            $role = $form_data->{'role'};
            $DisplayName = $form_data->{'DisplayName'};
            $Email = $form_data->{'Email'};
            $TemplateAuthoring = $form_data->{'TemplateAuthoring'};
            $Preceptee = $form_data->{'Preceptee'};
            $query = "INSERT into Roles (rid, username, role, DisplayName, Email, TemplateAuthoring, Preceptee) VALUES ('$rid', '$username','$role', '$DisplayName', '$Email','$TemplateAuthoring','$Preceptee')";
error_log("POST Record - $query");
            $records = $this->Admin->query( $query );
            if ($this->checkForErrors('Save New User Failed. ', $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 

        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $form_data = json_decode(file_get_contents('php://input'));
            $rid = $form_data->{'rid'};
            $query = "DELETE from Roles where rid='$rid'";
error_log("Delete Record - $query");
            $records = $this->Admin->query( $query );
            if ($this->checkForErrors('Delete User Failed. ', $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 
        }
        $jsonRecord['success'] = true;            
        $this->set('jsonRecord', $jsonRecord);
    }
	
	function ActiveWorkFlows(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getActiveWorkflows();
        
        if ($this->checkForErrors('Get Active Workflows Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }
	
	function InActiveWorkFlows(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getInActiveWorkflows();
        
        if ($this->checkForErrors('Get InActive Workflows Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }

	function MedsRounding(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getMedsRounding();
        
        if ($this->checkForErrors('Get Meds for Non Rounding Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }

	function MedsNonRounded(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getMedsNonRounded();
        
        if ($this->checkForErrors('Get Meds for Non Rounding Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }

	function UpdateMedsNonRounding(){
        
        $form_data = json_decode(file_get_contents('php://input'));
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateMedsNonRounding($form_data);		
		
		if($this->checkForErrors('Apply Meds for Non Rounding Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            //$retVal = $this->Admin->updateMedsNonRounding($form_data);
            $this->set('MedsNonRoundingrecords', null);
	}

	function MedsCumulativeDosing(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getMedsCumulativeDosing();
        
        if ($this->checkForErrors('Get Meds for Cumulative Dosing Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }

	function UpdateMedsCumulativeDosing(){
        
        $form_data = json_decode(file_get_contents('php://input'));
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateMedsCumulativeDosing($form_data);		
		
		if($this->checkForErrors('Apply Meds for Cumulative Dosing Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            $this->set('MedsCumulativeDosingrecords', null);
	}
	
	function UpdateGlobals(){
        
        $form_data = json_decode(file_get_contents('php://input'));   
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateGlobals($form_data);		
		
		if($this->checkForErrors('Apply Global Values Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            $retVal = $this->Admin->updateGlobals($form_data);
            $this->set('globalrecords', null);
	}
	
	function UpdateUsers(){
        
        $form_data = json_decode(file_get_contents('php://input'));   
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateUsers($form_data);		
		
		if($this->checkForErrors('Update User Values Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            $retVal = $this->Admin->updateUsers($form_data);
            $this->set('globalrecords', null);
	}
	
	function UpdateWorkflows(){
        
        $form_data = json_decode(file_get_contents('php://input'));   
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateWorkflows($form_data);		
		
		if($this->checkForErrors('Update Workflow Values Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            $retVal = $this->Admin->updateWorkflows($form_data);
            $this->set('workflowrecords', null);
	}
}

?>
