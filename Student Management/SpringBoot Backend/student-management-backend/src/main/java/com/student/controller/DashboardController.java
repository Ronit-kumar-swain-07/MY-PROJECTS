package com.student.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.dto.DashboardDTO;
import com.student.service.DashboardService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

	@Autowired
	private DashboardService dashboardService;

	@GetMapping("/dashboard")
	public DashboardDTO getDashboardData() {
		return dashboardService.getDashboardData();
	}

}