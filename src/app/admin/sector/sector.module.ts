import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorListComponent } from './component/sector-list.component';
import { SectorFormComponent } from './component/sector-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SectorPipe } from './pipe/sector.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SectorDetailComponent } from './component/sector-detail.component';

const routes:Routes=[
  {
    path:'',
    component:SectorListComponent
  },
  {
    path:'add',
    component:SectorFormComponent
  },
  {
    path:'edit/:id',
    component:SectorFormComponent
  },
  {
    path:'detail/:id',
    component:SectorDetailComponent
  }
]

@NgModule({
  declarations: [
    SectorListComponent,
    SectorFormComponent,
    SectorPipe,
    SectorDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  NgxPaginationModule,

  ]
})
export class SectorModule { }
