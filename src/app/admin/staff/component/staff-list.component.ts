import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HelperService } from '../../service/helper.service';
import { StaffList } from '../model/staff-list';
import { StaffService } from '../service/staff.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styles: [
  ]
})
export class StaffListComponent implements OnInit {

  constructor(private staffService: StaffService, private helperService: HelperService) { }

  data: StaffList[] = [];

  filterText: string="";

  // pagination için
  pageSize = 5;
  currentPage = 1;
  pageNumbers: number[] = [];
  totalItems: number = 0;

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.staffService.getList().subscribe((res: any) => {
      this.data = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  delete(data: StaffList) {
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
        this.staffService.delete(data).subscribe((res: any) => {
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
