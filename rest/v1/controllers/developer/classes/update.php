<?php

$conn = null;
$conn = checkDbConnection();
$val = new Classes($conn);

$val->classes_aid = $_GET['id'];
$val->classes_grade = $data['classes_grade'];
$val->classes_section = $data['classes_section'];
$val->classes_year_id = $data['classes_year_id'];
$val->classes_created = date('Y-m-d H:i:s');
$val->classes_updated = date('Y-m-d H:i:s');

checkId($val->classes_aid);

$query = checkUpdate($val);
returnSuccess($val, 'Classes', $query);
