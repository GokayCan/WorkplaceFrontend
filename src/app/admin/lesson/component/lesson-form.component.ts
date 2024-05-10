import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../department/service/department.service';
import { HelperService } from '../../service/helper.service';
import { LessonService } from '../service/lesson.service';
import { Lesson } from '../model/lesson';
import { Department } from '../../department/model/department';
import { Staff } from '../../staff/model/staff';
import { StaffService } from '../../staff/service/staff.service';
import { DecodeService } from '../../service/decoder.service';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styles: [
  ]
})
export class LessonFormComponent implements OnInit {

  constructor(
    private lessonService: LessonService,
    private departmentService: DepartmentService,
    private staffService: StaffService,

    private decodeService: DecodeService,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  id: number = 0;
  userId: number = 0;
  periodNumber: number = 1;

  lesson: Lesson = new Lesson();
  departments: Department[] = [];
  staffs: Staff[] = [];
  semesters: any[] = [
    { id: 1, name: "Hazırlık" },
    { id: 2, name: "1. Sınıf" },
    { id: 3, name: "2. Sınıf" },
    { id: 4, name: "3. Sınıf" },
    { id: 5, name: "4. Sınıf" }
  ];
  periods: any[] = [
    { id: 1, name: "Güz" },
    { id: 2, name: "Bahar" }
  ];

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userId = this.decodeService.getUserId();
    if (this.id != undefined) {
      this.lessonService.get(this.id).subscribe((res: any) => {
        this.lesson = res.data;
        if (this.lesson.isSpring == true)
          this.periodNumber = 2;
        else
          this.periodNumber = 1;
      });
    }
    this.departmentService.getList().subscribe((res: any) => {
      this.departments = res.data
    });
    this.staffService.getList().subscribe((res: any) => {
      this.staffs = res.data
    });
  }

  save() {
    if (this.id == undefined) {
      this.lesson.createdBy = this.userId;
      if (this.periodNumber == 2)
        this.lesson.isSpring = true;
      else
        this.lesson.isSpring = false;

      this.lessonService.add(this.lesson).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/lesson']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else {
      if (this.periodNumber == 2)
        this.lesson.isSpring = true;
      else
        this.lesson.isSpring = false;

      this.lessonService.update(this.lesson).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/lesson']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
  }
}
