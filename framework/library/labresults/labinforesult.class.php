<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Lab Results
 *
 * @author Kevin
 */

class LabInfoResult {
	public $mdwsid = "";
	public $name = "";
	public $units = "";
        public $result = "";
	public $refRange = "";
        public $siteId = "";
        public $boundaryStatus = "";
        
	function __construct($id, $name, $units, $refRange, $result, $boundaryStatus, $siteId) {
            
            $this->mdwsid = $id;
            $this->name = $name;
            $this->units = $units;
            $this->result = $result;
            $this->refRange = $refRange;
            $this->siteId = $siteId;
            $this->boundaryStatus = $boundaryStatus;
            
	}
}
?>
