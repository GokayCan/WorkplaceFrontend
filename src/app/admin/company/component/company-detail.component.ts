import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyStaffList } from '../model/companyStaffList';
import Swal from 'sweetalert2';
import { HelperService } from '../../service/helper.service';
import { CompanyStaffService } from '../service/companyStaff.service';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../staff/service/staff.service';
import { Staff } from '../../staff/model/staff';
import { CompanyStaff } from '../model/companyStaff';
import { StudentService } from '../../student/service/student.service';
import { CompanyStudent } from '../model/companyStudent';
import { CompanyResponsible } from '../model/companyResponsible';
import { CompanyResponsibleList } from '../model/companyResponsibleList';
import { CompanyStudentList } from '../model/companyStudentList';
import { CompanyResponsibleService } from '../service/companyResponsible.service';
import { CompanyStudentService } from '../service/companyStudent.service';
import { Student } from '../../student/model/student';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../department/service/department.service';
import { Department } from '../../department/model/department';
import { DepartmentList } from '../../department/model/department-list';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styles: [
  ]
})
export class CompanyDetailComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    html: new FormControl('', Validators.required)
  });

  config: any = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline',]],
      ['para', ['ul', 'ol', 'paragraph', 'height']],
    ],
  }
  constructor(
    private companyStaffService: CompanyStaffService,
    private companyStudentService: CompanyStudentService,
    private companyResponsibleService: CompanyResponsibleService,
    private staffService: StaffService,
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private helperService: HelperService,
    private router: ActivatedRoute) { }

  companyId: number;
  companyStaffs: CompanyStaffList[] = [];
  companyStudents: CompanyStudentList[] = [];
  companyResponsibles: CompanyResponsibleList[] = [];



  staffs: Staff[] = [];
  mappedStaff: Staff[] = [];

  departments: DepartmentList[] = [];
  mappedDepartments: DepartmentList[] = [];

  students: Student[] = [];
  mappedStudents: Student[] = [];

  companyStaff: CompanyStaff = new CompanyStaff();
  companyStudent: CompanyStudent = new CompanyStudent();
  companyResponsible: CompanyResponsible = new CompanyResponsible();

  filterTextStaff: string = "";
  filterTextStudent: string = "";
  filterTextResponsible: string = "";

  public selectControlStaff = new FormControl();
  public selectControlResponsible = new FormControl();
  public selectControlStudent = new FormControl();
  public selectControlDepartment = new FormControl();

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.companyId = params["id"];
      this.companyStaffList();
      this.companyResponsibleList();
      this.companyStudentList();
    });
    this.getStaffs();
    this.getDepartments();
    //this.getStudents();
  }

  //get lists
  companyStaffList() {
    this.companyStaffService.getListByCompanyId(this.companyId).subscribe((res: any) => {
      this.companyStaffs = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  companyStudentList() {
    this.companyStudentService.getListByCompanyId(this.companyId).subscribe((res: any) => {
      this.companyStudents = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  companyResponsibleList() {
    this.companyResponsibleService.getListByCompanyId(this.companyId).subscribe((res: any) => {
      this.companyResponsibles = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  //get by id
  getCompanyStaff(id: number) {
    this.companyStaffService.get(id).subscribe((res: any) => {
      this.companyStaff = res.data;
      this.selectControlStaff.setValue(this.companyStaff.staffId);
    });
  }

  getCompanyStudent(id: number) {
    this.companyStudentService.get(id).subscribe((res: any) => {
      this.companyStudent = res.data;
      this.selectControlStudent.setValue(this.companyStudent.studentId);
      this.studentService.get(this.companyStudent.studentId).subscribe((res: any) => {
        this.selectControlDepartment.setValue(res.data.departmentId);
      });

    });
  }

  getCompanyResponsible(id: number) {
    this.companyResponsibleService.get(id).subscribe((res: any) => {
      this.companyResponsible = res.data;
      this.selectControlResponsible.setValue(this.companyResponsible.responsibleId);
    });
  }


  //saves
  saveCompanyStaff() {
    if (this.companyStaff.id != null) {
      //guncelleme
      this.companyStaffService.update(this.companyStaff).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.companyStaffList();
          this.clearCompanyStaff();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearCompanyStaff();
      });
    }
    else {
      //ekleme
      this.companyStaff.companyId = this.companyId;
      this.companyStaff.isActive = true;
      this.companyStaffService.add(this.companyStaff).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.companyStaffList();
          this.clearCompanyStaff();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearCompanyStaff();
      });
    }
  }

  saveCompanyStudent() {
    if (this.companyStudent.id != null) {
      this.companyStudentService.update(this.companyStudent).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.companyStudentList();
          this.clearCompanyStudent();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearCompanyStudent();
      });
    }
    else {
      //ekleme
      this.companyStudent.companyId = this.companyId;
      this.companyStudent.isActive = true;
      this.companyStudentService.add(this.companyStudent).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.companyStudentList();
          this.clearCompanyStudent();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearCompanyStudent();
      });
    }
  }

  saveCompanyResponsible() {
    if (this.companyResponsible.id != null) {
      //guncelleme
      this.companyResponsibleService.update(this.companyResponsible).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.companyResponsibleList();
          this.clearCompanyResponsible();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearCompanyResponsible();
      });
    }
    else {
      //ekleme
      this.companyResponsible.companyId = this.companyId;
      this.companyResponsible.isActive = true;
      this.companyResponsibleService.add(this.companyResponsible).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.companyResponsibleList();
          this.clearCompanyResponsible();
        }, 100);
      }, (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
        this.clearCompanyResponsible();
      });
    }
  }


  //deletes
  companyStaffDelete(data: CompanyStaffList) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-light'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: data.userName,
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
          data.userName + " Kaydı silindi",
          'success'
        )
        this.companyStaffService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          setTimeout(() => {
            this.companyStaffList();
          }, 100);
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    })
  }

  companyStudentDelete(data: CompanyStudentList) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-light'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: data.userName,
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
          data.userName + " Kaydı silindi",
          'success'
        )
        this.companyStudentService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          setTimeout(() => {
            this.companyStudentList();
          }, 100);
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    })
  }

  companyResponsibleDelete(data: CompanyResponsibleList) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-light'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: data.userName,
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
          data.userName + " Kaydı silindi",
          'success'
        )
        this.companyResponsibleService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          setTimeout(() => {
            this.companyResponsibleList();
          }, 100);
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    })
  }


  //common methods
  getStaffs() {
    this.staffService.getList().subscribe((res: any) => {
      this.staffs = res.data;
      this.mappedStaff = res.data.map((x: any) => {
        return { optionId: x.id, optionTitle: x.firstName + " " + x.lastName }
      })
    });
  }

  getDepartments() {
    this.departmentService.getList().subscribe((res: any) => {
      this.departments = res.data;
      this.mappedDepartments = res.data.map((x: any) => {
        return { optionId: x.id, optionTitle: x.name }
      })
    });
  }

  getStudents(id: number) {
    if (id != null) {
      this.studentService.getListByDepartmentId(id).subscribe((res: any) => {
        this.students = res.data;
        this.mappedStudents = res.data.map((x: any) => {
          return { optionId: x.id, optionTitle: x.firstName + " " + x.lastName + " / " + x.number }
        })
      });
    }
  }


  //clears
  clearCompanyStaff() {
    this.companyStaff = new CompanyStaff();
    this.selectControlStaff.reset();
  }

  clearCompanyStudent() {
    this.companyStudent = new CompanyStudent();
    this.selectControlStudent.reset();
    this.selectControlDepartment.reset();
  }

  clearCompanyResponsible() {
    this.companyResponsible = new CompanyResponsible();
    this.selectControlResponsible.reset();
  }

  changeStaffId() {
    this.companyStaff.staffId = this.selectControlStaff.value;
  }

  changeResponsibleId() {
    this.companyResponsible.responsibleId = this.selectControlResponsible.value;
  }

  changeStudentId() {
    this.companyStudent.studentId = this.selectControlStudent.value;
  }

}
