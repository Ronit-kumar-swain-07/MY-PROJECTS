package com.leadflow.controller;

import com.leadflow.entity.Note;
import com.leadflow.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/note")
@CrossOrigin(origins = "http://localhost:4200")
public class NoteController {

    @Autowired
    private NoteService service;

    @GetMapping
    public List<Note> getAll() {
        return service.getAllNotes();
    }

    @GetMapping("/{id}")
    public Note get(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public Note save(@RequestBody Note note) {
        return service.save(note);
    }

    // ==========================
    // UPDATE NOTE
    // ==========================
    @PutMapping("/{id}")
    public Note update(@PathVariable Integer id,
                       @RequestBody Note note) {

        note.setNoteId(id);

        return service.save(note);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        service.delete(id);
        return "Note Deleted Successfully";
    }

    @GetMapping("/customer/{customerId}")
    public List<Note> customerNotes(@PathVariable Integer customerId) {
        return service.getCustomerNotes(customerId);
    }

}