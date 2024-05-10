import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './component/student-list.component';
import { StudentFormComponent } from './component/student-form.component';
import { StudentPipe } from './pipe/student.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { StudentDetailComponent } from './component/student-detail.component';
import { StudentInterestPipe } from './pipe/student-interest.pipe';
import { StudentLanguagePipe } from './pipe/student-language.pipe';
import { StudentProgrammingPipe } from './pipe/student-programming.pipe';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { StudentLessonPipe } from './pipe/student-lesson.pipe';

const routes:Routes=[
  {
    path:'',
    component:StudentListComponent
  },
  {
    path:'add',
    component:StudentFormComponent
  },
  {
    path:'edit/:id',
    component:StudentFormComponent
  },
  {
    path:'detail/:id',
    component:StudentDetailComponent
  }
]

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};

@NgModule({
  declarations: [
    StudentListComponent,
    StudentFormComponent,
    StudentPipe,
    StudentDetailComponent,
    StudentInterestPipe,
    StudentLanguagePipe,
    StudentProgrammingPipe,
    StudentLessonPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
  ],
  exports:[
    StudentListComponent,
    StudentFormComponent,
    StudentDetailComponent,
    StudentPipe,
    StudentInterestPipe,
    StudentLanguagePipe,
    StudentProgrammingPipe
  ],
  providers: [
    StudentPipe
  ]
})
export class StudentModule { }
