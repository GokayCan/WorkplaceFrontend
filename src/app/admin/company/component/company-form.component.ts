import { Component } from '@angular/core';
import { Company } from '../model/company';
import { CompanyService } from '../service/company.service';
import { HelperService } from '../../service/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorService } from '../../sector/service/sector.service';
import { Sector } from '../../sector/model/sector';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styles: []
})
export class CompanyFormComponent {

  constructor(private companyService: CompanyService, private helperService: HelperService, private route: ActivatedRoute, private router: Router,private sectorService: SectorService) { }

  id: number = 0;

  sectors:Sector[]=[];

  company: Company = new Company();

  mappedSectors:Sector[]=[];
  public selectControlSector = new FormControl();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id != undefined) {
      this.companyService.get(this.id).subscribe((res: any) => {
        this.company = res.data;
        this.selectControlSector.setValue(this.company.sectorId);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    this.getSectorList();
  }

  getSectorList(){
    this.sectorService.getList().subscribe((res:any)=>{
      this.sectors=res.data;
      this.mappedSectors = res.data.map((x: any) => {
        return { optionId: x.id, optionTitle: x.name }
      })
    },
    (error) => {
      this.helperService.Message({ message: error.error, type: "error", code: error.status });
    });
  }

  save() {
    if (this.id == undefined) {
      this.companyService.add(this.company).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/company']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
    else {
      this.companyService.update(this.company).subscribe((res: any) => {
        this.helperService.Message({ message: res.message, type: "success" });
        setTimeout(() => {
          this.router.navigate(['/company']);
        }, 1500);
      },
        (error) => {
          this.helperService.Message({ message: error.error, type: "error", code: error.status });
        });
    }
  }

  changeSectorId() {
    this.company.sectorId = this.selectControlSector.value;
  }

}
