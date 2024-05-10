import { Component } from '@angular/core';
import { SectorService } from '../service/sector.service';
import { CompanyService } from '../../company/service/company.service';
import { HelperService } from '../../service/helper.service';
import { Company } from '../../company/model/company';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CompanyList } from '../../company/model/company-list';

@Component({
  selector: 'app-sector-detail',
  templateUrl: './sector-detail.component.html',
  styles: [
  ]
})
export class SectorDetailComponent {
  constructor(
    private sectorService: SectorService,
    private companyService: CompanyService,
    private helperService: HelperService,
    private router: ActivatedRoute
  ) { }

  data: CompanyList[] = [];
  filteredCompanies: CompanyList[] = [];

  sectorId: number;
  filterText: string;

  currentPage = 1;
  pageSize = 5;
  totalItems: number = 0;


  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.sectorId = params["id"];

      this.list();
    });
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  
  applyFilter() {
    this.currentPage = 1;
    this.totalItems = this.filteredCompanies.length;
  }

  list() {
    this.companyService.getListBySectorId(this.sectorId).subscribe((res: any) => {
      this.data = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
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
