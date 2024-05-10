import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgrammingListComponent } from './component/programming-list.component';
import { ProgrammingFormComponent } from './component/programming-form.component';
import { ProgrammingPipe } from './pipe/programming.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

const routes:Routes=[
  {
    path:'',
    component:ProgrammingListComponent
  },
  {
    path:'add',
    component:ProgrammingFormComponent
  },
  {
    path:'edit/:id',
    component:ProgrammingFormComponent
  }
]

@NgModule({
  declarations: [
    ProgrammingListComponent,
    ProgrammingFormComponent,
    ProgrammingPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    ProgrammingListComponent,
    ProgrammingFormComponent,
    ProgrammingPipe
  ]
})
export class ProgrammingModule { }
