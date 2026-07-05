package com.student.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.student.dto.LoginDTO;
import com.student.entity.Login;
import com.student.service.LoginService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

	@Autowired
	private LoginService loginService;

	@PostMapping("/login")
	public String login(@RequestBody LoginDTO loginDTO) {

		Login login = loginService.validateLogin(loginDTO.getUsername(), loginDTO.getPassword());

		if (login != null) {
			return "Login Successful";
		} else {
			return "Invalid Username or Password";
		}
	}

}