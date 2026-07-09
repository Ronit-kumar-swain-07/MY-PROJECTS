package com.leadflow.controller;

import com.leadflow.entity.CustomerLead;
import com.leadflow.service.CustomerLeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer-leads")
@CrossOrigin("*")
public class CustomerLeadController {

    @Autowired
    private CustomerLeadService service;

    @GetMapping
    public List<CustomerLead> getAllLeads() {
        return service.getAllLeads();
    }

    @GetMapping("/{id}")
    public CustomerLead getLeadById(@PathVariable Integer id) {
        return service.getLeadById(id);
    }

    @PostMapping
    public CustomerLead saveLead(@RequestBody CustomerLead lead) {
        return service.saveLead(lead);
    }

    @PutMapping("/{id}")
    public CustomerLead updateLead(@PathVariable Integer id,
                                   @RequestBody CustomerLead lead) {
        return service.updateLead(id, lead);
    }

    @DeleteMapping("/{id}")
    public String deleteLead(@PathVariable Integer id) {
        service.deleteLead(id);
        return "Customer Lead Deleted Successfully";
    }

    @GetMapping("/search/name/{name}")
    public List<CustomerLead> searchByName(@PathVariable String name) {
        return service.searchByName(name);
    }

    @GetMapping("/search/mobile/{mobile}")
    public List<CustomerLead> searchByMobile(@PathVariable String mobile) {
        return service.searchByMobile(mobile);
    }

    @GetMapping("/status/{status}")
    public List<CustomerLead> filterByStatus(@PathVariable String status) {
        return service.filterByStatus(status);
    }
}