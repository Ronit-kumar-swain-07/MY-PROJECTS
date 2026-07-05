import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];

  searchText: string = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {

    this.courseService.getAllCourses().subscribe({

      next: (data) => {

        this.courses = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  addCourse(): void {

    this.router.navigate(['/add-course']);

  }

  editCourse(id: number): void {

    this.router.navigate(['/edit-course', id]);

  }

  deleteCourse(id: number): void {

    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.courseService.deleteCourse(id).subscribe({

          next: () => {

            this.snackBar.open(
              'Course Deleted Successfully',
              'Close',
              {
                duration: 3000
              }
            );

            this.loadCourses();

          }

        });

      }

    });

  }

  searchCourse(): void {

    if (this.searchText.trim() == '') {

      this.loadCourses();

      return;

    }

    this.courseService.searchCourse(this.searchText).subscribe({

      next: (data) => {

        this.courses = data;

      }

    });

  }

  exportExcel(): void {

  const data = this.courses.map(course => ({

    ID: course.id,

    Course: course.courseName,

    Description: course.description,

    Duration: course.duration,

    Fee: course.fee

  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = {

    Sheets: {

      Courses: worksheet

    },

    SheetNames: ['Courses']

  };

  const excelBuffer = XLSX.write(workbook, {

    bookType: 'xlsx',

    type: 'array'

  });

  FileSaver.saveAs(

    new Blob([excelBuffer]),

    'Course_Report.xlsx'

  );

}

exportPDF(): void {

  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text('Course Report', 14, 20);

  autoTable(doc, {

    head: [[

      'ID',

      'Course',

      'Description',

      'Duration',

      'Fee'

    ]],

    body: this.courses.map(course => [

  course.id || '',

  course.courseName || '',

  course.description || '',

  course.duration || '',

  course.fee || ''

])

  });

  doc.save('Course_Report.pdf');

}

}