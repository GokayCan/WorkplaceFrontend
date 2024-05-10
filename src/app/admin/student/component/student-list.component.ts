import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HelperService } from '../../service/helper.service';
import { StudentList } from '../model/student-list';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styles: [
  ]
})
export class StudentListComponent implements OnInit {

  constructor(private studentService: StudentService, private helperService: HelperService) { }

  data: StudentList[] = [];

  filterText: string="";

  pageSize = 5;
  currentPage = 1;
  totalItems: number = 0;
  pageNumbers: number[] = [];

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.studentService.getList().subscribe((res: any) => {
      this.data = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  delete(data: StudentList) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-light'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: data.firstName+" "+data.lastName,
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
          data.firstName+" "+data.lastName + " Kaydı silindi",
          'success'
        )
        this.studentService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          setTimeout(() => {
            this.list();
          }, 1500);
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    })
  }

  changePage(page: number) {
    this.currentPage = page;
  }

}
