import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  adminLogin:Login=new Login();

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(loginForm:any){
    this.adminLogin=loginForm;
    this.authService.login(this.adminLogin);

  }

}
