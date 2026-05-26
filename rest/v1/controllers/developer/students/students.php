<?php

// Require header to accept json data
require_once "../../../core/header.php";
// Require needed functions
require_once "../../../core/functions.php";
// Require the model classes
require_once "../../../models/developer/students/Students.php";
// Get Payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// HTTP Authorization is the first layer of the security of our web app
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    // Post == CREATE A RECORD
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }
    // Get == RETRIEVE A RECORD
    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        $result = require 'read.php';
        sendResponse($result);
        exit;
    }
    // PUT == UPDATE A RECORD
    if ($_SERVER['REQUEST_METHOD'] == "PUT") {
        $result = require 'update.php';
        sendResponse($result);
        exit;
    }
}

// THis is to prevent white page
http_response_code(200);
checkAccess();
