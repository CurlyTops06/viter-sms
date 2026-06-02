<?php

require_once "../../../core/header.php";
require_once "../../../core/functions.php";
require_once "../../../models/developer/school-year/SchoolYear.php";

$conn = null;
$conn = checkDbConnection();

$body = file_get_contents("php://input");
$data = json_decode($body, true);
$val = new SchoolYear($conn);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if (array_key_exists('id', $_GET)) {
        $val->school_year_aid = $_GET['id'];
        $val->school_year_is_active = trim($data['isActive']);
        $val->school_year_updated = date('Y-m-d H:i:s');

        checkId($val->school_year_aid);

        $query = checkActive($val);
        http_response_code(200);
        returnSuccess($val, 'School Year Active', $query);
    }
}

http_response_code(200);
checkAccess();
