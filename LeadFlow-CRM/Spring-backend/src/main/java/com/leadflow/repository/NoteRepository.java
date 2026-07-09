package com.leadflow.repository;

import com.leadflow.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note,Integer> {

    List<Note> findByCustomerLeadCustomerId(Integer customerId);

}