<?php

// This setup accepts data type not file or image
header("Content-Type : application/json;");
// This setup accept any link who wants to use our API
header("Access-Control-Allow-Origin: *"); //For Localhost
// header("Access-Control-Allow-Origin: https://www.facebook.com"); //production
// This setup is for security purposes
// header("Access-Control-Allow-Credentials: true");
// This setup is what does method accepts in our application
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
// This setup is for date of the server
date_default_timezone_set('Asia/Manila');
