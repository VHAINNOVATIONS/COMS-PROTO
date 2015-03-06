<?php
class Template
{
    protected $variables = array();
    protected $_controller;
    protected $_action;

    public function __construct($controller, $action)
    {
        $this->_controller = $controller;
        $this->_action = $action;
    }

    /** Set Variables **/

    public function set($name, $value)
    {
        $this->variables[$name] = $value;
    }

    public function get($name)
    {
        return $this->variables[$name];
    }

    /** Display Template **/

    public function render()
    {
        extract($this->variables);
        /*
         * Workaround to access controller function without requiring them to have a view.
         *
         */
        if (null != $this->_action) {
            $incPath = ROOT.DS.'framework'.DS.'application'.DS.'views'.DS.$this->_controller.DS.$this->_action.'.php';
            include ROOT.DS.'framework'.DS.'application'.DS.'views'.DS.$this->_controller.DS.$this->_action.'.php';
        }
    }
}
