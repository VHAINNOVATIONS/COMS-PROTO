<?php
/*
 * Module for testing access to the Github Issues API
 * Calling this file from the URL of a browser will list out issues from the COMS repo in github.
 */
$ChromePHP_File = __DIR__ . "/../../app/ChromePhp.php";
if (file_exists($ChromePHP_File)) {
    // echo "Got ChromePHP - <br>$ChromePHP_File<br>";
    require_once $ChromePHP_File;
    ChromePhp::log("Chrome PHP Working...");
}
else {
    echo "ChromePHP - $ChromePHP_File is invalid<br>";
}

$curlDefault = array(
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_FOLLOWLOCATION => TRUE,
    CURLOPT_ENCODING => '',
    CURLINFO_SSL_VERIFYRESULT =>FALSE,
    CURLOPT_SSL_VERIFYHOST =>FALSE,
    CURLOPT_SSL_VERIFYPEER =>FALSE,
    CURLOPT_HTTPHEADER => array(
        'Proxy-Connection: Close',
        'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1017.2 Safari/535.19',
        'Accept: text/html,application/vnd.github.VERSION.html+json',
        'Accept-Encoding: gzip,deflate,sdch',
        'Accept-Language: en-US,en;q=0.8',
        'Accept-Charset: utf-8',
        'Connection: Close',
        'Authorization: token 50688565c26b2e0dd929b4c20674681815292a7f'
    ),
    CURLOPT_VERBOSE => TRUE,
    CURLOPT_STDERR => $verbose = fopen('php://temp', 'rw+')
);

// additional parameters - http://developer.github.com/v3/issues/
// state=closed;
// 
// $url = 'https://api.github.com/repos/dbitpro/coms/issues?direction=asc&labels=Product%20Backlog%20-%20POC';
$url = 'https://api.github.com/repos/dbitpro/coms/issues?direction=asc';
$handle = curl_init($url);
curl_setopt_array($handle, $curlDefault);
$html = curl_exec($handle);
$urlEndpoint = curl_getinfo($handle, CURLINFO_EFFECTIVE_URL);
curl_close($handle);
$StoreResponse = "";
if ($html) {
        $json = json_decode($html);
        // var_dump($json);
        foreach ($json as $issue) {
            // $json1 = json_encode($issue);
            // echo "JSON - <br> $json1 <hr>";
            echo "URL - " . $issue->html_url . "<br>";
            echo "Issue # - " . $issue->number . "<br>";
            echo "Issue Title - " . $issue->title . "<br>";
            echo "State - " . $issue->state . "<br>";
            echo "Created - " . $issue->created_at . "<br>";
            echo "Body - " . mb_convert_encoding($issue->body_html, 'HTML-ENTITIES', 'UTF-8') . "<br>";
            foreach ($issue->labels as $label) {
                echo "Assigned Label - " . $label->name . "<br>";
            }
            echo "<hr>";
        }

}
else {
    echo "Response BAD...<br>";
    echo "Error - " . curl_error($c) . "<br>";
    echo "Line No - " . curl_errno($c) . "<br>";
    echo "Verbose information:\n<pre>", !rewind($verbose), htmlspecialchars(stream_get_contents($verbose)), "</pre>\n";
}

?>