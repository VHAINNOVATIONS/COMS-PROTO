<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Lab info
 *
 * @author Kevin
 */
class LabInfo {
	public $Results;	
        
	public $releaseDate = "";
	public $author = "";
	public $specimen = "";
        public $specInfo = "";
        public $specColDate = "";
        public $comment = "";
        
	function __construct($rpt) {
            
            $this->releaseDate = $rpt->timestamp;
            $this->author = $rpt->author->name;
            $this->specimen = $rpt->specimen->name;
            $this->specInfo = $rpt->specimen->accessionNum;
            $this->specColDate = $rpt->specimen->collectionDate;
            isset($rpt->specimen->comment) ? $this->comment = $rpt->specimen->comment : $this->comment = "";
            $this->Results = array() ;
            $this->count = 0;
            
	}
        
	public function AddEntry($entry) {
//var_dump($entry);
//echo "<br>AddEntry Count = " . $this->count . "<br>";
//var_dump($this->Results);
//echo "<br>";

		$p1 = $entry->test->id;
		$p2 = $entry->test->name;
		$p3 = $entry->test->units;
		$p4 = $entry->test->refRange;
		$p5 = $entry->value;
		$p6 = $entry->boundaryStatus;
		$p7 = $entry->labSiteId;
		$this->Results[$this->count++] = new LabInfoResult($p1,$p2,$p3,$p4,$p5,$p6,$p7);
	}
        
/*        
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
 * 
 */
}
?>
