import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Student } from '../models/student';
import { Course } from '../models/course';

import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  student: Student = {
    name: '',
    email: '',
    mobile: '',
    course: '',
    gender: '',
    dob: '',
    address: ''
  };

  courses: Course[] = [];

  isEdit = false;

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    // Load all courses
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Check edit mode
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.studentService.getStudentById(+id).subscribe({
        next: (data) => {
          this.student = data;
        },
        error: (err) => {
          console.error(err);
        }
      });

    }

  }

  saveStudent(): void {

    this.studentService.addStudent(this.student).subscribe({

      next: () => {

        this.snackBar.open(
          'Student Added Successfully',
          'Close',
          { duration: 3000 }
        );

        this.router.navigate(['/students']);

      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  updateStudent(): void {

    this.studentService.updateStudent(this.student.id!, this.student).subscribe({

      next: () => {

        this.snackBar.open(
          'Student Updated Successfully',
          'Close',
          { duration: 3000 }
        );

        this.router.navigate(['/students']);

      },

      error: (err) => {
        console.error(err);
      }

    });

  }

}