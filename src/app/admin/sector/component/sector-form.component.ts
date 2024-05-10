import { Component } from '@angular/core';
import { Sector } from '../model/sector';
import { SectorService } from '../service/sector.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../service/helper.service';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styles: [
  ]
})
export class SectorFormComponent {

  constructor(private sectorService:SectorService,private route: ActivatedRoute,private router: Router,private helperService:HelperService) { }

  id:number=0;

  sector:Sector=new Sector();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=undefined){
      this.sectorService.get(this.id).subscribe((res:any)=>{
        this.sector=res.data;
      });
    }
  }

  save(){
    if(this.id==undefined){
      this.sectorService.add(this.sector).subscribe((res:any)=>{
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/sector']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else{
      this.sectorService.update(this.sector).subscribe((res:any)=>{
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
