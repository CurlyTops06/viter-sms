<?php

$conn = null;
$conn = checkDbConnection();
$val = new SchoolYear($conn);

$val->school_year_aid = $_GET['id'];
$val->school_year_start = $data['school_year_start'];
$val->school_year_end = $data['school_year_end'];
$val->school_year_updated = date('Y-m-d H:i:s');

checkId($val->school_year_aid);

$query = checkUpdate($val);
returnSuccess($val, 'School Year', $query);
