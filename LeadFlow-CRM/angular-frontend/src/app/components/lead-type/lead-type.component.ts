import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LeadTypeService } from '../../services/lead-type.service';

@Component({
  selector: 'app-lead-type',
  templateUrl: './lead-type.component.html',
  styleUrls: ['./lead-type.component.css']
})
export class LeadTypeComponent implements OnInit {

  leadTypes: any[] = [];
  allLeadTypes: any[] = [];

  searchText: string = '';

  showModal: boolean = false;
  isEdit: boolean = false;

  leadType: any = this.resetLeadType();

  constructor(
    private service: LeadTypeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadLeadTypes();
  }

  resetLeadType() {
    return {
      leadTypeId: null,
      leadTypeName: '',
      description: ''
    };
  }

  loadLeadTypes(): void {
    this.service.getAll().subscribe({
      next: (data: any[]) => {
        this.leadTypes = data;
        this.allLeadTypes = [...data];
      },
      error: () => {
        this.toastr.error('Unable to load Lead Types');
      }
    });
  }

  openAddModal(): void {
    this.isEdit = false;
    this.leadType = this.resetLeadType();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveLeadType(): void {

    if (this.isEdit) {

      this.service.update(this.leadType.leadTypeId, this.leadType)
        .subscribe({
          next: () => {
            this.toastr.success('Lead Type Updated Successfully');
            this.closeModal();
            this.loadLeadTypes();
          },
          error: () => {
            this.toastr.error('Failed to Update Lead Type');
          }
        });

    } else {

      this.service.save(this.leadType)
        .subscribe({
          next: () => {
            this.toastr.success('Lead Type Added Successfully');
            this.closeModal();
            this.loadLeadTypes();
          },
          error: () => {
            this.toastr.error('Failed to Save Lead Type');
          }
        });

    }

  }

  editLeadType(item: any): void {
    this.isEdit = true;
    this.leadType = { ...item };
    this.showModal = true;
  }

  deleteLeadType(id: number): void {

    if (!confirm('Are you sure you want to delete this Lead Type?')) {
      return;
    }

    this.service.delete(id)
      .subscribe({
        next: () => {
          this.toastr.success('Lead Type Deleted Successfully');
          this.loadLeadTypes();
        },
        error: () => {
          this.toastr.error('Delete Failed');
        }
      });

  }

  search(): void {

    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      this.leadTypes = [...this.allLeadTypes];
      return;
    }

    this.leadTypes = this.allLeadTypes.filter(
      item =>
        item.leadTypeName?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword)
    );

  }

}