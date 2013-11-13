<?php
class Model extends SQLQuery {
    protected $_model;

    function __construct() {

            $this->connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
            $this->_model = get_class($this);
            $this->_table = $this->_model;
    }

    function __destruct() {
    }
        
    function beginTransaction() {

        $this->begin();
    }

    function rollbackTransaction() {

        $this->rollback();
    }

    function endTransaction() {

        $this->commit();
    }
        
}

?>
