import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../service/helper.service';
import { Programming } from '../model/programming';
import { ProgrammingService } from '../service/programming.service';

@Component({
  selector: 'app-programming-form',
  templateUrl: './programming-form.component.html',
  styles: [
  ]
})
export class ProgrammingFormComponent implements OnInit {

  constructor(private programmingService:ProgrammingService,private route: ActivatedRoute,private router: Router,private helperService:HelperService) { }

  id:number=0;

  programming:Programming=new Programming();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=undefined){
      this.programmingService.get(this.id).subscribe((res:any)=>{
        this.programming=res.data;
      });
    }
  }

  save(){
    if(this.id==undefined){
      this.programmingService.add(this.programming).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/programming']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else{
      this.programmingService.update(this.programming).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/programming']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
  }

}
