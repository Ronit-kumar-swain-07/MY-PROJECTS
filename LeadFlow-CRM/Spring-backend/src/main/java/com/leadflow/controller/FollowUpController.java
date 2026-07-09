package com.leadflow.controller;

import com.leadflow.entity.FollowUp;
import com.leadflow.service.FollowUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/followup")
@CrossOrigin("*")
public class FollowUpController {

    @Autowired
    private FollowUpService service;

    @GetMapping
    public List<FollowUp> getAllFollowUps() {
        return service.getAllFollowUps();
    }

    @GetMapping("/{id}")
    public FollowUp getFollowUp(@PathVariable Integer id) {
        return service.getFollowUpById(id);
    }

    @PostMapping
    public FollowUp saveFollowUp(@RequestBody FollowUp followUp) {
        return service.saveFollowUp(followUp);
    }

    @PutMapping("/{id}")
    public FollowUp updateFollowUp(@PathVariable Integer id,
                                   @RequestBody FollowUp followUp) {
        return service.updateFollowUp(id, followUp);
    }

    @DeleteMapping("/{id}")
    public String deleteFollowUp(@PathVariable Integer id) {
        service.deleteFollowUp(id);
        return "Follow Up Deleted Successfully";
    }

    @GetMapping("/customer/{customerId}")
    public List<FollowUp> getByCustomer(@PathVariable Integer customerId) {
        return service.getByCustomer(customerId);
    }

    @GetMapping("/status/{status}")
    public List<FollowUp> getByStatus(@PathVariable String status) {
        return service.getByStatus(status);
    }
}