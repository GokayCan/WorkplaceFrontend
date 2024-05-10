import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyListComponent } from './component/faculty-list.component';
import { FacultyFormComponent } from './component/faculty-form.component';
import { FacultyPipe } from './pipe/faculty.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    component:FacultyListComponent
  },
  {
    path:'add',
    component:FacultyFormComponent
  },
  {
    path:'edit/:id',
    component:FacultyFormComponent
  }
]

@NgModule({
  declarations: [
    FacultyListComponent,
    FacultyFormComponent,
    FacultyPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports:[
    FacultyFormComponent,
    FacultyListComponent
  ]
})
export class FacultyModule { }
