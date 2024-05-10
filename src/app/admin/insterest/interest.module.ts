import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestPipe } from './pipe/interest.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InterestFormComponent } from './component/interest-form.component';
import { InterestListComponent } from './component/interest-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes:Routes=[
  {
    path:"",
    component:InterestListComponent
  },
  {
    path:"add",
    component:InterestFormComponent
  },
  {
    path:"edit/:id",
    component:InterestFormComponent
  }
]

@NgModule({
  declarations: [
    InterestPipe,
    InterestListComponent,
    InterestFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    InterestPipe,
    InterestListComponent,
    InterestFormComponent
  ]
})
export class InterestModule { }
