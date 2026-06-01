<?php

class Classes
{
    public $classes_aid;
    public $classes_grade;
    public $classes_section;
    public $classes_adviser;
    public $classes_number_students;
    public $classes_created;
    public $classes_updated;

    public $connection;
    public $lastInsertedId;

    public $tblClasses;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblClasses = "sms_classes";
    }

    public function create()
    {
        try {
            $sql = "insert into ";
            $sql .= "{$this->tblClasses}";
            $sql .= "(classes_grade, ";
            $sql .= "classes_section, ";
            $sql .= "classes_adviser, ";
            $sql .= "classes_number_students, ";
            $sql .= "classes_created, ";
            $sql .= "classes_updated ) values ( ";
            $sql .= ":classes_grade, ";
            $sql .= ":classes_section, ";
            $sql .= ":classes_adviser, ";
            $sql .= ":classes_number_students, ";
            $sql .= ":classes_created, ";
            $sql .= ":classes_updated) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'classes_grade' => $this->classes_grade,
                'classes_section' => $this->classes_section,
                'classes_adviser' => $this->classes_adviser,
                'classes_number_students' => $this->classes_number_students,
                'classes_created' => $this->classes_created,
                'classes_updated' => $this->classes_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertedId();
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
            $sql .= "from {$this->tblClasses} ";
            $sql .= "order by ";
            // $sql .= "students_first_name, ";
            // $sql .= "students_last_name ";
            $sql .= "classes_aid ";
            $query = $this->connection->query($sql);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblClasses} set ";
            $sql .= "classes_grade =:classes_grade, ";
            $sql .= "classes_section =:classes_section, ";
            $sql .= "classes_adviser =:classes_adviser, ";
            $sql .= "classes_number_students =:classes_number_students, ";
            $sql .= "classes_updated =:classes_updated ";
            $sql .= "where classes_aid = :classes_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'classes_grade' => $this->classes_grade,
                'classes_section' => $this->classes_section,
                'classes_adviser' => $this->classes_adviser,
                'classes_number_students' => $this->classes_number_students,
                'classes_updated' => $this->classes_updated,
                'classes_aid' => $this->classes_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblClasses} ";
            $sql .= "where classes_aid = :classes_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'classes_aid' => $this->classes_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}
