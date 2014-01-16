<?php

class Git extends Model {
    function getIssues() {
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
        $url = 'https://api.github.com/repos/dbitpro/coms/issues?direction=asc';
        $handle = curl_init($url);
        curl_setopt_array($handle, $curlDefault);
        $html = curl_exec($handle);
        $urlEndpoint = curl_getinfo($handle, CURLINFO_EFFECTIVE_URL);
        curl_close($handle);
        $StoreResponse = "";
        $retArray = array();
        if ($html) {
            $json = json_decode($html);
            if (array_key_exists('message', $json)) {
                $retArray['message'] = $json->message;
            }
            else {
                foreach ($json as $issue) {
                    $tmp = array();
                    $tmp['url'] = $issue->html_url;
                    $tmp['number'] = $issue->number;
                    $tmp['title'] = $issue->title;
                    $tmp['state'] = $issue->state;
                    $tmp['created_at'] = $issue->created_at;
                    $tmp['body'] = mb_convert_encoding($issue->body_html, 'HTML-ENTITIES', 'UTF-8');
                    $tmp['label'] = "";
                    foreach ($issue->labels as $label) {
                        if ("Product Backlog - PoC" === $label->name 
                            || "Product Backlog - Prototype" === $label->name 
                            || "Defect Log" === $label->name) {
                            $tmp['label'] = $label->name;
                        }
                    }
                    $retArray[] = $tmp;
                }
            }
        }
        else {
            !rewind($verbose);
            $retArray['message'] = htmlspecialchars(stream_get_contents($verbose));
        }
        return $retArray;
    }
}

?>