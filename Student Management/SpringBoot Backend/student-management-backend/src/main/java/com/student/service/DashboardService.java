package com.student.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.dto.DashboardDTO;
import com.student.repository.StudentRepository;

@Service
public class DashboardService {

	@Autowired
	private StudentRepository studentRepository;

	public DashboardDTO getDashboardData() {

		long totalStudents = studentRepository.count();

		long totalCourses = studentRepository.countDistinctCourses();

		long totalMaleStudents = studentRepository.countByGender("Male");

		long totalFemaleStudents = studentRepository.countByGender("Female");

		return new DashboardDTO(totalStudents, totalCourses, totalMaleStudents, totalFemaleStudents);
	}
}