<?php

// Require header to accept json data
require_once "../../core/header.php";
// Require needed functions
require_once "../../core/functions.php";
// Require the model classes
require_once "../../models/Students.php";
// Get Payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// Post == CREATE A RECORD
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $result = require 'create.php';
    sendResponse($result);
    exit;
}
