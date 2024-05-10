import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../service/helper.service';
import { StudentLessonService } from '../../student/service/student-lesson.service';
import { DepartmentService } from '../service/department.service';
import { Lesson } from '../../lesson/model/lesson';
import { LessonService } from '../../lesson/service/lesson.service';
import { FormControl } from '@angular/forms';
import { LessonList } from '../../lesson/model/lesson-list';
import Swal from 'sweetalert2';
import { StaffService } from '../../staff/service/staff.service';
import { Staff } from '../../staff/model/staff';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styles: [
  ]
})
export class DepartmentDetailComponent implements OnInit {

  constructor(
    private departmentService: DepartmentService,
    private lessonService: LessonService,
    private staffService: StaffService,



    private helperService: HelperService,
    private router: ActivatedRoute,
  ) { }

  lesson: Lesson = new Lesson();
  periodNumber: number = 1;

  filterTextLesson: string = "";

  selectedSemesterId: number = 2;
  selectedPeriod: number | null = null;
  public selectLesson = new FormControl();
  lessons: Lesson[] = [];
  mappedLesson: Lesson[] = [];
  staffs: Staff[] = [];

  departmentId: number;
  lessonId: number;

  semesters: any[] = [
    { id: 1, name: "Hazırlık" },
    { id: 2, name: "1. Sınıf" },
    { id: 3, name: "2. Sınıf" },
    { id: 4, name: "3. Sınıf" },
    { id: 5, name: "4. Sınıf" }
  ];
  periods: any[] = [
    { id: 1, name: "Güz" },
    { id: 2, name: "Bahar" },
    { id: 3, name: "Tüm Dönemler" }
  ];
  periodsForSelect: any[] = [
    { id: 1, name: "Güz" },
    { id: 2, name: "Bahar" },
  ];

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.departmentId = params["id"];
      this.getLessons();
      this.getStaffs();
    });
  }


  getLessons() {
    this.lessonService.getListByDepartmentId(this.departmentId).subscribe((res: any) => {
      this.lessons = res.data;
      this.mappedLesson = this.lessons;
    });
  }

  getStaffs() {
    this.staffService.getList().subscribe((res: any) => {
      this.staffs = res.data;
    });
  }

  getLesson(id: number) {
    this.periodNumber = 0;
    this.lessonService.get(id).subscribe((res: any) => {
      this.lesson = res.data;
      if (this.lesson.isSpring == true)
        this.periodNumber = 2;
      else
        this.periodNumber = 1;
    });
  }
  lessonDelete(data: LessonList) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: data.name,
      text: "Dersi silmek istediğinizden emin misiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Silindi!',
          data.name + " Kaydı silindi",
          'success'
        )
        this.lessonService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          setTimeout(() => {
            this.getLessons();
          }, 100);
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    })

  }
  saveLesson() {
    this.lesson.departmentId = this.departmentId;

    if (this.lesson.id == null) {
      if (this.periodNumber == 2)
        this.lesson.isSpring = true;
      else
        this.lesson.isSpring = false;

      this.lessonService.add(this.lesson).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        this.clearLesson();
        this.getLessons();
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    } else {
      if (this.periodNumber == 2)
        this.lesson.isSpring = true;
      else
        this.lesson.isSpring = false;

      this.lessonService.update(this.lesson).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        this.clearLesson();
        this.getLessons();
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }





  }

  clearLesson() {
    this.lesson = new Lesson();
    this.selectLesson.reset();
  }

  selectSemester(semesterId: number) {
    this.selectedSemesterId = semesterId;
  }
  updateSelectedPeriod(periodId: number) {
    this.selectedPeriod = (periodId === 3) ? null : periodId;
  }
}
