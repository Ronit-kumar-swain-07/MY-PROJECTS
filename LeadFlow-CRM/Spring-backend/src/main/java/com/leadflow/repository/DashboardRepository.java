package com.leadflow.repository;

import com.leadflow.entity.CustomerLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface DashboardRepository extends JpaRepository<CustomerLead, Integer> {

    // Total Leads
    @Query("SELECT COUNT(c) FROM CustomerLead c")
    Long totalLeads();

    // New Leads
    @Query("SELECT COUNT(c) FROM CustomerLead c WHERE c.status='NEW'")
    Long newLeads();

    // Interested Leads
    @Query("SELECT COUNT(c) FROM CustomerLead c WHERE c.status='INTERESTED'")
    Long interestedLeads();

    // Follow Up Leads
    @Query("SELECT COUNT(c) FROM CustomerLead c WHERE c.status='FOLLOW_UP'")
    Long followUpLeads();

    // Closed Won
    @Query("SELECT COUNT(c) FROM CustomerLead c WHERE c.status='CLOSED_WON'")
    Long closedWon();

    // Closed Lost
    @Query("SELECT COUNT(c) FROM CustomerLead c WHERE c.status='CLOSED_LOST'")
    Long closedLost();

    // Today's Follow Ups
    @Query("SELECT COUNT(c) FROM CustomerLead c WHERE c.nextFollowupDate = :date")
    long todayFollowUps(@Param("date") LocalDate date);
}