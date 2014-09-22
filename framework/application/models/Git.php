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
                'Authorization: token 5ec2967f1c2dc9364736f3ec35f6ed4f9fe4dc4c'
            ),
            CURLOPT_VERBOSE => TRUE,
            CURLOPT_STDERR => $verbose = fopen('php://temp', 'rw+')
        );
        $StoreResponse = "";
        $retArray = array();
        $baseUrl = 'https://api.github.com/repos/dbitpro/coms/issues?direction=asc';
        for ($i=1; $i < 20; $i++) {
            $url = $baseUrl . "&page=" . $i;
            $handle = curl_init($url);
            curl_setopt_array($handle, $curlDefault);
            $html = curl_exec($handle);
            $urlEndpoint = curl_getinfo($handle, CURLINFO_EFFECTIVE_URL);
            curl_close($handle);

            if ($html) {
                $json = json_decode($html);
                if (count($json) > 0) {
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
                            $tmp['created_at'] = substr($issue->created_at, 0, 10);
                            $tmp['body'] = mb_convert_encoding($issue->body_html, 'HTML-ENTITIES', 'UTF-8');
                            $tmp['body'] = preg_replace("/<img[^>]+\>/i", "", $tmp['body']); 
                            $tmp['label'] = "";
                            foreach ($issue->labels as $label) {
                                if ("Product Backlog - POC" === $label->name) {
                                    $tmp['label'] = "01 " . $label->name;
                                }
                                else if ("Product Backlog - Prototype" === $label->name) {
                                    $tmp['label'] = "02 " . $label->name;
                                }
                                else if ("Defect Log" === $label->name) {
                                    $tmp['label'] = "03 " . $label->name;
                                }
                            }
                            if ("" !== $tmp['label']) {
                                $retArray[] = $tmp;
                            }
                        }
                    }
                }
                else {
                    return $retArray;
                }
            }
            else {
                return $retArray;
            }
        }
        return $retArray;
    }
}

?>