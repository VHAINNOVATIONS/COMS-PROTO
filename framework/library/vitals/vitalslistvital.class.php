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
class VitalsListVital {
     
	public $name;
	public $value;
	public $units;
	function __construct( $aVital ) {
		$this->name = "";
		if (isset($aVital->type->name)) {
			$this->name = $aVital->type->name;
		}
		$this->value = "";
		if (isset($aVital->value1)) {
			$this->value = $aVital->value1;
		}
		$this->units = "";
		if (isset($aVital->units)) {
			$this->units = $aVital->units;
		}
	}
}

?>
