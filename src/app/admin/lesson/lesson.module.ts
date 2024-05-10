import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonFormComponent } from './component/lesson-form.component';
import { LessonListComponent } from './component/lesson-list.component';
import { LessonPipe } from './pipe/lesson.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


const routes:Routes=[
  {
    path:'',
    component:LessonListComponent
  },
  {
    path:'add',
    component:LessonFormComponent
  },
  {
    path:'edit/:id',
    component:LessonFormComponent
  }
]

@NgModule({
  declarations: [
    LessonFormComponent,
    LessonListComponent,
    LessonPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    LessonFormComponent,
    LessonListComponent,
    LessonPipe
  ]
})
export class LessonModule { }
