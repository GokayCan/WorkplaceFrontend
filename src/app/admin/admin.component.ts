import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { StudentService } from './student/service/student.service';
import { CompanyService } from './company/service/company.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale:'tr',
    buttonText:{
      today: 'Bugün',
      month: 'Ay',
      week: 'Hafta',
      day: 'Gün',
      list: 'Liste',
    }
  };

  numberOfCompany:number;
  numberOfStudent:number

  constructor(private companyService:CompanyService,private studentServicve:StudentService) { }

  ngOnInit(): void {
    this.companyService.getList().subscribe((res:any)=>{
      this.numberOfCompany=res.data.length
    })
    this.studentServicve.getList().subscribe((res:any)=>{
      this.numberOfStudent=res.data.length
    })
  }

}
