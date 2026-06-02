<?php

$conn = null;
$conn = checkDbConnection();

$val = new SchoolYear($conn);

if (array_key_exists('id', $_GET)) {
    $val->school_year_aid = $_GET['id'];
    checkId($val->school_year_aid);
    $query = checkDelete($val);
    returnSuccess($val, 'School Year', $query);
}
checkEndpoint();
