package com.leadflow.service;

import com.leadflow.entity.CustomerLead;
import com.leadflow.repository.CustomerLeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerLeadService {

    @Autowired
    private CustomerLeadRepository repository;

    public List<CustomerLead> getAllLeads() {
        return repository.findAll();
    }

    public CustomerLead getLeadById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public CustomerLead saveLead(CustomerLead lead) {
        return repository.save(lead);
    }

    public CustomerLead updateLead(Integer id, CustomerLead lead) {

        CustomerLead existing = repository.findById(id).orElse(null);

        if (existing != null) {

            existing.setCustomerName(lead.getCustomerName());
            existing.setMobile(lead.getMobile());
            existing.setAlternateMobile(lead.getAlternateMobile());
            existing.setEmail(lead.getEmail());
            existing.setLeadType(lead.getLeadType());
            existing.setCity(lead.getCity());
            existing.setAddress(lead.getAddress());
            existing.setRequirement(lead.getRequirement());
            existing.setLeadSource(lead.getLeadSource());
            existing.setAssignedTo(lead.getAssignedTo());
            existing.setDiscussionDetails(lead.getDiscussionDetails());
            existing.setVisitDate(lead.getVisitDate());
            existing.setNextFollowupDate(lead.getNextFollowupDate());
            existing.setStatus(lead.getStatus());
            existing.setPriority(lead.getPriority());

            return repository.save(existing);
        }

        return null;
    }

    public void deleteLead(Integer id) {
        repository.deleteById(id);
    }

    public List<CustomerLead> searchByName(String name) {
        return repository.findByCustomerNameContainingIgnoreCase(name);
    }

    public List<CustomerLead> searchByMobile(String mobile) {
        return repository.findByMobile(mobile);
    }

    public List<CustomerLead> filterByStatus(String status) {
        return repository.findByStatus(status);
    }
}