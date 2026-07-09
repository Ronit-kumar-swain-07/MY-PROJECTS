package com.leadflow.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lead_type")
public class LeadType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lead_type_id")
    private Integer leadTypeId;

    @Column(name = "lead_type_name", nullable = false, unique = true)
    private String leadTypeName;

    private String description;

    private Boolean active;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public LeadType() {
    }

    public Integer getLeadTypeId() {
        return leadTypeId;
    }

    public void setLeadTypeId(Integer leadTypeId) {
        this.leadTypeId = leadTypeId;
    }

    public String getLeadTypeName() {
        return leadTypeName;
    }

    public void setLeadTypeName(String leadTypeName) {
        this.leadTypeName = leadTypeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}