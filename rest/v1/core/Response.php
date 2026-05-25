<?php

class Response
{
    private $_success;
    private $_data;
    private $_statusCode;
    private $_toCache = false;
    private $_responseData = [];

    // Only Set the Success Var in the response class
    public function setSuccess($success)
    {
        $this->_success = $success;
    }
    // Only Set the data in the response class
    public function setData($data)
    {
        $this->_data = $data;
    }
    // Only Set the status code in the response class
    public function setStatusCode($statusCode)
    {
        $this->_statusCode = $statusCode;
    }
    // Only set the cache in the response class
    public function toCache($toCache)
    {
        $this->_toCache = $toCache;
    }
    // This Function send the response to the UI Client
    public function send()
    {
        header("Content-type:application/json;");

        if ($this->_toCache == true) {
            header("Cache-Control: max-age=60");
        } else {
            header("Cache-Control: no-cache, no-store");
        }
        $this->_responseData = $this->_data;

        echo json_encode($this->_responseData);
    }
}
