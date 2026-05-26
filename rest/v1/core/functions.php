<?php

require_once "Database.php";
require_once "Response.php";

// This Function is for using the database connection to other files
function checkDbConnection()
{
    try {
        $conn = Database::connectDb();
        return $conn;
    } catch (Throwable $e) {
        returnHandleError("Database connection failed.");
    }
}

function checkQuery($query, $msg)
{
    // IF ! is present it pertains to false
    if (!$query) returnHandleError($msg);
}

// object is the file in models directory
function checkCreate($object)
{
    $query = $object->create();
    checkQuery($query, "There's a problem processing your request. (create)");
    return $query;
}

// object is the file in models directory
function checkReadAll($object)
{
    $query = $object->readAll();
    checkQuery($query, "There's a problem processing your request. (readAll)");
    return $query;
}

// object is the file in models directory
function checkReadById($object)
{
    $query = $object->readById();
    checkQuery($query, "There's a problem processing your request. (readById)");
    return $query;
}

// object is the file in models directory
function checkUpdate($object)
{
    $query = $object->update();
    checkQuery($query, "There's a problem processing your request. (update)");
    return $query;
}

// object is the file in models directory
function checkDelete($object)
{
    $query = $object->delete();
    checkQuery($query, "There's a problem processing your request. (delete)");
    return $query;
}

// This function return success if updates in the database is successful
function returnSuccess($object, $name, $query, $data = null)
{
    $response = new Response();
    $returnData = [];
    $returnData['data'] = $data;
    $returnData['count'] = $query->rowCount();
    $returnData["{$name} ID"] = $object->lastInsertedId;
    $returnData['success'] = true;
    $returnData['server_date'] = date("Y-m-d");
    $response->setData($returnData);
    $response->send();
    exit();
}

// This function will retrieve all data
function getResultData($query)
{
    $data = $query->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

// This function is to retrieve the data from models
function getQueriedData($query)
{
    $response = new Response();
    $returnData = [];
    $returnData['data'] = getResultData($query);
    $returnData['count'] = $query->rowCount();
    $returnData['success'] = true;
    $returnData['server_data'] = date("Y-m-d");
    $response->setData($returnData);
    $response->send();
    exit();
}

// This function creates a reusable error response
function returnHandleError(
    $msg,
    $error_message = 'Something went wrong.',
    $error_description = '',
    $error_code = 'invalid_request_error'
) {
    $response = new Response();
    $error = [];
    $response->setSuccess(false);
    $error['count'] = 0;
    $error['success'] = false;
    $error['error'] = $msg;
    $error['error_message'] = $error_message;
    $error['error_description'] = $error_description;
    $error['error_code'] = $error_code;
    $response->setData($error);
    $response->send();
    exit();
}

function sendResponse($result)
{
    $response = new Response();
    $response->setSuccess(true);
    $response->setStatusCode(200);
    $response->setData($result);
    $response->send();

    // This is for stopping the execution of code in the script
    //exit;
    // If this is declared in the function, it will stop reading the code in the function instead it will send data
    // return
    // if none is declared undefined
}

function checkAccess()
{
    returnHandleError('Forbidden Access.', 'Invalid Request', '', '401');
}


function checkEndpoint()
{
    returnHandleError('Endpoint not Found.', 'Invalid Request', '', '404');
}


function checkId($id)
{
    if (!$id || !is_numeric($id))
        returnHandleError('Invalid ID.', 'Invalid Request', '', '402');
}
