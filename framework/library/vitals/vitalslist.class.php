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
class VitalsList {
     
	public $date;
	public $Vitals;
	function __construct( $date ) {
                
            $mdwsBase = new MdwsBase();
            $this->DateTaken = $mdwsBase->MDWS_TimestampConvert($date);
            $this->Vitals = array() ;
	}
}

?>
