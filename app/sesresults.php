<?php

function LostSessionmdws(){
	include "dbitcon.php";
		//Get RID
		$tsql1 = "SELECT DISTINCT mdws FROM COMS_Sessions WHERE rid != ''";
		$getvars = sqlsrv_query($conn, $tsql1);
			while( $row = sqlsrv_fetch_array($getvars, SQLSRV_FETCH_ASSOC)) {
				$sitelist = $row['sitelist'];
				$mdws = $row['mdws'];
				$AC = $row['AC'];
				$VC = $row['VC'];
				//echo "MDWS: ".$mdws."<br>";
				//echo $AC;
				//echo $VC;
				}
				return $mdws;

				}
				
function LostSessionAC(){
	include "dbitcon.php";
		//Get RID
		$tsql1 = "SELECT DISTINCT AC FROM COMS_Sessions WHERE rid != ''";
		$getvars = sqlsrv_query($conn, $tsql1);
			while( $row = sqlsrv_fetch_array($getvars, SQLSRV_FETCH_ASSOC)) {
				$sitelist = $row['sitelist'];
				$mdws = $row['mdws'];
				$AC = $row['AC'];
				$VC = $row['VC'];
				}
				return $AC;

				}
				
function LostSessionVC(){
	include "dbitcon.php";
		//Get RID
		$tsql1 = "SELECT DISTINCT VC FROM COMS_Sessions WHERE rid != ''";
		$getvars = sqlsrv_query($conn, $tsql1);
			while( $row = sqlsrv_fetch_array($getvars, SQLSRV_FETCH_ASSOC)) {
				$sitelist = $row['sitelist'];
				$mdws = $row['mdws'];
				$AC = $row['AC'];
				$VC = $row['VC'];
				}
				return $VC;

				}
				
function LostSessionsitelist(){
	include "dbitcon.php";
		//Get RID
		$tsql1 = "SELECT DISTINCT sitelist FROM COMS_Sessions WHERE rid != ''";
		$getvars = sqlsrv_query($conn, $tsql1);
			while( $row = sqlsrv_fetch_array($getvars, SQLSRV_FETCH_ASSOC)) {
				$sitelist = $row['sitelist'];
				$mdws = $row['mdws'];
				$AC = $row['AC'];
				$VC = $row['VC'];
				}
				return $sitelist;

				}

?>