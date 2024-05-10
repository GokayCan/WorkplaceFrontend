import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponentComponent } from './component/profile-component.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'',
    component:ProfileComponentComponent,
  }
]

@NgModule({
  declarations: [
    ProfileComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)

  ]
})
export class ProfileComponentModule { }
