import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../service/helper.service';
import { Interest } from '../model/interest';
import { InterestService } from '../service/interest.service';

@Component({
  selector: 'app-interest-form',
  templateUrl: './interest-form.component.html',
  styles: [
  ]
})
export class InterestFormComponent implements OnInit {

  constructor(private interestService:InterestService,private route: ActivatedRoute,private router: Router,private helperService:HelperService) { }

  id:number=0;

  interest:Interest=new Interest();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=undefined){
      this.interestService.get(this.id).subscribe((res:any)=>{
        this.interest=res.data;
      });
    }
  }

  save(){
    if(this.id==undefined){
      this.interestService.add(this.interest).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/interest']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else{
      this.interestService.update(this.interest).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/interest']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
  }

}
