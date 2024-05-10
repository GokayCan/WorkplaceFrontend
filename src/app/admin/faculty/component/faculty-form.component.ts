import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../service/helper.service';
import { Faculty } from '../model/faculty';
import { FacultyService } from '../service/faculty.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styles: [
  ]
})
export class FacultyFormComponent implements OnInit {

  constructor(private facultyService:FacultyService,private route: ActivatedRoute,private router: Router,private helperService:HelperService) { }

  id:number=0;

  faculty:Faculty=new Faculty();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=undefined){
      this.facultyService.get(this.id).subscribe((res:any)=>{
        this.faculty=res.data;
      });
    }
  }

  save(){
    if(this.id==undefined){
      this.facultyService.add(this.faculty).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/faculty']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else{
      this.facultyService.update(this.faculty).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/faculty']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
  }

}
