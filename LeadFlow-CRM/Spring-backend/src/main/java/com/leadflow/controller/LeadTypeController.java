package com.leadflow.controller;

import com.leadflow.entity.LeadType;
import com.leadflow.service.LeadTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lead-types")
@CrossOrigin("*")
public class LeadTypeController {

    @Autowired
    private LeadTypeService service;

    @GetMapping
    public List<LeadType> getAllLeadTypes() {
        return service.getAllLeadTypes();
    }

    @GetMapping("/{id}")
    public LeadType getLeadTypeById(@PathVariable Integer id) {
        return service.getLeadTypeById(id);
    }

    @PostMapping
    public LeadType saveLeadType(@RequestBody LeadType leadType) {
        return service.saveLeadType(leadType);
    }

    @PutMapping("/{id}")
    public LeadType updateLeadType(@PathVariable Integer id,
                                   @RequestBody LeadType leadType) {
        return service.updateLeadType(id, leadType);
    }

    @DeleteMapping("/{id}")
    public String deleteLeadType(@PathVariable Integer id) {
        service.deleteLeadType(id);
        return "Lead Type Deleted Successfully";
    }
}