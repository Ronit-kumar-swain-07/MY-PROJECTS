package com.student.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.student.entity.Course;
import com.student.service.CourseService;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Add Course
    @PostMapping
    public Course addCourse(@RequestBody Course course) {

        return courseService.addCourse(course);

    }

    // Get All Courses
    @GetMapping
    public List<Course> getAllCourses() {

        return courseService.getAllCourses();

    }

    // Get Course By Id
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {

        return courseService.getCourseById(id);

    }

    // Update Course
    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id,
                               @RequestBody Course course) {

        return courseService.updateCourse(id, course);

    }

    // Delete Course
    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable Long id) {

        return courseService.deleteCourse(id);

    }

    // Search Course
    @GetMapping("/search/{courseName}")
    public List<Course> searchCourse(@PathVariable String courseName) {

        return courseService.searchCourse(courseName);

    }

}