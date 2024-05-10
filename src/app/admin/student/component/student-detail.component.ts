import { Component, OnInit } from '@angular/core';
import { StudentInterestService } from '../service/student-interest.service';
import { InterestService } from '../../insterest/service/interest.service';
import { ProgrammingService } from '../../programming/service/programming.service';
import { LanguageService } from '../../language/service/language.service';
import { HelperService } from '../../service/helper.service';
import { ActivatedRoute } from '@angular/router';
import { StudentInterestList } from '../model/student-interest-list';
import { StudentInterest } from '../model/student-interest';
import { StudentLanguageService } from '../service/student-language.service';
import { StudentProgrammingService } from '../service/student-programming.service';
import { StudentProgrammingList } from '../model/student-programming-list';
import { StudentLanguageList } from '../model/student-language-list';
import { StudentLanguage } from '../model/student-language';
import { StudentProgramming } from '../model/student-programming';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';
import Swal from 'sweetalert2';
import { Interest } from '../../insterest/model/interest';
import { Programming } from '../../programming/model/programming';
import { Language } from '../../language/model/language';
import { FormControl } from '@angular/forms';
import { Lesson } from '../../lesson/model/lesson';
import { StudentLessonList } from '../model/student-lesson-list';
import { StudentLesson } from '../model/student-lesson';
import { StudentLessonService } from '../service/student-lesson.service';
import { LessonService } from '../../lesson/service/lesson.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styles: [],
})
export class StudentDetailComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private studentInterestService: StudentInterestService,
    private studentLanguageService: StudentLanguageService,
    private studentProgrammingService: StudentProgrammingService,
    private studentLessonService: StudentLessonService,

    private interestService: InterestService,
    private programmingService: ProgrammingService,
    private languageService: LanguageService,
    private lessonService: LessonService,
    private helperService: HelperService,
    private router: ActivatedRoute
  ) { }

  student: Student = new Student();
  selectedSemesterId: number = 2;
  selectedPeriod: number | null = null;

  interests: Interest[] = [];
  programmings: Programming[] = [];
  languages: Language[] = [];
  lessons: Lesson[] = [];

  mappedInterest: any[] = [];
  mappedProgramming: Programming[] = [];
  mappedLanguage: Language[] = [];
  mappedLesson: Lesson[] = [];

  studentId: number;

  // bu alttaki üçü getListByLanguageId , getListByInterestId ve getListByp
  lessonId: number;
  languageId: number;
  interestId: number;
  programmingId: number;

  studentLessons: StudentLessonList[] = [];
  studentInterests: StudentInterestList[] = [];
  studentLanguages: StudentLanguageList[] = [];
  studentProgrammings: StudentProgrammingList[] = [];

  studentLesson: StudentLesson = new StudentLesson();
  studentInterest: StudentInterest = new StudentInterest();
  studentLanguage: StudentLanguage = new StudentLanguage();
  studentProgramming: StudentProgramming = new StudentProgramming();

  public selectStudentLesson = new FormControl();
  public selectStudentInterest = new FormControl();
  public selectStudentProgramming = new FormControl();
  public selectStudentLanguage = new FormControl();
  // public selectControlDepartment = new FormControl();

  filterTextLesson: string = "";
  filterTextLanguage: string = "";
  filterTextInterest: string = "";
  filterTextProgramming: string = "";

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
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.studentId = params["id"];
      this.studentLessonList();
      this.studentInterestList();
      this.studentLanguageList();
      this.studentProgrammingList();
    });
    this.getLessons();
    this.getLanguages();
    this.getInterests();
    this.getProgrammings();
  }

  //get lists
  studentLessonList() {
    this.studentLessonService.getlistByStudentId(this.studentId).subscribe((res: any) => {
      this.studentLessons = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  studentInterestList() {
    this.studentInterestService.getListDtoByStudentId(this.studentId).subscribe((res: any) => {
      this.studentInterests = res.data;
      console.log(res.data);
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  studentLanguageList() {
    this.studentLanguageService.getListDtoByStudentId(this.studentId).subscribe((res: any) => {
      this.studentLanguages = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  studentProgrammingList() {
    this.studentProgrammingService.getListDtoByStudentId(this.studentId).subscribe((res: any) => {
      this.studentProgrammings = res.data;

      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }
  updateMidterm(value: number | null): void {
    if (this.studentLesson) {
      this.studentLesson.midtern = value;
    }
  }

  updateProject(value: number | null): void {
    if (this.studentLesson) {
      this.studentLesson.project = value;
    }
  }

  updateQuiz(value: number | null): void {
    if (this.studentLesson) {
      this.studentLesson.quiz = value;
    }
  }

  updateFinal(value: number | null): void {
    if (this.studentLesson) {
      this.studentLesson.final = value;
    }
  }

  updateAverage(value: number | null): void {
    if (this.studentLesson) {
      this.studentLesson.average = value;
    }
  }



  //get by id
  getStudentLesson(id: number) {
    console.log(id);
    this.studentLessonService.get(id).subscribe((res: any) => {
      this.studentLesson=res.data;
     this.selectStudentLesson.setValue(this.studentLesson.lessonId);
    });
  }

  getStudentLanguage(id: number) {
    this.studentLanguageService.get(id).subscribe((res: any) => {
      this.studentLanguage = res.data;
      this.selectStudentLanguage.setValue(this.studentLanguage.languageId);
    });
  }

  getStudentProgramming(id: number) {
    this.studentProgrammingService.get(id).subscribe((res: any) => {
      this.studentProgramming = res.data;
      this.selectStudentProgramming.setValue(this.studentProgramming.programmingId);
    });
  }

  getStudentInterest(id: number) {
    this.studentInterestService.get(id).subscribe((res: any) => {
      this.studentInterest = res.data;
      this.selectStudentInterest.setValue(this.studentInterest.interestId);
    });
  }



  //saves
  saveStudentLanguage() {
    if (this.studentLanguage.id != null) {
      //guncelleme
      this.studentLanguageService.update(this.studentLanguage).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.studentLanguageList();
          this.clearStudentLanguage();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearStudentLanguage();
      });
    }
    else {
      //ekleme
      this.studentLanguage.studentId = this.studentId;
      this.studentLanguage.isActive = true;
      this.studentLanguageService.add(this.studentLanguage).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.studentLanguageList();
          this.clearStudentLanguage();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearStudentLanguage();
      });
    }
  }

  saveStudentInterest() {
    if (this.studentInterest.id != null) {
      //guncelleme
      this.studentInterestService.update(this.studentInterest).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.studentInterestList();
          this.clearStudentInterest();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearStudentInterest();
      });
    }
    else {
      //ekleme
      this.studentInterest.studentId = this.studentId;
      this.studentInterest.isActive = true;
      this.studentInterestService.add(this.studentInterest).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.studentInterestList();
          this.clearStudentInterest();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearStudentInterest();
      });
    }
  }

  saveStudentProgramming() {
    if (this.studentProgramming.id != null) {
      //guncelleme
      this.studentProgrammingService.update(this.studentProgramming).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.studentProgrammingList();
          this.clearStudentProgramming();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearStudentProgramming();
      });
    }
    else {
      //ekleme
      this.studentProgramming.studentId = this.studentId;
      this.studentProgramming.isActive = true;
      this.studentProgrammingService.add(this.studentProgramming).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.studentProgrammingList();
          this.clearStudentProgramming();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearStudentProgramming();
      });
    }
  }

  saveStudentLesson() {
    if (this.studentLesson.id != null) {
      //guncelleme
      this.studentLessonService.update(this.studentLesson).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.studentLessonList();
          this.clearStudentLesson();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearStudentLesson();
      });
    }
    else {
      //ekleme
      this.studentLesson.studentId = this.studentId;
      this.studentLesson.isActive = true;
      this.studentLessonService.add(this.studentLesson).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.studentLessonList();
          this.clearStudentLesson();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearStudentLesson();
      });
    }
  }




  //deletes
  studentInterestDelete(data: StudentInterestList) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-light'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: data.interestName,
      text: "Kaydını silmek istediğine emin misiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Silindi!',
          data.interestName + " Kaydı silindi",
          'success'
        )
        this.studentInterestService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          setTimeout(() => {
            this.studentInterestList();
          }, 100);
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    })
  }

  studentLanguageDelete(data: StudentLanguageList) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-light'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: data.languageName,
      text: "Kaydını silmek istediğine emin misiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Silindi!',
          data.languageName + " Kaydı silindi",
          'success'
        )
        this.studentLanguageService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          setTimeout(() => {
            this.studentLanguageList();
          }, 100);
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    })
  }

  studentProgrammingDelete(data: StudentProgrammingList) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-light'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: data.programmingName,
      text: "Kaydını silmek istediğine emin misiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Silindi!',
          data.programmingName + " Kaydı silindi",
          'success'
        )
        this.studentProgrammingService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          setTimeout(() => {
            this.studentProgrammingList();
          }, 100);
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    })
  }

  studentLessonDelete(data: StudentLessonList) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-light'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: data.name,
      text: "Kaydını silmek istediğine emin misiniz?",
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
        this.studentLessonService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          setTimeout(() => {
            this.studentLessonList();
          }, 100);
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    })
  }


  //common methods
  getInterests() {
    this.interestService.getList().subscribe((res: any) => {
      this.interests = res.data;
      this.mappedInterest = res.data.map((x: any) => {
        return { optionId: x.id, optionTitle: x.name }
      })
    });
  }

  getLanguages() {
    this.languageService.getList().subscribe((res: any) => {
      this.languages = res.data;
      this.mappedLanguage = res.data.map((x: any) => {
        return { optionId: x.id, optionTitle: x.name }
      })
    });
  }

  getProgrammings() {
    this.programmingService.getList().subscribe((res: any) => {
      this.programmings = res.data;
      this.mappedProgramming = res.data.map((x: any) => {
        return { optionId: x.id, optionTitle: x.name }
      })
    });
  }

  getLessons() {
    this.lessonService.getList().subscribe((res: any) => {
      this.lessons = res.data;
      this.mappedLesson = res.data.map((x: any) => {
        return { optionId: x.id, optionTitle: x.name }
      })
    });
  }


  //clears
  clearStudentLanguage() {
    this.studentLanguage = new StudentLanguage();
    this.selectStudentLanguage.reset();
  }

  clearStudentInterest() {
    this.studentInterest = new StudentInterest();
    this.selectStudentInterest.reset();
  }

  clearStudentProgramming() {
    this.studentProgramming = new StudentProgramming();
    this.selectStudentProgramming.reset();
  }

  clearStudentLesson() {
    this.studentLesson = new StudentLesson();
    this.selectStudentLesson.reset();
  }


  //change methods
  changeInterestId() {
    this.studentInterest.interestId = this.selectStudentInterest.value;
  }

  changeLanguageId() {
    this.studentLanguage.languageId = this.selectStudentLanguage.value;
  }

  changeProgrammingId() {
    this.studentProgramming.programmingId = this.selectStudentProgramming.value;
  }

  changeLessonId() {
    this.studentLesson.lessonId = this.selectStudentLesson.value;
  }



  selectSemester(semesterId: number) {
    this.selectedSemesterId = semesterId;
  }
  updateSelectedPeriod(periodId: number) {
    this.selectedPeriod = (periodId === 3) ? null : periodId;
  }
}
