package com.student.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.student.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

    // Search Student
    List<Student> findByNameContainingIgnoreCase(String name);

    // Count Male Students
    long countByGender(String gender);

    // Count Distinct Courses
    @Query("SELECT COUNT(DISTINCT s.course) FROM Student s")
    long countDistinctCourses();

}