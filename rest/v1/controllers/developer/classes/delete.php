<?php

$conn = null;
$conn = checkDbConnection();

$val = new Classes($conn);

if (array_key_exists('id', $_GET)) {
    $val->classes_aid = $_GET['id'];
    checkId($val->classes_aid);
    $query = checkDelete($val);
    returnSuccess($val, 'Classes', $query);
}
checkEndpoint();
