<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Allergy
 *
 * @author Kevin
 */
class Allergy {
	public $id = "";
	public $name = "";
	public $type = "";
	public $comment = "";
	function __construct($id, $name, $type, $comment) {
		$this->id = $id;
		$this->name = $name;
		$this->type = $type;
		$this->comment = $comment;
	}
}
?>
