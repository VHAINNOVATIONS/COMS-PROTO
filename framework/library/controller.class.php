<?php
class Controller {
    protected $_model;
    protected $_controller;
    protected $_action;
    protected $_template;

    function __construct($model, $controller, $action) {
        $this->_controller = $controller;
        $this->_action = $action;
        $this->_model = $model;
        $this->$model = new $model;
        $this->_template = new Template($controller,$action);
    }

    function set($name,$value) {
        $this->_template->set($name,$value);
    }

    function __destruct() {
            $this->_template->render();
    }

    function get($name){
        return $this->_template->get($name);
    }

    function varDumpToString ($var) {
        ob_start();
        var_dump($var);
        $result = ob_get_clean();
        return $result;
    }

    function escapeString($string) {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            return str_replace("'", "''", $string);
        } else if (DB_TYPE == 'mysql') {
            return mysql_real_escape_string($string);  	
        }
        return $string;
    }
}

?>
