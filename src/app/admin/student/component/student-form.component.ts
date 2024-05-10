import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../department/model/department';
import { DepartmentService } from '../../department/service/department.service';
import { Faculty } from '../../faculty/model/faculty';
import { HelperService } from '../../service/helper.service';
import { StudentService } from '../service/student.service';
import { Student } from '../model/student';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styles: [
  ]
})
export class StudentFormComponent implements OnInit {

  constructor(private studentService:StudentService,private departmentService:DepartmentService,private route: ActivatedRoute,private router: Router,private helperService:HelperService) { }

  id:number=0;

  student:Student=new Student();
  departments:Department[]=[];

  mappedDepartments:Department[]=[];
  public selectControlDepartment = new FormControl();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=undefined){
      this.studentService.get(this.id).subscribe((res:any)=>{
        this.student=res.data;
        this.selectControlDepartment.setValue(this.student.departmentId);

      });
    }
    this.getDepartmentList();
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

  save(){
    if(this.id==undefined){
      this.studentService.add(this.student).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/student']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else{
      this.studentService.update(this.student).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/student']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
  }

  changeSectorId() {
    this.student.departmentId = this.selectControlDepartment.value;
  }

}
