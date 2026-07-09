import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CustomerLeadService } from '../../services/customer-lead.service';
import { FollowUpService } from '../../services/follow-up.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  today: Date = new Date();

  dashboard = {
    totalLeads: 0,
    newLeads: 0,
    interestedLeads: 0,
    closedWon: 0,
    closedLost: 0
  };

  recentLeads: any[] = [];
  followUps: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private customerLeadService: CustomerLeadService,
    private followUpService: FollowUpService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadRecentLeads();
    this.loadFollowUps();
  }

  loadDashboard(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (res: any) => {
        this.dashboard = res;
      },
      error: (err) => console.error(err)
    });
  }

  loadRecentLeads(): void {
    this.customerLeadService.getAllLeads().subscribe({
      next: (res: any[]) => {
        this.recentLeads = res.slice(0, 5);
      },
      error: (err) => console.error(err)
    });
  }

  loadFollowUps(): void {
    this.followUpService.getAllFollowUps().subscribe({
      next: (res: any[]) => {
        this.followUps = res.slice(0, 5);
      },
      error: (err) => console.error(err)
    });
  }

}