import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentDialogComponent } from './view-student-dialog.component';

describe('ViewStudentDialogComponent', () => {
  let component: ViewStudentDialogComponent;
  let fixture: ComponentFixture<ViewStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
