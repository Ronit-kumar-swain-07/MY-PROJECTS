package com.leadflow.repository;

import com.leadflow.entity.CustomerLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface CustomerLeadRepository extends JpaRepository<CustomerLead, Integer> {

    List<CustomerLead> findByCustomerNameContainingIgnoreCase(String customerName);

    List<CustomerLead> findByMobile(String mobile);

    List<CustomerLead> findByStatus(String status);

    // ================= Dashboard =================

    long countByStatus(String status);

    long countByPriority(String priority);

    @Query("SELECT COUNT(c) FROM CustomerLead c")
    long totalLeads();

    @Query("SELECT COUNT(c) FROM CustomerLead c WHERE c.nextFollowupDate = :date")
    long todayFollowUps(LocalDate date);
}