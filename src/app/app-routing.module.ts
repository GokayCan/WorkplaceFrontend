import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { AuhtGuard } from './admin/login/guard/auth.guard';
import { ProfileComponentComponent } from './admin/profile-component/component/profile-component.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'login',
    loadChildren:()=>import('./admin/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'',
    component:LayoutComponent,
    canActivateChild:[AuhtGuard],
    children:[
      {
        path:'home',
        component:AdminComponent,
        loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
      },
      {
        path:'company',
        loadChildren:()=>import('./admin/company/company.module').then(m=>m.CompanyModule)
      },
      {
        path:'department',
        loadChildren:()=>import('./admin/department/department.module').then(m=>m.DepartmentModule)
      },
      {
        path:'faculty',
        loadChildren:()=>import('./admin/faculty/faculty.module').then(m=>m.FacultyModule)
      },
      {
        path:'language',
        loadChildren:()=>import('./admin/language/language.module').then(m=>m.LanguageModule)
      },
      {
        path:'interest',
        loadChildren:()=>import('./admin/insterest/interest.module').then(m=>m.InterestModule)
      },
      {
        path:'programming',
        loadChildren:()=>import('./admin/programming/programming.module').then(m=>m.ProgrammingModule)
      },
      {
        path:'student',
        loadChildren:()=>import('./admin/student/student.module').then(m=>m.StudentModule)
      },
      {
        path:'staff',
        loadChildren:()=>import('./admin/staff/staff.module').then(m=>m.StaffModule)
      },
      {
        path:'profile',
        loadChildren:()=>import('./admin/profile-component/profile-component.module').then(m=>m.ProfileComponentModule)
      },
      {
        path:'sector',
        loadChildren:()=>import('./admin/sector/sector.module').then(m=>m.SectorModule)
      },
      {
        path:'lesson',
        loadChildren:()=>import('./admin/lesson/lesson.module').then(m=>m.LessonModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
