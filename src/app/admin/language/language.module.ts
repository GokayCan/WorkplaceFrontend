import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePipe } from './pipe/language.pipe';
import { LanguageListComponent } from './component/language-list.component';
import { LanguageFormComponent } from './component/language-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    component:LanguageListComponent
  },
  {
    path:'add',
    component:LanguageFormComponent
  },
  {
    path:'edit/:id',
    component:LanguageFormComponent
  }
]

@NgModule({
  declarations: [
    LanguagePipe,
    LanguageListComponent,
    LanguageFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    LanguagePipe,
    LanguageFormComponent,
    LanguageListComponent
  ]
})
export class LanguageModule { }
