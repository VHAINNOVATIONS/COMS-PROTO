<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AllergiesList
 *
 * @author Kevin
 */
class AllergiesList {
	private $Allergies;		// private so that it can't be accessed outside of the class
	function __construct( ) {
		$this->Allergies = array() ;
		$this->count = 0;
	}
	public function AddEntry($entry) {
			// MWB - 5/4/2012 Added checks for parameters below via "isset()".
			// Testing of new patients from MDWS indicated that data is NOT always returned (e.d. AllergenName === "Not Assessed" doesn't return an ID or Type)
			// Not sure if there are other cases where data isn't returned completely, so checked all parameters
		if (isset($entry->allergenId, $entry->allergenName, $entry->allergenType)) {
			$this->Allergies[$this->count++] = new Allergy($entry->allergenId, $entry->allergenName, $entry->allergenType, (isset($entry->comment) ? $entry->comment : ""));
		}
	}
	public function AllAllergies() {		// since the Allergies array is private need to clone it to return the data
		$allergies = array();
		$max = $this->count;
		for ($i = 0; $i < $max; $i++) {
			$a = $this->Allergies[$i];
			$b = new Allergy($a->id, $a->name, $a->type, $a->comment);
			$allergies[$i] = $b;
		}
		return $allergies;
	}
}
?>
