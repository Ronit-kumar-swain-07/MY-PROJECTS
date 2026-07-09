package com.leadflow.service;

import com.leadflow.entity.Note;
import com.leadflow.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository repository;

    public List<Note> getAllNotes() {
        return repository.findAll();
    }

    public Note save(Note note) {
        return repository.save(note);
    }

    public Note getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public List<Note> getCustomerNotes(Integer customerId) {
        return repository.findByCustomerLeadCustomerId(customerId);
    }
}