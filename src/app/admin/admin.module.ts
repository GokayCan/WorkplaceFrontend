import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModule } from './company/company.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentModule } from './department/department.module';
import { FacultyModule } from './faculty/faculty.module';
import { LanguageModule } from './language/language.module';
import { ProfileComponentModule } from './profile-component/profile-component.module';
import { LessonModule } from './lesson/lesson.module';

const routes:Routes=[
  {
    path:'',
    component:AdminComponent
  }
]

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    CompanyModule,
    ProfileComponentModule,
    DepartmentModule,
    FacultyModule,
    LanguageModule,
    LayoutModule,
    LessonModule,
    RouterModule.forChild(routes),
    FullCalendarModule
  ],
  exports:[
    CompanyModule,
    DepartmentModule,
    FacultyModule,
    LanguageModule,
    LayoutModule,
    LessonModule,
    HttpClientModule
  ]
})
export class AdminModule { }
