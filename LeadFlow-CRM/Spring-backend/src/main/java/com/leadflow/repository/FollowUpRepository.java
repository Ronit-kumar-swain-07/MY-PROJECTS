package com.leadflow.repository;

import com.leadflow.entity.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowUpRepository extends JpaRepository<FollowUp, Integer> {

    List<FollowUp> findByCustomerLeadCustomerId(Integer customerId);

    List<FollowUp> findByStatus(String status);

}