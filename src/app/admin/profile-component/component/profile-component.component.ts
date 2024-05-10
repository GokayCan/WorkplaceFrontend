import { Component, OnInit } from '@angular/core';
import { profile } from '../model/profile';
import { DepartmentList } from '../../department/model/department-list';
import { DepartmentService } from '../../department/service/department.service';
import { StaffService } from '../../staff/service/staff.service';
import { DecodeService } from '../../service/decoder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../service/helper.service';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styles: [
  ]
})
export class ProfileComponentComponent implements OnInit {

  profile:profile = new profile();
  departments:DepartmentList[]=[];
  id:number;

  constructor(private departmentService:DepartmentService,private staffService:StaffService, private decodeService:DecodeService,private route: ActivatedRoute,private router: Router,private helperService:HelperService) { }

  ngOnInit(){
    this.id = this.decodeService.getUserId();
    console.log(this.id)
    this.staffService.getByUserId(this.id).subscribe((res:any)=>{
      this.profile = res.data;
    })

    this.departmentService.getList().subscribe((res:any)=>{
      this.departments = res.data;
    })
  }

 save(){
  this.staffService.update(this.profile).subscribe((res:any)=>{
    this.helperService.Message({ message: res.message, type: "success" });
    setTimeout(() => {
      window.location.reload();
    }, 700);
  },
    (error) => {
      this.helperService.Message({ message: error.error, type: "error", code: error.status });
    });
  }
}
