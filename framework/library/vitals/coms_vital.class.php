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
class COMS_Vital {
	private $Vitals;

	function __construct( $date ) {
            $mdwsBase = new MdwsBase();
            $this->Vitals = new Vital($mdwsBase->MDWS_TimestampConvert($date));
	}

	public function AddEntry( $data ) {
		if (isset($data->type->name)) {
			$n = $data->type->name;
			$v = $data->value1;
			switch( $n ) {
				case "Height":
					$this->Vitals->Height = $v;
					break;
				case "Weight":
					$this->Vitals->Weight = $v;
					break;
				case "Systolic Blood Pressure":
					$this->Vitals->Systolic = $v;
					break;
				case "Diastolic Blood Pressure":
					$this->Vitals->Diastolic = $v;
					break;
				case "Blood Pressure":
                                        $this->Vitals->BP = $v;
					break;
				case "Temperature":
					$this->Vitals->Temperature = $v;
					break;
				case "Pulse":
					$this->Vitals->Pulse = $v;
					break;
				case "Respiration":
					$this->Vitals->Respiration = $v;
					break;
				case "Pain":
					$this->Vitals->Pain = $v;
					break;
			}
		}
	}

	public function getVitals() {
		$a = new Vital($this->Vitals->DateTaken);
		$a->Height = $this->Vitals->Height;
		$a->Weight = $this->Vitals->Weight;
		$a->Systolic = $this->Vitals->Systolic;
		$a->Diastolic = $this->Vitals->Diastolic;
		$a->Temperature = $this->Vitals->Temperature;
		$a->Pulse = $this->Vitals->Pulse;
		$a->Respiration = $this->Vitals->Respiration;
		$a->Pain = $this->Vitals->Pain;
                $a->BP = $this->Vitals->BP;
		return $a;
	}
}

?>
