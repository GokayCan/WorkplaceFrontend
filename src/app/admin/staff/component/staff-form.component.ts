import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../department/model/department';
import { DepartmentService } from '../../department/service/department.service';
import { HelperService } from '../../service/helper.service';
import { Staff } from '../model/staff';
import { StaffService } from '../service/staff.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styles: [
  ]
})
export class StaffFormComponent implements OnInit {

  constructor(private staffService:StaffService,private departmentService:DepartmentService,private route: ActivatedRoute,private router: Router,private helperService:HelperService) { }

  id:number=0;

  staff:Staff=new Staff();
  departments:Department[]=[];

  mappedDepartments:Department[]=[];
  public selectControlDepartment = new FormControl();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=undefined){
      this.staffService.get(this.id).subscribe((res:any)=>{
        this.staff=res.data;
      });
    }
    this.getDepartmentList();
  }

  save(){
    if(this.id==undefined){
      this.staffService.add(this.staff).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/staff']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else{
      this.staffService.update(this.staff).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/staff']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
  }

  getDepartmentList(){
    this.departmentService.getList().subscribe((res:any)=>{
      this.departments=res.data;
      this.mappedDepartments = res.data.map((x: any) => {
        return { optionId: x.id, optionTitle: x.name }
      })
    },
    (error) => {
      this.helperService.Message({ message: error.error, type: "error", code: error.status });
    });
  }

  changeSectorId() {
    this.staff.departmentId = this.selectControlDepartment.value;
  }


}
