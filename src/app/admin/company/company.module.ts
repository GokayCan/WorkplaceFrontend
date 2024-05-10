import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyListComponent } from './component/company-list.component';
import { CompanyFormComponent } from './component/company-form.component';
import { CompanyPipe } from './pipe/company.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CompanyDetailComponent } from './component/company-detail.component';
import { CompanyStaffPipe } from './pipe/companyStaff.pipe';
import { CompanyResponsiblePipe } from './pipe/companyResponsible.pipe';
import { CompanyStudentPipe } from './pipe/companyStudent.pipe';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { NgxSummernoteModule } from 'ngx-summernote';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent
  },
  {
    path: 'add',
    component: CompanyFormComponent
  },
  {
    path: 'edit/:id',
    component: CompanyFormComponent
  },
  {
    path: 'detail/:id',
    component: CompanyDetailComponent
  }
]

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyFormComponent,
    CompanyPipe,
    CompanyStaffPipe,
    CompanyStudentPipe,
    CompanyResponsiblePipe,
    CompanyDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    NgxSummernoteModule
  ],
  exports: [
    CompanyListComponent,
    CompanyFormComponent,
    CompanyDetailComponent,
    CompanyPipe,
    CompanyStaffPipe,
    CompanyStudentPipe,
    CompanyResponsiblePipe,
  ],
  providers: [
    CompanyPipe
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap:[
    CompanyDetailComponent
  ]
})
export class CompanyModule { }
