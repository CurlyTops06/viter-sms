<?php

class SchoolYear
{
    public $school_year_aid;
    public $school_year_is_active;
    public $school_year_start;
    public $school_year_end;
    public $school_year_created;
    public $school_year_updated;

    public $connection;
    public $lastInsertedId;

    public $tblSchoolYear;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSchoolYear = "sms_school_year";
    }

    public function create()
    {
        try {
            $sql = "insert into ";
            $sql .= "{$this->tblSchoolYear}";
            $sql .= "(school_year_is_active, ";
            $sql .= "school_year_start, ";
            $sql .= "school_year_end, ";
            $sql .= "school_year_created, ";
            $sql .= "school_year_updated ) values ( ";
            $sql .= ":school_year_is_active, ";
            $sql .= ":school_year_start, ";
            $sql .= ":school_year_end, ";
            $sql .= ":school_year_created, ";
            $sql .= ":school_year_updated) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'school_year_is_active' => $this->school_year_is_active,
                'school_year_start' => $this->school_year_start,
                'school_year_end' => $this->school_year_end,
                'school_year_created' => $this->school_year_created,
                'school_year_updated' => $this->school_year_updated,
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
            $sql .= "from {$this->tblSchoolYear} ";
            $sql .= "order by ";
            // $sql .= "students_first_name, ";
            // $sql .= "students_last_name ";
            $sql .= "school_year_start, ";
            $sql .= "school_year_end";
            $query = $this->connection->query($sql);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblSchoolYear} set ";
            $sql .= "school_year_start =:school_year_start, ";
            $sql .= "school_year_end =:school_year_end, ";
            $sql .= "school_year_updated =:school_year_updated ";
            $sql .= "where school_year_aid = :school_year_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'school_year_start' => $this->school_year_start,
                'school_year_end' => $this->school_year_end,
                'school_year_updated' => $this->school_year_updated,
                'school_year_aid' => $this->school_year_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSchoolYear} ";
            $sql .= "where school_year_aid = :school_year_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'school_year_aid' => $this->school_year_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}
