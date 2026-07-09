package com.leadflow.dto;

public class DashboardDTO {

    private long totalLeads;
    private long newLeads;
    private long interestedLeads;
    private long followUpLeads;
    private long closedWon;
    private long closedLost;
    private long todayFollowUps;
    private long totalLeadTypes;
    private long totalUsers;

    public DashboardDTO() {
    }

    public long getTotalLeads() {
        return totalLeads;
    }

    public void setTotalLeads(long totalLeads) {
        this.totalLeads = totalLeads;
    }

    public long getNewLeads() {
        return newLeads;
    }

    public void setNewLeads(long newLeads) {
        this.newLeads = newLeads;
    }

    public long getInterestedLeads() {
        return interestedLeads;
    }

    public void setInterestedLeads(long interestedLeads) {
        this.interestedLeads = interestedLeads;
    }

    public long getFollowUpLeads() {
        return followUpLeads;
    }

    public void setFollowUpLeads(long followUpLeads) {
        this.followUpLeads = followUpLeads;
    }

    public long getClosedWon() {
        return closedWon;
    }

    public void setClosedWon(long closedWon) {
        this.closedWon = closedWon;
    }

    public long getClosedLost() {
        return closedLost;
    }

    public void setClosedLost(long closedLost) {
        this.closedLost = closedLost;
    }

    public long getTodayFollowUps() {
        return todayFollowUps;
    }

    public void setTodayFollowUps(long todayFollowUps) {
        this.todayFollowUps = todayFollowUps;
    }

    public long getTotalLeadTypes() {
        return totalLeadTypes;
    }

    public void setTotalLeadTypes(long totalLeadTypes) {
        this.totalLeadTypes = totalLeadTypes;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
}