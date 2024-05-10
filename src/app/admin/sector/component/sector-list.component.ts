import { Component } from '@angular/core';
import { SectorService } from '../service/sector.service';
import { HelperService } from '../../service/helper.service';
import { Sector } from '../model/sector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styles: [
  ]
})
export class SectorListComponent {

  constructor(private sectorService: SectorService, private helperService: HelperService) { }

  data: Sector[] = [];

  filterText: string;

  currentPage = 1;
  pageSize = 5;
  totalItems: number = 0;


  ngOnInit(): void {
    this.list();
  }

  list() {
    this.sectorService.getList().subscribe((res: any) => {
      this.data = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  delete(data: Sector) {
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
        this.sectorService.delete(data).subscribe((res: any) => {
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
