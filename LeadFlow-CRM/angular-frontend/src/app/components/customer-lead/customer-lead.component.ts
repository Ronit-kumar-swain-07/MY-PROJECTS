import { Component, OnInit } from '@angular/core';
import { CustomerLeadService } from '../../services/customer-lead.service';
import { LeadTypeService } from '../../services/lead-type.service';
import { ToastrService } from 'ngx-toastr';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

declare var bootstrap: any;

@Component({
  selector: 'app-customer-lead',
  templateUrl: './customer-lead.component.html',
  styleUrls: ['./customer-lead.component.css']
})
export class CustomerLeadComponent implements OnInit {

  leads: any[] = [];

  leadTypes: any[] = [];

  searchKeyword: string = '';

  isEdit: boolean = false;

  modal: any;

  lead: any = {

    customerId: null,

    customerName: '',

    mobile: '',

    alternateMobile: '',

    email: '',

    address: '',

    city: '',

    leadSource: '',

    assignedTo: '',

    requirement: '',

    discussionDetails: '',

    visitDate: '',

    nextFollowUpDate: '',

    priority: 'MEDIUM',

    status: 'NEW',

    leadType: {

      leadTypeId: null

    }

  };

  constructor(

    private customerLeadService: CustomerLeadService,

    private leadTypeService: LeadTypeService,

    private toastr: ToastrService

  ) { }

  ngOnInit(): void {

    this.getAllLeads();

    this.getLeadTypes();

    this.modal = new bootstrap.Modal(
      document.getElementById('leadModal')
    );

  }

  // ===========================
  // Load Leads
  // ===========================

  getAllLeads() {

    this.customerLeadService.getAllLeads()

      .subscribe({

        next: (data: any) => {

          this.leads = data;

        },

        error: () => {

          this.toastr.error("Unable to load customer leads");

        }

      });

  }

  // ===========================
  // Load Lead Types
  // ===========================

  getLeadTypes() {

    this.leadTypeService.getAllLeadTypes()

      .subscribe({

        next: (data: any) => {

          this.leadTypes = data;

        }

      });

  }

  // ===========================
  // Add Button
  // ===========================

  openAddModal() {

    this.isEdit = false;

    this.resetForm();

    this.modal.show();

  }

  // ===========================
  // Save / Update
  // ===========================

  saveLead() {

    if (this.isEdit) {

      this.customerLeadService.updateLead(

        this.lead.customerId,

        this.lead

      ).subscribe({

        next: () => {

          this.toastr.success("Lead Updated Successfully");

          this.modal.hide();

          this.getAllLeads();

        },

        error: () => {

          this.toastr.error("Update Failed");

        }

      });

    }

    else {

      this.customerLeadService.saveLead(this.lead)

        .subscribe({

          next: () => {

            this.toastr.success("Lead Added Successfully");

            this.modal.hide();

            this.getAllLeads();

          },

          error: () => {

            this.toastr.error("Save Failed");

          }

        });

    }

  }

  // ===========================
  // Edit
  // ===========================

  editLead(lead: any) {

    this.isEdit = true;

    this.lead = JSON.parse(JSON.stringify(lead));

    this.modal.show();

  }

  // ===========================
  // Delete
  // ===========================

  deleteLead(id: number) {

    if (!confirm("Delete this customer lead?")) {

      return;

    }

    this.customerLeadService.deleteLead(id)

      .subscribe({

        next: () => {

          this.toastr.success("Lead Deleted");

          this.getAllLeads();

        },

        error: () => {

          this.toastr.error("Delete Failed");

        }

      });

  }

  // ===========================
  // Search
  // ===========================

  searchLead() {

    if (this.searchKeyword.trim() == '') {

      this.getAllLeads();

      return;

    }

    this.customerLeadService

      .searchByName(this.searchKeyword)

      .subscribe({

        next: (data: any) => {

          this.leads = data;

        }

      });

  }

  // ===========================
  // Reset Form
  // ===========================

  resetForm() {

    this.lead = {

      customerId: null,

      customerName: '',

      mobile: '',

      alternateMobile: '',

      email: '',

      address: '',

      city: '',

      leadSource: '',

      assignedTo: '',

      requirement: '',

      discussionDetails: '',

      visitDate: '',

      nextFollowUpDate: '',

      priority: 'MEDIUM',

      status: 'NEW',

      leadType: {

        leadTypeId: null

      }

    };

  }

  exportToExcel(): void {

  const exportData = this.leads.map(lead => ({

    Customer: lead.customerName,

    Mobile: lead.mobile,

    Email: lead.email,

    City: lead.city,

    LeadType: lead.leadType?.leadTypeName,

    Status: lead.status,

    Priority: lead.priority,

    AssignedTo: lead.assignedTo,

    NextFollowUp: lead.nextFollowUpDate

  }));

  const worksheet: XLSX.WorkSheet =
    XLSX.utils.json_to_sheet(exportData);

  const workbook: XLSX.WorkBook = {

    Sheets: {

      'Customer Leads': worksheet

    },

    SheetNames: ['Customer Leads']

  };

  const excelBuffer = XLSX.write(workbook, {

    bookType: 'xlsx',

    type: 'array'

  });

  const data = new Blob(

    [excelBuffer],

    {

      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

    }

  );

  FileSaver.saveAs(data, 'Customer_Leads.xlsx');

}

downloadPDF(): void {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('LeadFlow CRM - Customer Leads Report', 14, 15);

  autoTable(doc, {

    head: [[
      'ID',
      'Customer',
      'Mobile',
      'Email',
      'City',
      'Lead Type',
      'Status',
      'Priority',
      'Assigned'
    ]],

    body: this.leads.map(lead => [

      lead.customerId,

      lead.customerName,

      lead.mobile,

      lead.email,

      lead.city,

      lead.leadType?.leadTypeName,

      lead.status,

      lead.priority,

      lead.assignedTo

    ]),

    startY: 25,

    styles: {
      fontSize: 9
    },

    headStyles: {
      fillColor: [13, 110, 253]
    }

  });

  doc.save('Customer_Leads.pdf');

}

}