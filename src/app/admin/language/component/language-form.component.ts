import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../service/helper.service';
import { Language } from '../model/language';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styles: [
  ]
})
export class LanguageFormComponent implements OnInit {

  constructor(private languageService:LanguageService,private route: ActivatedRoute,private router: Router,private helperService:HelperService) { }

  id:number=0;

  language:Language=new Language();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=undefined){
      this.languageService.get(this.id).subscribe((res:any)=>{
        this.language=res.data;
      });
    }
  }

  save(){
    if(this.id==undefined){
      this.languageService.add(this.language).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/language']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else{
      this.languageService.update(this.language).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/language']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
  }

}
