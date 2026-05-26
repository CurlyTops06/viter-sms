<?php

// Declaration of Connection to Database
$conn = null; //Reset Connection to database
$conn = checkDbConnection(); //Set Connection to database
// Store Model class in variable
$val = new Students($conn);

$val->students_aid = $_GET['id'];
$val->students_id = $data['students_id'];
$val->students_first_name = $data['students_first_name'];
$val->students_middle_name = $data['students_middle_name'];
$val->students_last_name = $data['students_last_name'];
$val->students_grade = $data['students_grade'];
$val->students_section = $data['students_section'];
$val->students_updated = date('Y-m-d H:i:s');

// Validation
checkId($val->students_aid);

$query = checkUpdate($val);
returnSuccess($val, 'Students', $query);
