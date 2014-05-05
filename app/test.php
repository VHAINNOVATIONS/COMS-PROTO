<?php 
/* [EDIT by danbrown AT php DOT net: 
   The author of this note named this 
   file tmp.php in his/her tests. If 
   you save it as a different name, 
   simply update the links at the 
   bottom to reflect the change.] */ 

error_reporting( E_ALL ); 
ini_set( 'display_errors', 1);
date_default_timezone_set('Asia/Tokyo');

//ini_set( 'session.save_path', '/tmp' ); // for debug purposes
   
session_start(); 

// check if session_id() exists.
/*
for example, if exists and session wont read, must send session.name as parameter in URL.

Some servers configurations may have problem to recognize PHPSESSID, even if transid value is 0 or 1.  
So, this test is usefull to identify any causes.

*/
if( session_id() == '' )
{
    echo 'session_id() empty';
}else{
    echo session_id();
}
echo '<hr>';

$sessPath   = ini_get('session.save_path'); 
$sessCookie = ini_get('session.cookie_path'); 
$sessName   = ini_get('session.name'); 
$sessVar    = 'foo'; 

echo '<br>sessPath: ' . $sessPath; 
echo '<br>sessCookie: ' . $sessCookie; 

echo '<hr>'; 

if( !isset( $_GET['p'] ) ){ 
    // instantiate new session var 
    $_SESSION[$sessVar] = 'hello world'; 
}else{ 
    if( $_GET['p'] == 1 ){ 

        // printing session value and global cookie PHPSESSID 
        echo $sessVar . ': '; 
        if( isset( $_SESSION[$sessVar] ) ){ 
            echo $_SESSION[$sessVar]; 
        }else{ 
            echo '[not exists]'; 
        } 

        echo '<br>' . $sessName . ': '; 

        if( isset( $_COOKIE[$sessName] ) ){ 
        echo $_COOKIE[$sessName]; 
        }else{ 
            if( isset( $_REQUEST[$sessName] ) ){ 
            echo $_REQUEST[$sessName]; 
            }else{ 
                if( isset( $_SERVER['HTTP_COOKIE'] ) ){ 
                echo $_SERVER['HTTP_COOKIE']; 
                }else{ 
                echo 'problem, check your PHP settings'; 
                } 
            } 
        } 

    }else{ 

        // destroy session by unset() function 
        unset( $_SESSION[$sessVar] ); 

        // check if was destroyed 
        if( !isset( $_SESSION[$sessVar] ) ){ 
            echo '<br>'; 
            echo $sessName . ' was "unseted"'; 
        }else{ 
            echo '<br>'; 
            echo $sessName . ' was not "unseted"'; 
        } 

    } 
} 
?> 
<hr> 
<a href=test.php?p=1&<?php echo $sessName . '=' . session_id();?>>test 1 (printing session value)</a> 
<br> 
<a href=test.php?p=2&<?php echo $sessName . '=' . session_id();?>>test 2 (kill session)</a> 