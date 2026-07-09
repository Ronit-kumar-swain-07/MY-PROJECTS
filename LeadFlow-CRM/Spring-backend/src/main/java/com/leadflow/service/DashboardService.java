package com.leadflow.service;

import com.leadflow.repository.DashboardRepository;
import com.leadflow.repository.LeadTypeRepository;
import com.leadflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {   

    @Autowired
    private DashboardRepository repository;

    @Autowired
    private LeadTypeRepository leadTypeRepository;

    @Autowired
    private UserRepository userRepository;

    public Map<String, Long> getDashboard() {

        Map<String, Long> dashboard = new HashMap<>();

        dashboard.put("totalLeads", repository.totalLeads());

        dashboard.put("newLeads", repository.newLeads());

        dashboard.put("interestedLeads", repository.interestedLeads());

        dashboard.put("followUpLeads", repository.followUpLeads());

        dashboard.put("closedWon", repository.closedWon());

        dashboard.put("closedLost", repository.closedLost());

        dashboard.put("todayFollowUps", repository.todayFollowUps(LocalDate.now()));

        dashboard.put("totalLeadTypes", leadTypeRepository.count());

        dashboard.put("totalUsers", userRepository.count());

        return dashboard;
    }
}