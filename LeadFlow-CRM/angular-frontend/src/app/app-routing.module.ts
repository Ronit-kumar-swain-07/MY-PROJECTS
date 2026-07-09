import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerLeadComponent } from './components/customer-lead/customer-lead.component';
import { LeadTypeComponent } from './components/lead-type/lead-type.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { NotesComponent } from './components/notes/notes.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'customers',
    component: CustomerLeadComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'lead-types',
    component: LeadTypeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'follow-ups',
    component: FollowUpComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 