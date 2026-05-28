<?php

$conn = null;
$conn = checkDbConnection();

$val = new Teachers($conn);

if (array_key_exists('id', $_GET)) {
    $val->teachers_aid = $_GET['id'];
    checkId($val->teachers_aid);
    $query = checkDelete($val);
    returnSuccess($val, 'Teachers', $query);
}
checkEndpoint();
