<?php

$conn = null;
$conn = checkDbConnection();
$val = new Teachers($conn);

$val->teachers_aid = $_GET['id'];
$val->teachers_honorific = $data['teachers_honorific'];
$val->teachers_first_name = $data['teachers_first_name'];
$val->teachers_middle_name = $data['teachers_middle_name'];
$val->teachers_last_name = $data['teachers_last_name'];
$val->teachers_subject = $data['teachers_subject'];
$val->teachers_email = $data['teachers_email'];
$val->teachers_updated = date('Y-m-d H:i:s');

checkId($val->teachers_aid);

$query = checkUpdate($val);
returnSuccess($val, 'Teachers', $query);
