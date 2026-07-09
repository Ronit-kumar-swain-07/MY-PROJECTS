package com.leadflow.repository;

import com.leadflow.entity.LeadType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadTypeRepository extends JpaRepository<LeadType, Integer> {

}