<?php
/*
 *	MWB 2 Dec 2011
 *	Made several changes in the callHook() function below as part of debugging found that apparently the URLRewrites aren't working as expected
 *	But added some "array_shift's" to get around the problem for now.
 *	Still getting "Warnings"
 */



/** Check if environment is development and display errors **/

function setReporting() {
if (DEVELOPMENT_ENVIRONMENT == true) {
	error_reporting(E_ALL);
	ini_set('display_errors','On');
} else {
	error_reporting(E_ALL);
	ini_set('display_errors','Off');
	ini_set('log_errors', 'On');
	ini_set('error_log', ROOT.DS.'tmp'.DS.'logs'.DS.'error.log');
}
}

/** Check for Magic Quotes and remove them **/

function stripSlashesDeep($value) {
	$value = is_array($value) ? array_map('stripSlashesDeep', $value) : stripslashes($value);
	return $value;
}

function removeMagicQuotes() {
if ( get_magic_quotes_gpc() ) {
	$_GET    = stripSlashesDeep($_GET   );
	$_POST   = stripSlashesDeep($_POST  );
	$_COOKIE = stripSlashesDeep($_COOKIE);
}
}

/** Check register globals and remove them **/

function unregisterGlobals() {
    if (ini_get('register_globals')) {
        $array = array('_SESSION', '_POST', '_GET', '_COOKIE', '_REQUEST', '_SERVER', '_ENV', '_FILES');
        foreach ($array as $value) {
            foreach ($GLOBALS[$value] as $key => $var) {
                if ($var === $GLOBALS[$key]) {
                    unset($GLOBALS[$key]);
                }
            }
        }
    }
}

/** Main Call Function **/

function callHook() {
	global $url;

	$urlArray = array();
	$urlArray = explode("/",$url);

// Testing with the following URI - https://devtest.dbitpro.com/views/LookUp/getJSONRegimens
//
// MWB 2 Dec 2011 - "public" is getting prepended to the URI for some reason...
// Possible URL-Redirect bug?
// Shifing the $urlArray if the first element is "public" eliminates this problem
// YES, this is a hack but it's for testing only

/* KD 12/9/11 - Not observing the behavior any more. Try with following URI
   https://devtest.dbitpro.com/LookUp/Templates

if ("public" === $urlArray[0]) {
	array_shift($urlArray);
}

// MWB 2 Dec 2011 - Ditto - "views" is getting prepended to the URI for some reason...
// Possible URL-Redirect bug?
// Shifing the $urlArray if the first element is "public" eliminates this problem
// YES, this is a hack but it's for testing only
if ("views" === $urlArray[0]) {
	array_shift($urlArray);
}
*/

// KD 12/8/11 - This is added because currently all the uri's in the stores have 'coms' prepended
// I had prepended coms b/c on my local Apache server the application is deployed with coms as root
// I was not able to deploy the same way on IIS for some reason. 
if ("coms" === $urlArray[0]) {
	array_shift($urlArray);
}


	$controller = $urlArray[0];
	array_shift($urlArray);
	$action = $urlArray[0];
	array_shift($urlArray);
	$queryString = $urlArray;

	$controllerName = $controller;
	$controller = ucwords($controller);
	//$model = rtrim($controller, 's');
	$model = rtrim($controller);
	$controller .= 'Controller';
        

// MWB 2 Dec 2011 Debugging
// echo "Controller Name - $controllerName<br>Model - $model<br>Action - $action<br>";
	$dispatch = new $controller($model,$controllerName,$action);

	if ((int)method_exists($controller, $action)) {
		call_user_func_array(array($dispatch,$action),$queryString);
	} else {
		/* Error Generation Code Here */
	}
}

/** Autoload any classes that are required **/

function __autoload($className) {
	if (file_exists(ROOT . DS . 'framework' . DS . 'library' . DS . strtolower($className) . '.class.php')) {
		require_once(ROOT . DS . 'framework' . DS . 'library' . DS . strtolower($className) . '.class.php');
	} else if (file_exists(ROOT . DS . 'framework' . DS . 'application' . DS . 'controllers' . DS . strtolower($className) . '.php')) {
		require_once(ROOT . DS . 'framework' . DS . 'application' . DS . 'controllers' . DS . strtolower($className) . '.php');
	} else if (file_exists(ROOT . DS . 'framework' . DS . 'application' . DS . 'models' . DS . strtolower($className) . '.php')) {
		require_once(ROOT . DS . 'framework' . DS . 'application' . DS . 'models' . DS . strtolower($className) . '.php');
	} else if (file_exists(ROOT . DS . 'framework' . DS . 'library' . DS . 'vitals' . DS. strtolower($className) . '.class.php')) {
		require_once(ROOT . DS . 'framework' . DS . 'library' . DS . 'vitals' . DS. strtolower($className) . '.class.php');
	} else if (file_exists(ROOT . DS . 'framework' . DS . 'library' . DS . 'allergies' . DS. strtolower($className) . '.class.php')) {
		require_once(ROOT . DS . 'framework' . DS . 'library' . DS . 'allergies' . DS. strtolower($className) . '.class.php');
	} else if (file_exists(ROOT . DS . 'framework' . DS . 'library' . DS . 'labresults' . DS. strtolower($className) . '.class.php')) {
		require_once(ROOT . DS . 'framework' . DS . 'library' . DS . 'labresults' . DS. strtolower($className) . '.class.php');
	} else {
		/* Error Generation Code Here */
	}
}

setReporting();
removeMagicQuotes();
unregisterGlobals();
callHook();

?>
