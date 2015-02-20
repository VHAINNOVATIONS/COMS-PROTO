<?php
  
class NodeVistaTest extends PHPUnit_Framework_TestCase
{
  public function testGetPatient()
  {
    $nodevista = new NodeVista();
    $patient = $nodevista->get('patient/100022');
    echo $patient;
  }
}
  
?>