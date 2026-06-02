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
    if (array_key_exists('start', $_GET)) {
        $val->start = $_GET['start'];
        $val->total = 3;
        $val->is_active = isset($data['filterStatus']) ? $data['filterStatus'] : '';
        $val->search = isset($data['searchValue']) ? $data['searchValue'] : '';

        $query = checkReadLimit($val);
        $total_result = checkReadAll($val);

        checkLimitId($val->start, $val->total);
        checkReadQuery(
            $query,
            $total_result,
            $val->total,
            $val->start
        );
    }
    checkEndpoint();
}

http_response_code(200);
checkAccess();
