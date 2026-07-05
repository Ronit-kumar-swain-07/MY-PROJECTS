package com.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.student.entity.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {

    Login findByUsernameAndPassword(String username, String password);

}