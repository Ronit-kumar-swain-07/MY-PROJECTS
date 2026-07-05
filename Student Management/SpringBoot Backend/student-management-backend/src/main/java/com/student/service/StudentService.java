package com.student.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.entity.Student;
import com.student.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Add Student
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student By ID
    public Student getStudentById(Integer id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Update Student
    public Student updateStudent(Student student) {
        return studentRepository.save(student);
    }

    // Delete Student
    public void deleteStudent(Integer id) {
        studentRepository.deleteById(id);
    }

    // Search Student
    public List<Student> searchStudent(String name) {
        return studentRepository.findByNameContainingIgnoreCase(name);
    }

}