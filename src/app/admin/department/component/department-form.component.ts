import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from '../../faculty/model/faculty';
import { FacultyService } from '../../faculty/service/faculty.service';
import { HelperService } from '../../service/helper.service';
import { Department } from '../model/department';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styles: [
  ]
})
export class DepartmentFormComponent implements OnInit {

  constructor(private departmentService:DepartmentService,private facultyService:FacultyService,private route: ActivatedRoute,private router: Router,private helperService:HelperService) { }

  id:number=0;

  department:Department=new Department();
  faculties:Faculty[]=[];

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=undefined){
      this.departmentService.get(this.id).subscribe((res:any)=>{
        this.department=res.data;
      });
    }
    this.facultyService.getList().subscribe((res:any)=>{
      this.faculties=res.data
    });
  }

  save(){
    if(this.id==undefined){
      this.departmentService.add(this.department).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/department']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else{
      this.departmentService.update(this.department).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/department']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
  }

}
