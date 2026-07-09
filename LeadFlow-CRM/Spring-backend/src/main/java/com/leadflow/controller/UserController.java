package com.leadflow.controller;

import com.leadflow.entity.User;
import com.leadflow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> body) {

        String username = body.get("username");
        String password = body.get("password");

        User user = userService.login(username, password);

        if (user == null) {
            throw new RuntimeException("Invalid Username or Password");
        }

        return user;
    }

}