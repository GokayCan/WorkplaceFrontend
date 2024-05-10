import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HelperService } from '../../service/helper.service';
import { Language } from '../model/language';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styles: [
  ]
})
export class LanguageListComponent implements OnInit {

  constructor(private languageService: LanguageService, private helperService: HelperService) { }

  data: Language[] = [];

  filterText: string;

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.languageService.getList().subscribe((res: any) => {
      this.data = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  delete(data: Language) {
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
        this.languageService.delete(data).subscribe((res: any) => {
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
