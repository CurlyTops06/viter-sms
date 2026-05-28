<?php

// Declaration of Connection to Database
$conn = null; //Reset Connection to database
$conn = checkDbConnection(); //Set Connection to database
// Store Model class in variable
$val = new Students($conn);
// To check parameter in the URL
if (array_key_exists('id', $_GET)) {
    $val->students_aid = $_GET['id'];
    checkId($val->students_aid);
    $query = checkDelete($val);
    returnSuccess($val, 'Students', $query);
}
checkEndpoint();
