<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// use models
$val = new Teachers($conn);

// students?id=12
// This is for request with specific ID
if (array_key_exists('id', $_GET)) {
    $val->teachers_aid = $_GET['id'];
    checkId($val->teachers_aid);
    $query = checkReadById($val);
    http_response_code(200);
    getResultData($query);
}

// students
// This is for request for reading all
if (empty($_GET)) {
    $query = checkReadAll($val);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
