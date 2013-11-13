<?php

/**
 * Flowsheet controller
 */
class FlowsheetController extends Controller
{

    /**
     * Checks whether the given result set contains errors
     *
     * @param string $errorMsg
     * @param array $retVal
     * @return boolean
     * @todo Move this highly duplicated function into the parent Controller class
     */
    private function _checkForErrors($errorMsg, $retVal)
    {
        if (!empty($retVal['error'])) {

            if (DB_TYPE == 'sqlsrv' && is_array($retVal['error'])) {
                foreach ($retVal['error'] as $error) {
                    $errorMsg .= "SQLSTATE: " . $error['SQLSTATE'] . " code: " . $error['code'] . " message: " .
                         $error['message'];
                }
            } else if (DB_TYPE == 'mysql') {
                $errorMsg .= $retVal['error'];
            }

            $this->set('frameworkErr', $errorMsg);

            return true;
        }

        return false;
    }

    /**
     * 
     * @param String $id
     * @return null
     */
    public function FS($id = null)
    {
        $requestData = json_decode(file_get_contents('php://input'));
        
        if (! empty($requestData)) {
            
            $this->Flowsheet->beginTransaction();
            
            $returnVal = $this->Flowsheet->saveFlowsheet($requestData);
            
            if ($this->_checkForErrors('Update Flowsheet Notes Values Failed. ', $returnVal)) {
                $this->Flowsheet->rollbackTransaction();
                $this->set('jsonRecord', 
                    array(
                        'success' => false,
                        'msg' => $this->get('frameworkErr')
                    ));
                return;
            }
            
            $this->Flowsheet->endTransaction();
            
            $this->set('jsonRecord', 
                array(
                    'success' => true,
                    'total' => 1,
                    'records' => array(
                        'FS_ID' => $this->Flowsheet->getFlowsheetId()
                    )
                ));
        } else {
			
            $records = $this->Flowsheet->getFlowsheet($id);
            
            if (empty($records)) {
                $records['error'] = 'No Records Found';
            }
            
            if ($this->_checkForErrors('Get Flowsheet Failed. ', $records)) {
                $this->set('jsonRecord', 
                    array(
                        'success' => false,
                        'msg' => $this->get('frameworkErr') . $records['error']
                    ));
                return;
            }

            $this->set('jsonRecord', 
                array(
                    'success' => true,
                    'total' => count($records),
                    'records' => $records
                ));
        }
    }
}