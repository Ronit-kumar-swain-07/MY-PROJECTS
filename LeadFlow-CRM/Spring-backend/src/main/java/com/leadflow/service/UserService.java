package com.leadflow.service;

import com.leadflow.entity.User;
import com.leadflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User login(String username, String password) {

        return userRepository
                .findByUsernameAndPassword(username, password)
                .orElse(null);

    }

}