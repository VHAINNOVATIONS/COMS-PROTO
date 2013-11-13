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
class COMS_VitalsList {
    public $Height = "";
    public $Weight = "";
    public $Systolic = "";
    public $Diastolic = "";
//	public $BP = "";
//	public $WeightFormula = "";
//	public $BSA_Method = "";
//	public $BSA = "";
//	public $BSA_Weight = "";
    public $DateTaken = "";
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
        $mdwsBase = new MdwsBase();
        $this->DateTaken = $mdwsBase->MDWS_TimestampConvert($date);
    }

    public function AddEntry( $data ) {
        if (isset($data->type->name)) {
            $n = $data->type->name;
            $v = $data->value1;
            switch( $n ) {
                    case "Height":
                            $this->Height = $v;
                            break;
                    case "Weight":
                            $this->Weight = $v;
                            break;
                    case "Systolic":
                            $this->Systolic = $v;
                            $this->Diastolic = $BP[1];
                            break;
                    case "Diastolic":
                            $this->Diastolic = $v;
                            break;
                    case "Blood Pressure":
                            if (isset($v) && "" !== $v) {
                                    $BP = split("/", $v);
                                    if (count($BP) > 0) {
                                            $this->Systolic = $BP[0];
                                            $this->Diastolic = $BP[1];
                                    }
                            }
                            break;
                    case "Temperature":
                            $this->Temperature = $v;
                            break;
                    case "Pulse":
                            $this->Pulse = $v;
                            break;
                    case "Respiration":
                            $this->Respiration = $v;
                            break;
                    case "Pain":
                            $this->Pain = $v;
                            break;
            }
        }
    }
}

?>
