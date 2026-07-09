package com.leadflow.service;

import com.leadflow.entity.LeadType;
import com.leadflow.repository.LeadTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadTypeService {

    @Autowired
    private LeadTypeRepository repository;

    public List<LeadType> getAllLeadTypes() {
        return repository.findAll();
    }

    public LeadType getLeadTypeById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public LeadType saveLeadType(LeadType leadType) {
        return repository.save(leadType);
    }

    public LeadType updateLeadType(Integer id, LeadType leadType) {

        LeadType existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setLeadTypeName(leadType.getLeadTypeName());
            existing.setDescription(leadType.getDescription());
            existing.setActive(leadType.getActive());

            return repository.save(existing);
        }

        return null;
    }

    public void deleteLeadType(Integer id) {
        repository.deleteById(id);
    }
}