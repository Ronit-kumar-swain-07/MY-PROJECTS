import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  searchText: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  searchStudent(): void {
    if (this.searchText.trim() === '') {
      this.loadStudents();

      return;
    }

    this.studentService.searchStudent(this.searchText).subscribe({
      next: (data) => {
        this.students = data;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  addStudent(): void {
    this.router.navigate(['/add-student']);
  }

  editStudent(id: number): void {
    this.router.navigate(['/edit-student', id]);
  }

  deleteStudent(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentService.deleteStudent(id).subscribe({
          next: () => {
            this.snackBar.open('Student Deleted Successfully', 'Close', {
              duration: 3000,
            });

            this.loadStudents();
          },

          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }

  exportExcel(): void {
    const data = this.students.map((student) => ({
      ID: student.id,

      Name: student.name,

      Email: student.email,

      Mobile: student.mobile,

      Course: student.course,

      Gender: student.gender,

      DOB: student.dob,

      Address: student.address,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const workbook: XLSX.WorkBook = {
      Sheets: { Students: worksheet },
      SheetNames: ['Students'],
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const file = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    FileSaver.saveAs(file, 'Student_Report.xlsx');
  }

  exportPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text('Student Management Report', 14, 20);

    autoTable(doc, {
      head: [['ID', 'Name', 'Email', 'Mobile', 'Course', 'Gender']],

      body: this.students.map(student => [
        student.id || '',

        student.name || '',

        student.email || '',

        student.mobile || '',

        student.course || '',

        student.gender || '',
      ])
    });

    doc.save('Student_Report.pdf');
  }
}
