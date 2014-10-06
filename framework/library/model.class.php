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

    function newGUID() {
        $query = "SELECT NEWID()";
        $GUID = $this->query($query);
        $GUID = $GUID[0][""];
        return $GUID;
    }

    function escapeString($string) {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            return str_replace("'", "''", $string);
        } else if (DB_TYPE == 'mysql') {
            return mysql_real_escape_string($string);  	
        }
        return $string;
    }
    
    function NTD_StripLeadingFromDrugName($s = null) {
        $pattern = '/^\d+\. /';
        $r = preg_replace($pattern, "", $s);
        error_log("NTD_StripLeadingFromDrugName - $s - [$r]");
        return $r;
    }
}

?>
