<?php

// Declaration of Connection to Database
$conn = null; //Reset Connection to database
$conn = checkDbConnection(); //Set Connection to database
// Store Model class in variable
$val = new SchoolYear($conn);
// To check parameter in the URL
if (array_key_exists('id', $_GET)) {
    checkEndpoint();
}

$val->school_year_is_active = 1;
$val->school_year_start = $data['school_year_start'];
$val->school_year_end = $data['school_year_end'];
$val->school_year_created = date('Y-m-d H:i:s');
$val->school_year_updated = date('Y-m-d H:i:s');

$query = checkCreate($val);
returnSuccess($val, 'School Year', $query);
