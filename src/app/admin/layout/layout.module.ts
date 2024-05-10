import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';

const routes:Routes=[
  {
    path:'',
    component:LayoutComponent,
  }
]

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SidebarModule,
    FooterModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    LayoutComponent
  ],
})
export class LayoutModule { }
