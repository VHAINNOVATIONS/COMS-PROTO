<?php

function curPageName() {
						return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
					}
				
function PostTrack($ruser,$AccessCode,$point,$pointno,$sessionid){
	include "dbitcon.php";
		//GetID
		$tsql2 = "SELECT id FROM COMS_Track ORDER BY id";
		$getid = sqlsrv_query($conn, $tsql2);
			while( $row = sqlsrv_fetch_array($getid, SQLSRV_FETCH_ASSOC)) {
				$newid = $row['id'] + 1;
				}
		//Set Variables
		$ip_vistor=$_SERVER['REMOTE_ADDR'];
		$_SESSION['ip_vistor']= $ip_vistor;
		$compname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
		$_SESSION['compname'] = $compname;
		$page = curPageName();
		$_SESSION['page'] = $page;
		$url = (!empty($_SERVER['HTTPS'])) ? "https://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] : "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
		$_SESSION['url'] = $url;
		$time = date("g:i:s a");
		$date2 = date("F j, Y");
		//Insert into SQL
		$tsql1 = "INSERT INTO COMS_Track (id,ip,compname,ref,username,winauth,point,pointno,time,date2,sessionid,page) VALUES ($newid,'$ip_vistor','$compname','$url','$AccessCode','$ruser','$point','$pointno','$time','$date2','$sessionid','$page')";
		$posttrack = sqlsrv_query($conn, $tsql1);
	}
?>