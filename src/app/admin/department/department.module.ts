import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentListComponent } from './component/department-list.component';
import { DepartmentFormComponent } from './component/department-form.component';
import { DepartmentPipe } from './pipe/department.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DepartmentDetailComponent } from './component/department-detail.component';
import { LessonModule } from "../lesson/lesson.module";
import { DepartmentLessonPipe } from './pipe/department-lesson.pipe';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent
  },
  {
    path: 'add',
    component: DepartmentFormComponent
  },
  {
    path: 'edit/:id',
    component: DepartmentFormComponent
  },
  {
    path: 'detail/:id',
    component: DepartmentDetailComponent
  }
]

@NgModule({
    declarations: [
        DepartmentListComponent,
        DepartmentFormComponent,
        DepartmentDetailComponent,
        DepartmentPipe,
        DepartmentLessonPipe,
        
    ],
    exports: [
        DepartmentListComponent,
        DepartmentFormComponent,
        DepartmentPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        RouterModule.forChild(routes),
    ]
})
export class DepartmentModule { }
