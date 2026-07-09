package com.leadflow.service;

import com.leadflow.entity.FollowUp;
import com.leadflow.repository.FollowUpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowUpService {

    @Autowired
    private FollowUpRepository repository;

    public List<FollowUp> getAllFollowUps() {
        return repository.findAll();
    }

    public FollowUp getFollowUpById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public FollowUp saveFollowUp(FollowUp followUp) {
        return repository.save(followUp);
    }

    public FollowUp updateFollowUp(Integer id, FollowUp followUp) {

        FollowUp existing = repository.findById(id).orElse(null);

        if (existing != null) {

            existing.setCustomerLead(followUp.getCustomerLead());
            existing.setDiscussion(followUp.getDiscussion());
            existing.setFollowupDate(followUp.getFollowupDate());
            existing.setFollowupTime(followUp.getFollowupTime());
            existing.setStatus(followUp.getStatus());

            return repository.save(existing);
        }

        return null;
    }

    public void deleteFollowUp(Integer id) {
        repository.deleteById(id);
    }

    public List<FollowUp> getByCustomer(Integer customerId) {
        return repository.findByCustomerLeadCustomerId(customerId);
    }

    public List<FollowUp> getByStatus(String status) {
        return repository.findByStatus(status);
    }
}