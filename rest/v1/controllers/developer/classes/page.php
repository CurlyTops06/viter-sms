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
    if (array_key_exists('start', $_GET)) {
        $val->start = $_GET['start'];
        $val->total = 3;
        $val->is_active = isset($data['filterStatus']) ? $data['filterStatus'] : '';
        $val->search_grade = isset($data['filterGrade']) ? $data['filterGrade'] : '';
        $val->search_adviser = isset($data['filterAdviser']) ? $data['filterAdviser'] : '';
        $val->search_section = isset($data['filterSection']) ? $data['filterSection'] : '';
        $val->search_school_year = isset($data['filterSchoolYear']) ? $data['filterSchoolYear'] : '';
        $val->search = isset($data['searchValue']) ? $data['searchValue'] : '';

        $query = checkReadLimit($val); //load limit data
        $total_result = checkReadAll($val); //load all data

        //validation
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

// THis is to prevent white page
http_response_code(200);
checkAccess();
