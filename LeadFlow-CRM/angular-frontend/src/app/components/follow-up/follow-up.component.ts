import { Component, OnInit } from '@angular/core';
import { FollowUpService } from '../../services/follow-up.service';
import { CustomerLeadService } from '../../services/customer-lead.service';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  followUps: any[] = [];
  customers: any[] = [];

  modal: any;
  isEdit = false;

  followUp: any = {
    followUpId: null,
    customerLead: {
      customerId: null
    },
    discussion: '',
    followupDate: '',
    followupTime: '',
    status: 'FOLLOW_UP'
  };

  statusList = [
    'NEW',
    'CONTACTED',
    'INTERESTED',
    'FOLLOW_UP',
    'VISIT_SCHEDULED',
    'NEGOTIATION',
    'CLOSED_WON',
    'CLOSED_LOST',
    'NOT_INTERESTED'
  ];

  constructor(
    private followUpService: FollowUpService,
    private customerService: CustomerLeadService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadFollowUps();
    this.loadCustomers();

    const modalElement = document.getElementById('followUpModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  loadFollowUps(): void {
    this.followUpService.getAllFollowUps().subscribe({
      next: (res: any[]) => {
        this.followUps = res;
      },
      error: () => {
        this.toastr.error('Unable to load Follow Ups');
      }
    });
  }

  loadCustomers(): void {
    this.customerService.getAllLeads().subscribe({
      next: (res: any[]) => {
        this.customers = res;
      },
      error: () => {
        this.toastr.error('Unable to load Customers');
      }
    });
  }

  openAddModal(): void {
    this.isEdit = false;
    this.resetForm();
    this.modal.show();
  }

  saveFollowUp(): void {

    if (this.isEdit) {

      this.followUpService.updateFollowUp(
        this.followUp.followUpId,
        this.followUp
      ).subscribe({
        next: () => {
          this.toastr.success('Follow Up Updated');
          this.modal.hide();
          this.loadFollowUps();
        },
        error: () => {
          this.toastr.error('Update Failed');
        }
      });

    } else {

      this.followUpService.saveFollowUp(this.followUp).subscribe({
        next: () => {
          this.toastr.success('Follow Up Added');
          this.modal.hide();
          this.loadFollowUps();
        },
        error: () => {
          this.toastr.error('Save Failed');
        }
      });

    }
  }

  editFollowUp(item: any): void {
    this.isEdit = true;
    this.followUp = JSON.parse(JSON.stringify(item));
    this.modal.show();
  }

  deleteFollowUp(id: number): void {

    if (!confirm('Delete this Follow Up?')) {
      return;
    }

    this.followUpService.deleteFollowUp(id).subscribe({
      next: () => {
        this.toastr.success('Deleted Successfully');
        this.loadFollowUps();
      },
      error: () => {
        this.toastr.error('Delete Failed');
      }
    });

  }

  resetForm(): void {
    this.followUp = {
      followUpId: null,
      customerLead: {
        customerId: null
      },
      discussion: '',
      followupDate: '',
      followupTime: '',
      status: 'FOLLOW_UP'
    };
  }

}