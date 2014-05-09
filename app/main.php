<?php 
/** Archived Version Info
$ProjType = "Prototype, 0.1, June 18, 2012";
$ProjType = "Proof of Concept, 0.1, November 22, 2013";
$ProjType = "Proof of Concept, 0.2, December 13, 2013";
$ProjType = "Proof of Concept, 0.3, January 3, 2014";
$ProjType = "Proof of Concept, 0.4, January 24, 2014";
$ProjType = "Proof of Concept, 0.5, February 14, 2014";
$ProjType = "Proof of Concept, 0.6, March 7, 2014";
$ProjType = "Proof of Concept, 0.7, March 28, 2014";
$ProjType = "Proof of Concept, 0.8, April 18, 2014";
*/
$ProjType = "Proof of Concept, 0.9, May , 2014";
?>

<!doctype html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
		<title>Chemotherapy Order Management System (COMS)</title>

		<!-- CSS : ExtJS 4.0 Framework      -->
		<link rel="stylesheet" type="text/css" <?php echo "href=\"$LibsVersion/resources/css/ext-all.css\"";?>>
		<link rel="stylesheet" type="text/css" <?php echo "href=\"$Version/COMS.css\"";?>>
        <style>
        .Test td { vertical-align: top!important; }
        .RequiredInstr {
            margin: 10px;
            font-weight: bold;
        }
        .RequiredInstr em {
            color: red;
        }
        .centeredMsg {
            text-align: left;
            margin-left: 200px;
            font-weight: bold;
        }
        </style>

		<!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
		<script src="/libs/modernizr-2.0.6.js"></script>

		<script>
<?php 
/* Session Variables available - MWB 1/24/2014
            ["chktrack"]=> 1
            ["sessionid"]=> "iv3e8v7mi7jcokep9d3rnotah7" 
            ["sessionStatus"]=> 0
            ["role"]=> "All Roles" 
            ["dname"]=> "Programmer" 
            ["rid"]=> 26
            ["cprsUsername"]=> "1programmer" 
            ["cprsPass"]=> "programmer1" 
            ["Email"]=> "programmer1@dbitmail.com" 
            ["TemplateAuthoring"]=> 1
            ["Role_ID"]=> "63C5D238-9AB6-E111-A560-000C2935B86F" ; NOTE: This is really the unique User Id and maps to the "created_by" column in the Master Templates table.
            ["sitelist"]=> "901" 
            ["domain"]=> "mwb.dbitpro.com" 
            ["MDWS_Status"]=> "Crashed" 
            ["MDWS_Type"]=> "Disconnect" 
            ["MDWS_Msg"]=> "There are no open connections" 
            ["MDWS_Suggestion"]=> "" 
 *************************************/
/* Initializing of global JavaScript variables */
    echo "      var Page2Open = '$page2Open';\n";
	echo "		var theJSPath = '$Version/';\n";
    echo "      var session_ID = '" . $_SESSION["sessionid"] . "';\n";    /* Unique Session ID */
    echo "      var User_ID = '" . $_SESSION["Role_ID"] . "';\n";         /* Unique User ID */
	echo "		var User = '" . $_SESSION["winauth"] . "';\n";     /* Domain\User name of user currently logged into the domain */
	echo "		var CurUser = '" . get_current_user() . "';\n";     /* User name of user currently logged into the domain */
	echo "		var Sessionrid = '$rid';\n";
	echo "		var Sessionrole = '$role';\n";
	echo "		var SessionTemplateAuthoring = '$TemplateAuthoring';\n";
	echo "		var AuthType = '" . $_SESSION["winauth"] . "';\n";
    if (isset($FirstParam)) {
    	echo "		var FirstURL = '$FirstParam';\n";
    }
    else {
    	echo "		var FirstURL = '';\n";
    }
	echo "		var SessionUser = '" . $_SESSION["AC"] . "';\n";   /* CPRS User Name of user currently logged into App via CPRS */
?>
		</script>
	</head>
<body>

    <div id="Loader" style="position: absolute; left: 20%; margin: 20%; font-size: 24px; font-family: tahoma,arial,verdana,sans-serif">Loading Application</div>

    <div id="application" class="container initialHide">
        <header id="Header" class="application">
            <h1 id="title">Chemotherapy Order Management System (COMS)</h1>
            <h2 style="text-align: center;font-size: 1.5em; color: red;">Proof of Concept - Demo System</h2>
            <div id="welcome">
                Welcome <?php echo "" . $_SESSION[ "dname" ] . ", " . $_SESSION[ "role" ] . "";?> -- 
                <a href="support/" target='_blank'>Help</a>
            </div>
        </header>

        <section id="MainContent"></section>
        <form method="POST" action="<?php echo $_SERVER[ 'PHP_SELF' ];?>">
            <navigation id="EndControls" >
                <ul style="text-align: right; font-size:small;">
                    <!--<li style="display: inline;"><a href="app/feedback/fbf.php" target="_blank">Feedback</a></li>-->
                    <li style="display: inline;"><a href="sv.php" target='_blank'>_</a></li>
					<li style="display: inline;"><a href="support/" target='_blank'>Help</a></li>
                    <li style="display: inline;"><button class="anchor" onclick="logoutPrompt();"><b>Logout</b></button>
                    <li style="display: inline;"><a href="Issues/" target='_blank'>Backlogs and Defects</a></li>
                    <li style="display: inline;"><a href="Track/" target='_blank'>Access History</a></li>
                </ul>
            </navigation>
        </form>
    </div>    <!-- end of #Application -->

    <div id="footer" class="initialHide" >
        <abbr title="Chemotherapy Order Management System">COMS</abbr> <?php echo $ProjType; ?>
        <div>
            This application works best in 
            MS-IE Version 9 or above, 
            Mozilla Firefox Version 20 and above, 
            Google Chrome Version 30 and above
        </div>

        <!-- Display MDWS Notational information here -->
        <div id="MDWs_Info"></div>

        <!-- Display Boomerang Page Load Statistics here -->
        <div id="results"></div>
    </div>

    <!-- Display ConsoleLog information here -->
    <section style="color: silver; margin-left: 1em;">
        <h2>Log Info</h2>
        <div id="LogInfo" style="height:100px; overflow: auto;"></div>
    </section>

    <script type="text/javascript" <?php echo "src=\"$LibsVersion/ext-all-debug.js\"";?>></script>
    <script type="text/javascript" src="/libs/boomerang.js"></script>
    <script type="text/javascript" src="LocalizedCode.js"> </script>
    <script type="text/javascript" src="/libs/prettyPrint.js"></script>
	<script type="text/javascript" <?php echo "src=\"$Version/$Deployment\"";?>></script>

	<script>
	    var UseNewQueryMethod = true;
	    var MDWSTypeMsg = "MDWS Match Query in use";
	    var SQLTypeMsg = "SQL Query in use";

	    function switchQueryMethod() {
			var MDWS = "MDWS/Match Query Method";
			var SQL = "Internal SQL Query Method";
			var msg, nextMthd, msg2Use;
			if (UseNewQueryMethod) {
				msg = MDWS;
				nextMthd = "Press \"OK\" to switch to the " + SQL;
			}
			else {
				msg = SQL;
				nextMthd = "Press \"OK\" to switch to the " + MDWS;
			}

			var temp = confirm("Currently using " + msg + ". \n" + nextMthd + "\nOr cancel to keep using the " + msg);
			if (temp) {
				if (UseNewQueryMethod) {
					UseNewQueryMethod = false;
					msg2Use = SQLTypeMsg;
				}
				else {
					UseNewQueryMethod = true;
					msg2Use = MDWSTypeMsg;
				}

				var el = document.getElementById("QueryType");
				if (el) {
					el.innerHTML = msg2Use;
				}
			}
		}

		var LogoutCancelled = true;
		function logoutConfirmed(btn) {
			if ("yes" === btn) {
				LogoutCancelled = false;
				document.location.href="/logout.php";
			}
			else {
				LogoutCancelled = true;
			}
		}
		function logoutPrompt(e) {
			Ext.MessageBox.confirm('Confirm', 'Are you sure you want to logout?', logoutConfirmed);
		}

		window.onbeforeunload = function(e) { // see: http://jsfiddle.net/zalun/yFuPr/
			if (LogoutCancelled) {
				e = e || window.event;
				e.preventDefault = false;
				e.cancelBubble = false;
				e.returnValue = '';
			}
		}
	</script>
</body>
</html>