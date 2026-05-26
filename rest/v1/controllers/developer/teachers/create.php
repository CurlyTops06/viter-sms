<?php

// Declaration of Connection to Database
$conn = null; //Reset Connection to database
$conn = checkDbConnection(); //Set Connection to database
// Store Model class in variable
$val = new Students($conn);
// To check parameter in the URL
if (array_key_exists('id', $_GET)) {
    checkEndpoint();
}

$val->teachers_is_active = 1;
$val->teachers_first_name = $data['teachers_first_name'];
$val->teachers_middle_name = $data['teachers_middle_name'];
$val->teachers_last_name = $data['teachers_last_name'];
$val->teachers_subject = $data['teachers_subject'];
$val->teachers_email = $data['teachers_email'];
$val->teachers_created = date('Y-m-d H:i:s');
$val->teachers_updated = date('Y-m-d H:i:s');

$query = checkCreate($val);
returnSuccess($val, 'Teachers', $query);
