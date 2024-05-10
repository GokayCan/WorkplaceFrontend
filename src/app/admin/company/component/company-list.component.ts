import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { CompanyPipe } from '../pipe/company.pipe';
import { HelperService } from '../../service/helper.service';
import { Company } from '../model/company';
import Swal from 'sweetalert2';
import { CompanyList } from '../model/company-list';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styles: []
})


export class CompanyListComponent implements OnInit {

  constructor(private companyService: CompanyService,
    private helperService: HelperService) { }

  data: CompanyList[] = [];
  filteredCompanies: CompanyList[] = [];

  filterText: string = "";

  // pagination için
  pageSize = 5;
  currentPage = 1;
  pageNumbers: number[] = [];
  totalItems: number = 0;

  ngOnInit(): void {
    this.list();
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  list() {
    this.companyService.getList().subscribe((res: any) => {
      this.data = res.data;
      this.totalItems = this.data.length;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  applyFilter() {
    this.currentPage = 1;
    this.totalItems = this.filteredCompanies.length;
  }

  delete(data: Company) {
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
        this.companyService.delete(data).subscribe((res: any) => {
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


}
