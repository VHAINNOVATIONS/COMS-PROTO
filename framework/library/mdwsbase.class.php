<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class MdwsBase {
    
    function MDWS_Setup($roles) {
			//include('../app/session.php');
            //set variables
            //$sitelist = $roles[0]['sitelist'];
			$sitelist = $_SESSION['sitelist'];
            //$cprsUsename = $roles[0]['cprsUsername'];
			//$cprsUsername = $_SESSION['AccessCode'];
			//$cprsUsername = $_SESSION['cprsUsername'];
			//echo "cprsUsername: ".$cprsUsername."";
			//echo "Access: ".$_SESSION['AccessCode']."";
            //$cprsPass = $roles[0]['cprsPass'];
			//$cprsPass = $_SESSION['VerifyCode'];
			$cprsUsername = '1programmer';
			$cprsPass = 'programmer1';
            $_SESSION['MDWS_Status'] = '';
            $_SESSION['MDWS_Type'] = '';
            $_SESSION['MDWS_Msg'] = '';
            $_SESSION['MDWS_Suggestion'] = '';
			//echo "<br>MDWS Dump:".var_dump($_SESSION)."<br>";

            try {
                    $client = new SoapClient("http://devmdws.vacloud.us/mdws2/EmrSvc.asmx?WSDL");
                    if (isset($client->fault)) {
                            $this->MDWsCrashReport($client, "SoapClient", false);
                            return null;
                    }

					//-----------------------------------
					// Needed for MWB Site only
					//-----------------------------------
					//$addDataSource = $client->addDataSource(array('id'=>'355','name'=>'vaphsdb04','datasource'=>'172.19.100.94','port'=>'9355','modality'=>'HIS','protocol'=>'VISTA','region'=>'355'));
                    //if (isset($connect->connectResult->fault)) {
                    //        $this->MDWsCrashReport($connect->connectResult, "Connect", false);
                   //         return null;
                   // }
					//-----------------------------------
					// Needed for MWB Site only
					//-----------------------------------
					
                    $connect = $client->connect(array('sitelist'=>$sitelist));
                    if (isset($connect->connectResult->fault)) {
                            $this->MDWsCrashReport($connect->connectResult, "Connect", false);
                            return null;
                    }

                    $login = $client->login(array('username'=>$cprsUsername,'pwd'=>$cprsPass,'context'=>''));
                    if (isset($login->loginResult->fault)) {
                            $this->MDWsCrashReport($login->loginResult, "Login", false);
                            return null;
                    }

                    if (isset($client->fault)) {
                            $this->MDWsCrashReport($client, "Client", false);
                            return null;
                    }
                    
                    return $client;
                    
            } catch (Exception $e) {
                // echo ("Error: $e->getMessage()");
            }
            return null;
    }

    function MDWS_Disconnect($client){
        
        $disconnect = $client->disconnect();
        if (isset($disconnect->disconnectResult->fault)) {
            $this->MDWsCrashReport($disconnect->disconnectResult, "Disconnect", false);
            return null;
        }
        
        $disconnect = $client->disconnectRemoteSites();
        if (isset($disconnect->disconnectRemoteSitesResult->fault)) {
            $this->MDWsCrashReport($disconnect->disconnectRemoteSitesResult, "Disconnect", false);
            return null;
        }
        
    }

    function MDWS_TimestampConvert($date) {
            // YYYYMMDD.HHMMSS
            // 012345678901234
            // 000000000011111
            $year = substr($date, 0, 4);
            $mon = substr($date, 4, 2);
            $day = substr($date, 6, 2);
            $hr = substr($date, 9, 2);
            $min = substr($date, 11, 2);
            $sec = substr($date, 13, 2);
            $parsedDate = "$mon/$day/$year $hr:$min:$sec";
            // echo "$date - $year - $mon - $day - $hr - $min - $sec<br />";
            return ($parsedDate);
    }

    function MDWS_Convert2JSON($dfn, $rawData) {
            $array = (array)$rawData;

            //Format JSON
            $jsonRecord = array();
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($rawData);

            $recordArray = array();
            $recordArray['id'] = $dfn;
            $recordArray['data'] = $rawData;

            $jsonRecord['records'] = $recordArray;
            return json_encode($jsonRecord); 
    }


    function MDWs_ShowData( $dfn, $rawData, $patientId ) {
            $recordArray = array();
            $recordArray['id'] = $patientId;
            $recordArray['dfn'] = $dfn;
            $recordArray['data'] = $rawData;

            $data = json_encode($recordArray); 
            echo $data;
    }

    function MDWsCrashReport($result, $type, $displayReport) {
            if (isset($result->fault)) {
                    $fault = $result->fault;
                    $_SESSION['MDWS_Status'] = 'Crashed';
                    $_SESSION['MDWS_Msg'] = $fault->message;
                    $_SESSION['MDWS_Suggestion'] = $fault->suggestion;
		            $_SESSION['MDWS_Type'] = $type;
                    $this->MDWSCrashed($displayReport);
                    return (null);
            }
            return ($result);
    }
    
    function MDWSCrashed($displayReport) {
			$errMsg = "";
			if ("" !== $_SESSION['MDWS_Type']) {
				$errMsg .= "MDWS Type: " . $_SESSION['MDWS_Type'] . "; ";
			}
			if ("" !== $_SESSION['MDWS_Msg']) {
				$errMsg .= "MDWS Msg: " . $_SESSION['MDWS_Msg'] . "; ";
			}
			if ("" !== $_SESSION['MDWS_Suggestion']) {
				$errMsg .= "MDWS Suggestion: " . $_SESSION['MDWS_Suggestion'] . "; ";
			}
			if ("" === $errMsg) {
				$errMsg .= "Unknown MDWS Error; No further details to report";
			}
			return ($errMsg);
		/********
            if ("" !== $_SESSION['MDWS_Status'] && $displayReport) {
                    echo "<table border=1>";
                    echo "<tr><th colspan=2><h1>MDWs Crashed</h1></th></tr>";
                    echo "<tr><th>MDWs Error</th><td>" . $_SESSION['MDWS_Msg'] . "</td></tr>";
                    echo "<tr><th>Suggestion</th><td>" . $_SESSION['MDWS_Suggestion'] . "</td></tr>";
            }
		 ********/
    }
    
    function objectToArray($d) {
            if (is_object($d)) {
                    // Gets the properties of the given object
                    // with get_object_vars function
                    $d = get_object_vars($d);
            }

            if (is_array($d)) {
                    /*
                    * Return array converted to object
                    * Using __FUNCTION__ (Magic constant)
                    * for recursive call
                    */
                    return array_map(__FUNCTION__, $d);
            }
            else {
                    // Return array
                    return $d;
            }
    }
    
    function MDWS_Login_Check($AccessCode,$VerifyCode) {
            //set variables
			$sitelist = $_SESSION['sitelist'];
			//$cprsUsername = $_SESSION['cprsUsername'];
			//$cprsPass = $_SESSION['cprsPass'];
            $_SESSION['MDWS_Status'] = '';
            $_SESSION['MDWS_Type'] = '';
            $_SESSION['MDWS_Msg'] = '';
            $_SESSION['MDWS_Suggestion'] = '';


            try {
                    $client = new SoapClient("http://devmdws.vacloud.us/mdws2/EmrSvc.asmx?WSDL");
                    if (isset($client->fault)) {
                            $this->MDWsCrashReport($client, "SoapClient", false);
                            return null;
                    }

                    $connect = $client->connect(array('sitelist'=>$sitelist));
                    if (isset($connect->connectResult->fault)) {
                            $this->MDWsCrashReport($connect->connectResult, "Connect", false);
                            return null;
                    }

                    $login = $client->login(array('username'=>$AccessCode,'pwd'=>$VerifyCode,'context'=>''));
                    if (isset($login->loginResult->fault)) {
                            $this->MDWsCrashReport($login->loginResult, "Login", false);
                            return null;
                    }

                    if (isset($client->fault)) {
                            $this->MDWsCrashReport($client, "Client", false);
                            return null;
                    }
                    
                    return $client;
                    
            } catch (Exception $e) {
                // echo ("Error: $e->getMessage()");
            }
            return null;
    }
    
}


?>
