import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'add-student',
    component: StudentFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'edit-student/:id',
    component: StudentFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'courses',
    component: CourseListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'add-course',
    component: CourseFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'edit-course/:id',
    component: CourseFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
