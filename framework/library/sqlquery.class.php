<?php

/*
 * 	MWB - 1 Dec 2011 
 * 	Moved some code around and added braces breaking short if statements into multiple lines as part of Best Current Practice (BCP)
 * 	Added some changes for error checking and proper connection to DB for the DBITPro environment
 * 	See details below
 */

class SQLQuery {

    protected $_dbHandle;
    protected $_result;

    // MWB - 12/2/2011 - Moved this function above where it used to be.
    // Defining a function before it's used is a BCP which LINT checkers will catch if not done.
    private function getDbConnect($address, $account, $pwd, $name) {

        if (DB_TYPE == 'mssql') {
            return mssql_connect($address, $account, $pwd);
        }
        if (DB_TYPE == 'sqlsrv') {
            if (defined('DBITPro_Dev')) {
                // MWB - 1 Dec 2011 - For the DBITPro environment, do not need UID or PWD to log into server, 
                // usess Windows Authentication for this.
                // The DBITPro_Dev is defined in constants.php
                //$connectionInfo = array("Database" => $name);		// Temporary disabled till we can get it working
                $connectionInfo = array("UID" => $account, "PWD" => $pwd, "Database" => $name);
            } else {
                $connectionInfo = array("UID" => $account, "PWD" => $pwd, "Database" => $name);
            }

            // MWB - 1 Dec 2011 - Added error check to see if connection was made
            $conn = sqlsrv_connect($address, $connectionInfo);
            // MWB - 1 Dec 2011 - BCP Note Constant on left side of comparator as a BCP which prevents an inadvertant assignment rather than a compare
            if (false === $conn) {
                echo "Could not connect.\n";
                die(print_r(sqlsrv_errors(), true));
            }
            return $conn;
        }
        if (DB_TYPE == 'mysql') {
            $conn = mysql_connect($address, $account, $pwd);
            if (false === $conn) {
                echo "Could not connect.\n";
                die(print_r(mysql_errors(), true));
            }
            return $conn;
        }
    }

    // MWB - 12/2/2011 - Moved this function above where it used to be.
    // Defining a function before it's used is a BCP which LINT checkers will catch if not done.
    private function getDbHandle($address, $account, $pwd, $name) {
        $this->_dbHandle = $this->getDbConnect($address, $account, $pwd, $name);
        if (!$this->_dbHandle || $this->_dbHandle == 0) {
            echo "Connection could not be established.\n";
            die(print_r($this->getError(), true));
            return 0;
        }
    }

    /** Connects to database * */
    function connect($address, $account, $pwd, $name) {
        $this->getDbHandle($address, $account, $pwd, $name);
        //mssql driver specific
        if (DB_TYPE == 'mssql') {
            if (mssql_select_db($name, $this->_dbHandle)) {
                return 1;
            } else {
                return 0;
            }
        } else if (DB_TYPE == 'mysql') {
            if (mysql_select_db($name, $this->_dbHandle)) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    /** Disconnects from database * */
    function disconnect() {

        if (DB_TYPE == 'sqlsrv') {
            if (@sqlsrv_close($this->_dbHandle) != 0) {
                return 1;
            } else {
                return 0;
            }
        } else if (DB_TYPE == 'mssql') {
            if (@mssql_close($this->_dbHandle) != 0) {
                return 1;
            } else {
                return 0;
            }
        } else if (DB_TYPE == 'mysql') {
            if (@mysql_close($this->_dbHandle) != 0) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    function select($id) {
        $query = "select * from " . $this->_table . " where id = \'" . $id . "\'";
        return $this->query($query, 1);
    }
	
    function begin(){
        if(DB_TYPE == 'sqlsrv'){		
            sqlsrv_begin_transaction($this->_dbHandle);
        }else if(DB_TYPE == 'mysql'){
            mysql_query("BEGIN",  $this->_dbHandle);
        }
    }

    function rollback(){
        if(DB_TYPE == 'sqlsrv'){		
            sqlsrv_rollback($this->_dbHandle);
        }else if(DB_TYPE == 'mysql'){
            mysql_query("ROLLBACK",  $this->_dbHandle);
        }
    }

    function commit(){
        if(DB_TYPE == 'sqlsrv'){		
            sqlsrv_commit($this->_dbHandle);
        }else if(DB_TYPE == 'mysql'){
            mysql_query("COMMIT",  $this->_dbHandle);
        }
    }
	/** Track SQL Query **/
function PostSQLQuery($query){
	include "dbitcon.php";
		//Insert into SQL
		$qv = strval($query);
		$qv1 = str_replace("'", "//", $qv);
		$sessionid = $_SESSION['sessionid'];
		$username = $_SESSION['winauth'];
		$tsql1 = "INSERT INTO COMS_Queries (query,sessionid, username) VALUES ('$qv1','$sessionid','$username')";
		$postsqlq = sqlsrv_query($conn, $tsql1);
		//echo $tsql1;
	}
	
    /** Custom SQL Query * */
    function query($query, $singleResult = 0) {
	$this->PostSQLQuery($query);
		if (DB_TYPE == 'mssql') {
            $this->_result = mssql_query($query, $this->_dbHandle);
        } else if (DB_TYPE == 'sqlsrv') {
            $this->_result = sqlsrv_query($this->_dbHandle, $query);
        } else if (DB_TYPE == 'mysql') {
            $this->_result = mysql_query($query, $this->_dbHandle);
        }
        if(!$this->_result){
            return array("error" => $this->getError());
        }
        if (preg_match("/select/i", $query)) {
            $result = array();
            $field = array();
            $numOfFields = $this->setResultFieldsArray($field);
            $result = $this->getResultSet($numOfFields, $field, $singleResult);
            return($result);
        }
    }

    private function getResultSet($numOfFields, &$field, $singleResult) {

        $tempResults = array();
        $result = array();

        //$table = array();

        while ($row = $this->getNextRow($this->_result)) {
            for ($i = 0; $i < $numOfFields; ++$i) {
                $tempResults[$field[$i]] = $row[$i];
            }
            if ($singleResult == 1) {
                //$this->freeResult();
                return $tempResults;
            }
            array_push($result, $tempResults);
        }

        //$this->freeResult();

        return $result;
    }

    function getNextRow(&$record) {
        if (DB_TYPE == 'sqlsrv') {
            return sqlsrv_fetch_array($this->_result);
        } else if (DB_TYPE == 'mssql') {
            return mssql_fetch_row($this->_result);
        } else if (DB_TYPE == 'mysql') {
            return mysql_fetch_row($this->_result);
        }
    }

    private function setResultFieldsArray(&$field) {

        $numOfFields = $this->getNumFields();

        if (DB_TYPE == 'mssql') {
            for ($i = 0; $i < $numOfFields; ++$i) {
                array_push($field, mssql_field_name($this->_result, $i));
            }
        } else if (DB_TYPE == 'sqlsrv') {
            /* Get and display field metadata. */
            foreach (sqlsrv_field_metadata($this->_result) as $fieldMetadata) {
                foreach ($fieldMetadata as $name => $value) {
                    if (strtoupper($name) == "NAME") {
                        array_push($field, $value);
                    }
                }
            }
        } else if (DB_TYPE == 'mysql') {
            for ($i = 0; $i < $numOfFields; ++$i) {
                array_push($field, mysql_field_name($this->_result, $i));
            }
        }

        return $numOfFields;
    }

    function getNumFields() {

        if (DB_TYPE == 'sqlsrv') {
            return sqlsrv_num_fields($this->_result);
        } else if (DB_TYPE == 'mssql') {
            return mssql_num_fields($this->_result);
        } else if (DB_TYPE == 'mysql') {
            return mysql_num_fields($this->_result);
        }
    }

    /** Get number of rows * */
    function getNumRows() {
        if (DB_TYPE == 'sqlsrv') {
            return sqlsrv_num_rows($this->_result);
        } else if (DB_TYPE == 'mssql') {
            return mssql_num_rows($this->_result);
        } else if (DB_TYPE == 'mysql') {
            return mysql_num_rows($this->_result);
        }
    }

    /** Free resources allocated by a query * */
    function freeResult() {
        if (DB_TYPE == 'sqlsrv') {
            sqlsrv_cancel($this->_result);
        } else if (DB_TYPE == 'mssql') {
            mssql_free_result($this->_result);
        } else if (DB_TYPE == 'mysql') {
            mysql_free_result($this->_result);
        }
    }

    /** Get error string * */
    function getError() {
        if (DB_TYPE == 'sqlsrv') {
            return sqlsrv_errors();
        } else if (DB_TYPE == 'mssql') {
            return mssql_get_last_message();
        } else if (DB_TYPE == 'mysql') {
            return mysql_error();
        }
    }
    
    function getCurrentDate() {
        
    	if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "Select CONVERT(VARCHAR,GETDATE(),121) as currdate";
    	} else if (DB_TYPE == 'mysql') {
            $query = "Select NOW() as currdate";    	
    	}

        $currDate = $this->query($query);
        $currDate = $currDate[0]['currdate'];

        return $currDate;
    }
    
    /**
     * 
     * @param string $string
     * @return string
     */
    public function escapeString($string)
    {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            return str_replace("'", "''", $string);
    	} else if (DB_TYPE == 'mysql') {
            return mysql_real_escape_string($string);  	
    	}
        
        return $string;
    }
}