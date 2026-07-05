package com.student.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.entity.Login;
import com.student.repository.LoginRepository;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Login validateLogin(String username, String password) {

        return loginRepository.findByUsernameAndPassword(username, password);

    }

}