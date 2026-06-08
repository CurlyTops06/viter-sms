<?php

class Classes
{
    public $classes_aid;
    public $classes_is_active;
    public $classes_grade;
    public $classes_section;
    public $classes_adviser;
    public $classes_year_id;
    public $classes_created;
    public $classes_updated;

    public $connection;
    public $lastInsertedId;

    public $is_active = '';
    public $search = '';
    public $start;
    public $total;

    public $tblClasses;
    public $tblSchoolYear;
    public $tblTeachers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblClasses = "sms_classes";
        $this->tblSchoolYear = "sms_school_year";
        $this->tblTeachers = "sms_teachers";
    }

    public function create()
    {
        try {
            $sql = "insert into ";
            $sql .= "{$this->tblClasses}";
            $sql .= "(classes_is_active, ";
            $sql .= "classes_grade, ";
            $sql .= "classes_section, ";
            $sql .= "classes_adviser, ";
            $sql .= "classes_year_id, ";
            $sql .= "classes_created, ";
            $sql .= "classes_updated ) values ( ";
            $sql .= ":classes_is_active, ";
            $sql .= ":classes_grade, ";
            $sql .= ":classes_section, ";
            $sql .= ":classes_adviser, ";
            $sql .= ":classes_year_id, ";
            $sql .= ":classes_created, ";
            $sql .= ":classes_updated) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'classes_is_active' => $this->classes_is_active,
                'classes_grade' => $this->classes_grade,
                'classes_section' => $this->classes_section,
                'classes_adviser' => $this->classes_adviser,
                'classes_year_id' => $this->classes_year_id,
                'classes_created' => $this->classes_created,
                'classes_updated' => $this->classes_updated,
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
            // $sql .= "* ";
            $sql .= "classes.*, ";
            // $sql .= "schoolYear.* ";
            $sql .= "schoolYear.school_year_start, ";
            $sql .= "schoolYear.school_year_end, ";
            $sql .= "teachers.teachers_first_name, ";
            $sql .= "teachers.teachers_last_name ";
            $sql .= "from {$this->tblClasses} as classes, ";
            $sql .= "{$this->tblSchoolYear} as schoolYear, ";
            $sql .= "{$this->tblTeachers} as teachers ";
            $sql .= "where ";
            $sql .= "classes.classes_year_id = schoolYear.school_year_aid ";
            $sql .= "and teachers.teachers_aid = classes.classes_adviser ";
            $sql .= "order by ";
            // $sql .= "students_first_name, ";
            // $sql .= "students_last_name ";
            $sql .= "classes_aid ";
            $query = $this->connection->query($sql);
        } catch (PDOException $e) {
            $query = false;
            returnHandleError($e);
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
            $sql .= "classes_year_id =:classes_year_id, ";
            $sql .= "classes_updated =:classes_updated ";
            $sql .= "where classes_aid = :classes_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'classes_grade' => $this->classes_grade,
                'classes_section' => $this->classes_section,
                'classes_adviser' => $this->classes_adviser,
                'classes_year_id' => $this->classes_year_id,
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
    public function active()
    {
        try {
            $sql = "update {$this->tblClasses} set ";
            $sql .= "classes_is_active =:classes_is_active, ";
            $sql .= "classes_updated =:classes_updated ";
            $sql .= "where classes_aid = :classes_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'classes_is_active' => $this->classes_is_active,
                'classes_updated' => $this->classes_updated,
                'classes_aid' => $this->classes_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}
