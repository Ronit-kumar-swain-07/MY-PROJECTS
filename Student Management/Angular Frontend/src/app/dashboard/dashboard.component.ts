import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dashboard } from '../models/dashboard';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard = {
  totalStudents: 0,
  totalCourses: 0,
  totalMaleStudents: 0,
  totalFemaleStudents: 0
};

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboard = data;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}