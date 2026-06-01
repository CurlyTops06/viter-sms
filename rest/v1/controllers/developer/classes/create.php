<?php

// Declaration of Connection to Database
$conn = null; //Reset Connection to database
$conn = checkDbConnection(); //Set Connection to database
// Store Model class in variable
$val = new Classes($conn);
// To check parameter in the URL
if (array_key_exists('id', $_GET)) {
    checkEndpoint();
}

$val->classes_grade = $data['classes_grade'];
$val->classes_section = $data['classes_section'];
$val->classes_adviser = $data['classes_adviser'];
$val->classes_number_students = $data['classes_number_students'];
$val->classes_created = date('Y-m-d H:i:s');
$val->classes_updated = date('Y-m-d H:i:s');

$query = checkCreate($val);
returnSuccess($val, 'Classes', $query);
