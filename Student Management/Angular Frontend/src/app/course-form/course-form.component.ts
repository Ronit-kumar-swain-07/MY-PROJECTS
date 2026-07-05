import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  course: Course = {

  courseName: '',

  description: '',

  duration: '',

  fee: 0

};

  isEdit = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.courseService.getCourseById(+id).subscribe(data => {
        this.course = data;
      });

    }

  }

  saveCourse() {

    this.courseService.addCourse(this.course).subscribe(() => {

      this.snackBar.open(
        'Course Added Successfully',
        'Close',
        { duration: 3000 }
      );

      this.router.navigate(['/courses']);

    });

  }

  updateCourse() {

    this.courseService.updateCourse(this.course.id!, this.course).subscribe(() => {

      this.snackBar.open(
        'Course Updated Successfully',
        'Close',
        { duration: 3000 }
      );

      this.router.navigate(['/courses']);

    });

  }

}