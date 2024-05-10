import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListComponent } from './component/staff-list.component';
import { StaffFormComponent } from './component/staff-form.component';
import { StaffPipe } from './pipe/staff.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';

const routes:Routes=[
  {
    path:'',
    component:StaffListComponent
  },
  {
    path:'add',
    component:StaffFormComponent
  },
  {
    path:'edit/:id',
    component:StaffFormComponent
  }
]

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};

@NgModule({
  declarations: [
    StaffListComponent,
    StaffFormComponent,
    StaffPipe
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
    StaffListComponent,
    StaffFormComponent,
    StaffPipe
  ]
})
export class StaffModule { }
