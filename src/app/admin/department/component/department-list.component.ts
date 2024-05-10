import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../service/helper.service';
import { DepartmentList } from '../model/department-list';
import { DepartmentService } from '../service/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styles: [
  ]
})
export class DepartmentListComponent implements OnInit {

  constructor(private departmentService: DepartmentService, private helperService: HelperService) { }

  data: DepartmentList[] = [];

  filterText: string;

  pageSize = 5;
  currentPage = 1;
  totalItems: number = 0;

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.departmentService.getList().subscribe((res: any) => {
      this.data = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  delete(data: DepartmentList) {
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
        this.departmentService.delete(data).subscribe((res: any) => {
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
