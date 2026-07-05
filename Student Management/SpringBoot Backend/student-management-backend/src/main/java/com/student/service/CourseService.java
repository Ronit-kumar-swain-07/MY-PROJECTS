package com.student.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.entity.Course;
import com.student.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Add Course
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get All Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get Course By Id
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    // Update Course
    public Course updateCourse(Long id, Course updatedCourse) {

        Course course = courseRepository.findById(id).orElse(null);

        if (course != null) {

            course.setCourseName(updatedCourse.getCourseName());
            course.setDescription(updatedCourse.getDescription());
            course.setDuration(updatedCourse.getDuration());
            course.setFee(updatedCourse.getFee());

            return courseRepository.save(course);
        }

        return null;
    }

    // Delete Course
    public String deleteCourse(Long id) {

        courseRepository.deleteById(id);

        return "Course Deleted Successfully";

    }

    // Search Course
    public List<Course> searchCourse(String courseName) {

        return courseRepository.findByCourseNameContainingIgnoreCase(courseName);

    }

}