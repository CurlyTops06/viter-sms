<?php

require_once "../../../core/header.php";
require_once "../../../core/functions.php";
require_once "../../../models/developer/teachers/Teachers.php";

$conn = null;
$conn = checkDbConnection();

$body = file_get_contents("php://input");
$data = json_decode($body, true);
$val = new Teachers($conn);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if (array_key_exists('id', $_GET)) {
        $val->teachers_aid = $_GET['id'];
        $val->teachers_is_active = trim($data['isActive']);
        $val->teachers_updated = date('Y-m-d H:i:s');

        checkId($val->teachers_aid);

        $query = checkActive($val);
        http_response_code(200);
        returnSuccess($val, 'Teachers Active', $query);
    }
}

http_response_code(200);
checkAccess();
