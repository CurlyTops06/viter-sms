<?php

class Teachers
{
    public $teachers_aid;
    public $teachers_is_active;
    public $teachers_honorific;
    public $teachers_first_name;
    public $teachers_middle_name;
    public $teachers_last_name;
    public $teachers_subject;
    public $teachers_email;
    public $teachers_created;
    public $teachers_updated;

    public $connection;
    public $lastInsertedId;

    public $is_active = '';
    public $search = '';
    public $start;
    public $total;

    public $tblTeachers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblTeachers = "sms_teachers";
    }

    public function create()
    {
        try {
            $sql = "insert into ";
            $sql .= "{$this->tblTeachers}";
            $sql .= "(teachers_is_active, ";
            $sql .= "teachers_honorific, ";
            $sql .= "teachers_first_name, ";
            $sql .= "teachers_last_name, ";
            $sql .= "teachers_middle_name, ";
            $sql .= "teachers_subject, ";
            $sql .= "teachers_email, ";
            $sql .= "teachers_created, ";
            $sql .= "teachers_updated ) values ( ";
            $sql .= ":teachers_is_active, ";
            $sql .= ":teachers_honorific, ";
            $sql .= ":teachers_first_name, ";
            $sql .= ":teachers_last_name, ";
            $sql .= ":teachers_middle_name, ";
            $sql .= ":teachers_subject, ";
            $sql .= ":teachers_email, ";
            $sql .= ":teachers_created, ";
            $sql .= ":teachers_updated) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'teachers_is_active' => $this->teachers_is_active,
                'teachers_honorific' => $this->teachers_honorific,
                'teachers_first_name' => $this->teachers_first_name,
                'teachers_last_name' => $this->teachers_last_name,
                'teachers_middle_name' => $this->teachers_middle_name,
                'teachers_subject' => $this->teachers_subject,
                'teachers_email' => $this->teachers_email,
                'teachers_created' => $this->teachers_created,
                'teachers_updated' => $this->teachers_updated,
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
            $sql .= "from {$this->tblTeachers} ";
            $sql .= "where true ";
            //For Filter
            $sql .= $this->is_active != '' ? "and teachers_is_active = :teachers_is_active " : "";
            // For Search
            $sql .= $this->search != ''  ? "and ( " : "";
            $sql .= $this->search != ''  ? "teachers_first_name LIKE :teachers_first_name " : "";
            $sql .= $this->search != ''  ? "or teachers_last_name LIKE :teachers_last_name " : "";
            $sql .= $this->search != ''  ? "or CONCAT(teachers_last_name,' ',teachers_first_name) LIKE :full_last_name " : "";
            $sql .= $this->search != ''  ? "or CONCAT(teachers_first_name,' ',teachers_last_name) LIKE :full_first_name " : "";
            $sql .= $this->search != ''  ? "or CONCAT(teachers_last_name,', ',teachers_first_name) LIKE :full_last_name_coma " : "";
            $sql .= $this->search != ''  ? " ) " : "";
            $sql .= "order by ";
            $sql .= "teachers_first_name, ";
            $sql .= "teachers_last_name, ";
            $sql .= "teachers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                //for filter
                ...$this->is_active != '' ? [
                    "teachers_is_active" => $this->is_active,
                ] : [],
                //for filter
                ...$this->search != ''  ? [
                    "teachers_first_name" => "%{$this->search}%",
                    "teachers_last_name" => "%{$this->search}%",
                    "full_last_name" => "%{$this->search}%",
                    "full_first_name" => "%{$this->search}%",
                    "full_last_name_coma" => "%{$this->search}%",
                ] : [],
            ]);
        } catch (PDOException $e) {
            $query = false;
            returnHandleError($e);
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblTeachers} ";
            $sql .= "where true ";
            //For Filter
            $sql .=  $this->is_active != '' ? "and teachers_is_active = :teachers_is_active " : "";
            // For Search
            $sql .=  $this->search != '' ? "and ( " : "";
            $sql .=  $this->search != '' ? "teachers_first_name LIKE :teachers_first_name " : "";
            $sql .=  $this->search != '' ? "or teachers_last_name LIKE :teachers_last_name " : "";
            $sql .=  $this->search != '' ? "or CONCAT(teachers_last_name,' ',teachers_first_name) LIKE :full_last_name " : "";
            $sql .=  $this->search != '' ? "or CONCAT(teachers_first_name,' ',teachers_last_name) LIKE :full_first_name " : "";
            $sql .=  $this->search != '' ? "or CONCAT(teachers_last_name,', ',teachers_first_name) LIKE :full_last_name_coma " : "";
            $sql .=  $this->search != '' ? " ) " : "";
            $sql .= "order by ";
            $sql .= "teachers_aid asc ";
            // For Load more like facebook
            $sql .= "limit :start, ";
            $sql .= ":total";
            $query = $this->connection->prepare($sql);
            $query->execute([
                //for filter
                ...$this->is_active != '' ? [
                    "teachers_is_active" => $this->is_active,
                ] : [],
                //for filter
                ...$this->search != '' ? [
                    "teachers_first_name" => "%{$this->search}%",
                    "teachers_last_name" => "%{$this->search}%",
                    "full_last_name" => "%{$this->search}%",
                    "full_first_name" => "%{$this->search}%",
                    "full_last_name_coma" => "%{$this->search}%",
                ] : [],
                //for load more like facebook
                "start" => $this->start - 1,
                "total" => $this->total,
            ]);
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
            $sql .= "from {$this->tblTeachers} ";
            $sql .= "where ";
            $sql .= "teachers_aid = :teachers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "teachers_aid" => $this->teachers_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblTeachers} set ";
            $sql .= "teachers_first_name =:teachers_first_name, ";
            $sql .= "teachers_honorific =:teachers_honorific, ";
            $sql .= "teachers_middle_name =:teachers_middle_name, ";
            $sql .= "teachers_last_name =:teachers_last_name, ";
            $sql .= "teachers_subject =:teachers_subject, ";
            $sql .= "teachers_email =:teachers_email, ";
            $sql .= "teachers_updated =:teachers_updated ";
            $sql .= "where teachers_aid = :teachers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'teachers_first_name' => $this->teachers_first_name,
                'teachers_honorific' => $this->teachers_honorific,
                'teachers_middle_name' => $this->teachers_middle_name,
                'teachers_last_name' => $this->teachers_last_name,
                'teachers_subject' => $this->teachers_subject,
                'teachers_email' => $this->teachers_email,
                'teachers_updated' => $this->teachers_updated,
                'teachers_aid' => $this->teachers_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblTeachers} set ";
            $sql .= "teachers_is_active =:teachers_is_active, ";
            $sql .= "teachers_updated =:teachers_updated ";
            $sql .= "where teachers_aid = :teachers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'teachers_is_active' => $this->teachers_is_active,
                'teachers_updated' => $this->teachers_updated,
                'teachers_aid' => $this->teachers_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblTeachers} ";
            $sql .= "where teachers_aid = :teachers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'teachers_aid' => $this->teachers_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}
