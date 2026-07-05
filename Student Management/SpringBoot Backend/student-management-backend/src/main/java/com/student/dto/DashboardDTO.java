package com.student.dto;

public class DashboardDTO {

	private long totalStudents;
	private long totalCourses;
	private long totalMaleStudents;
	private long totalFemaleStudents;

	public DashboardDTO() {
	}

	public DashboardDTO(long totalStudents, long totalCourses, long totalMaleStudents, long totalFemaleStudents) {
		this.totalStudents = totalStudents;
		this.totalCourses = totalCourses;
		this.totalMaleStudents = totalMaleStudents;
		this.totalFemaleStudents = totalFemaleStudents;
	}

	public long getTotalStudents() {
		return totalStudents;
	}

	public void setTotalStudents(long totalStudents) {
		this.totalStudents = totalStudents;
	}

	public long getTotalCourses() {
		return totalCourses;
	}

	public void setTotalCourses(long totalCourses) {
		this.totalCourses = totalCourses;
	}

	public long getTotalMaleStudents() {
		return totalMaleStudents;
	}

	public void setTotalMaleStudents(long totalMaleStudents) {
		this.totalMaleStudents = totalMaleStudents;
	}

	public long getTotalFemaleStudents() {
		return totalFemaleStudents;
	}

	public void setTotalFemaleStudents(long totalFemaleStudents) {
		this.totalFemaleStudents = totalFemaleStudents;
	}
}