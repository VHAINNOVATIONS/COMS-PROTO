<?php

class NodeVista{
  
  /**
  *  POST to Node VISTA
  * @param url - this should be the operation, plus any get params - e.g: /patient/id?param=value
  */
  public function get($url){
    return $this->call("GET", $url);
  }
  
  /**
  *  POST to Node VISTA
  * @param url - this should be the operation - e.g: /patient/id
  */
  public function post($url, $data=false){
      $ret = $this->call("POST", $url, $data);
      error_log("NodeVista Class - Post - URL - " . $url);
      // error_log("NodeVista Class - Post - DATA - " . json_encode($data));
      error_log("NodeVista Class - Post - RET - " . $ret);
      return $ret;
  }

  /* 
  * function to consolidate configuration to node vista
  * All HTTP methods should call this function
  */
  private function call($method, $url, $data = false)
  {
      $curl = curl_init();
      error_log("NodeVista Class - Basic Call Function Method = $method");
      // error_log("NodeVista Class - Basic Call Function Data = " . json_encode($data));
      switch ($method) {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);
                if ($data) {
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                }
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data) {
                    $url = sprintf("%s?%s", $url, http_build_query($data));
                }
        }

//      error_log("NodeVista Class - Basic Call Function SESSION Variables- " . json_encode($_SESSION));

      // Authentication to Node Vista
        // 'X-ACCESS-CODE: '.NV_ACCESS_CODE,
        // 'X-VERIFY-CODE: '.NV_VERIFY_CODE,
      curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'X-Access-Token: '.NV_ACCESS_TOKEN,
        'X-Token-Secret: '.NV_ACCESS_SECRET,
        'X-ACCESS-CODE: '.$_SESSION["AccessCode"],
        'X-VERIFY-CODE: '.$_SESSION["VerifyCode"],
        'Content-Type: application/json'
      ));
      curl_setopt($curl, CURLOPT_URL, NV_BASE_URL.'/'.$url);

error_log("NodeVista Class URL = " . NV_BASE_URL.'/'.$url);


      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

      $result = curl_exec($curl);
      
      // if result is json, Decode and send it back
      $contentType = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
      curl_close($curl);

error_log("NodeVista Result Set = $result");

      return $result;
  }
}


