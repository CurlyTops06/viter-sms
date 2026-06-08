<?php

// Require header to accept json data
require_once "../../../core/header.php";
// Require needed functions
require_once "../../../core/functions.php";
// Require the model classes
require_once "../../../models/developer/classes/Classes.php";
//connect to db
$conn = null;
$conn = checkDbConnection();

// Get Payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);
//store models in a variable
$val = new Classes($conn);

// HTTP Authorization is the first layer of the security of our web app
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if (array_key_exists('id', $_GET)) {
        $val->classes_aid = $_GET['id'];
        $val->classes_is_active = trim($data['isActive']);
        $val->classes_updated = date('Y-m-d H:i:s');

        //validation
        checkId($val->classes_aid);

        $query = checkActive($val);
        http_response_code(200);
        returnSuccess($val, 'Classes Active', $query);
    }
}

// THis is to prevent white page
http_response_code(200);
checkAccess();
