<?php

class Students
{
    public $students_aid;
    public $students_id;
    public $students_is_active;
    public $students_first_name;
    public $students_middle_name;
    public $students_last_name;
    public $students_grade;
    public $students_section;
    public $students_created;
    public $students_updated;

    public $connection;
    public $lastInsertedId;

    public $tblStudents;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblStudents = "sms_students";
    }

    public function create()
    {
        try {
            $sql = "insert into ";
            $sql .= "{$this->tblStudents}";
            $sql .= "(students_is_active, ";
            $sql .= "students_id, ";
            $sql .= "students_first_name, ";
            $sql .= "students_last_name, ";
            $sql .= "students_middle_name, ";
            $sql .= "students_grade, ";
            $sql .= "students_section, ";
            $sql .= "students_created, ";
            $sql .= "students_updated ) values ( ";
            $sql .= ":students_is_active, ";
            $sql .= ":students_id, ";
            $sql .= ":students_first_name, ";
            $sql .= ":students_last_name, ";
            $sql .= ":students_middle_name, ";
            $sql .= ":students_grade, ";
            $sql .= ":students_section, ";
            $sql .= ":students_created, ";
            $sql .= ":students_updated) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'students_is_active' => $this->students_is_active,
                'students_id' => $this->students_id,
                'students_first_name' => $this->students_first_name,
                'students_last_name' => $this->students_last_name,
                'students_middle_name' => $this->students_middle_name,
                'students_grade' => $this->students_grade,
                'students_section' => $this->students_section,
                'students_created' => $this->students_created,
                'students_updated' => $this->students_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            returnHandleError($e);
            $query = false;
        }
        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblStudents} ";
            $sql .= "order by ";
            $sql .= "students_first_name, ";
            $sql .= "students_last_name ";
            $query = $this->connection->query($sql);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
    public function readById()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblStudents} ";
            $sql .= "where ";
            $sql .= "students_aid = :students_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "students_aid" => $this->students_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblStudents} set ";
            $sql .= "students_id =:students_id, ";
            $sql .= "students_first_name =:students_first_name, ";
            $sql .= "students_middle_name =:students_middle_name, ";
            $sql .= "students_last_name =:students_last_name, ";
            $sql .= "students_grade =:students_grade, ";
            $sql .= "students_section =:students_section, ";
            $sql .= "students_updated =:students_updated ";
            $sql .= "where students_aid = :students_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'students_id' => $this->students_id,
                'students_first_name' => $this->students_first_name,
                'students_middle_name' => $this->students_middle_name,
                'students_last_name' => $this->students_last_name,
                'students_grade' => $this->students_grade,
                'students_section' => $this->students_section,
                'students_updated' => $this->students_updated,
                'students_aid' => $this->students_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}
