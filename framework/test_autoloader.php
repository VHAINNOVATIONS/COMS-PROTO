<?php

define( 'DS', DIRECTORY_SEPARATOR );
define( 'ROOT', dirname( dirname( __FILE__ ) ) );

require_once (ROOT . DS . 'framework' . DS . 'config' . DS . 'config.php');

// function __autoload($class) {
//     include 'classes/' . $class . '.class.php';
// }

function my_autoloader($class) {
    include 'library/' . $class . '.class.php';
}

spl_autoload_register('my_autoloader');


?>