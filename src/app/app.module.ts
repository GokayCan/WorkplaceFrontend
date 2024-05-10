import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { LoginModule } from './admin/login/login.module';
import { AuhtGuard } from './admin/login/guard/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    LoginModule,
    ToastrModule.forRoot(
      {
        positionClass: "toast-top-right",
        maxOpened: 5,
        preventDuplicates: true,
        progressBar: false,
        timeOut: 1000,
        closeButton: true,
        easing: "ease-in"
      }
    ),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AuhtGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    this.overrideDate();
  }

  overrideDate() {
    Date.prototype.toJSON = function (key) {
      const year = this.getFullYear();
      const month = String(this.getMonth() + 1).padStart(2, '0');
      const day = String(this.getDate()).padStart(2, '0');
      const hours = String(this.getHours()).padStart(2, '0');
      const minutes = String(this.getMinutes()).padStart(2, '0');
      const seconds = String(this.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };
  }
}
