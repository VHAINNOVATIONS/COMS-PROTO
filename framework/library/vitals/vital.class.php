<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Vital
 *
 * @author Kevin
 */
class Vital {
	public $DateTaken;
	public $Height = "";
	public $Weight = "";
	public $Systolic = "";
	public $Diastolic = "";
	public $BP = "";
	public $WeightFormula = "";
	public $BSA_Method = "";
	public $BSA = "";
	public $BSA_Weight = "";
	public $Temperature = "";
	public $Pulse = "";
	public $Respiration = "";
	public $Pain = "";
	public $SPO2 = "";
	public $Cycle = "";
	public $Day = "";
//	public $PS = "";
//	public $PSID = "";
//	public $Age = "";
//	public $Gender = "";

	function __construct( $date ) {
		$this->DateTaken = $date;
	}

}

?>
