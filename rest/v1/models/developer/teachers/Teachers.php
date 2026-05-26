<?php

class Teachers
{
    public $teachers_aid;
    public $teachers_is_active;
    public $teachers_first_name;
    public $teachers_middle_name;
    public $teachers_last_name;
    public $teachers_subject;
    public $teachers_email;
    public $teachers_created;
    public $teachers_updated;

    public $connection;
    public $lastInsertedId;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblTeachers = "sms_teachers";
    }
}
