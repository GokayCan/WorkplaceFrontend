import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../service/helper.service';
import { LessonService } from '../service/lesson.service';
import { LessonList } from '../model/lesson-list';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styles: [
  ]
})
export class LessonListComponent implements OnInit {

  constructor(
    private lessonService: LessonService,
    private helperService: HelperService
  ) { }
  data: LessonList[] = [];

  filterText: string;

  pageSize = 5;
  currentPage = 1;
  totalItems: number = 0;

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.lessonService.getListDto().subscribe((res: any) => {
      this.data = res.data;
      this.helperService.Message({ message: res.message, type: "success" });
    },
      (error) => {
        this.helperService.Message({ message: error.error, type: "error", code: error.status });
      });
  }

  delete(data: LessonList) {
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
        );
        this.lessonService.delete(data).subscribe((res: any) => {
          this.helperService.Message({ message: res.message, type: "success" });
          this.list();
        },
          (error) => {
            this.helperService.Message({ message: error.error, type: "error", code: error.status });
          });
      }
    });
  }

  changePage(event: any) {
    this.currentPage = event;
  }

}
