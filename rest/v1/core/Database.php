<?php

// TO access this function outside the class
// Database::connectDb();

class Database
{
    private $dbConnection;

    public static function connectDb()
    {
        // Local Configuration
        $host = "localhost";
        $dbName = "viter-sms-v1";
        $username = "root";
        $password = "";

        // Production Configuration
        // $host = "localhost";
        // $dbName = "viter-sms-v1";
        // $userName = "root";
        // $password = "";

        if (self::$dbConnection == null) {
            // Connection to Database
            // Parameter is the data that we want to send (Comma Separated)
            // First Parameter, Connection String to database host and database name
            // Second Parameter, Username
            // Third Parameter, Password
            self::$dbConnection = new PDO("mysql:host={$host};dbname={$dbName};", $username, $password);
            // For Error Handling Purposes
            // if an error occurs in database then will throw an exception error
            self::$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // For Security Purposes to prevent sql injection
            self::$dbConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        }

        return self::$dbConnection;
    }
}
