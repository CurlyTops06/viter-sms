<?php

require_once "../../../core/header.php";
require_once "../../../core/functions.php";
require_once "../../../models/developer/teachers/Teachers.php";

$body = file_get_contents("php://input");
$data = json_decode($body, true);

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
    // DELETE == DELETE A RECORD
    if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
        $result = require 'delete.php';
        sendResponse($result);
        exit;
    }
}

// THis is to prevent white page
http_response_code(200);
checkAccess();
