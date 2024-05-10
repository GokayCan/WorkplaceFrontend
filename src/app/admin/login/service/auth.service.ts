import { Inject, Injectable } from '@angular/core';
import { Token } from '../model/token';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { HelperService } from '../../service/helper.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  adminToken: Token = new Token();

  constructor(private httpClient: HttpClient, private router: Router, private helperService: HelperService) { }

  isAuthenticate() {
    if (localStorage.getItem("adminToken")) {
      return true;
    }
    return false;
  }

  login(adminLogin: Login) {
    let api = environment.apiUrl + "auth/Login";
    this.httpClient.post(api, adminLogin).subscribe((res: any) => {
      this.adminToken = res.data;
      localStorage.setItem("adminToken", this.adminToken.accessToken);
      this.helperService.Message({ message: "Giriş İşlemi Başarılı", type: "success" });
      setTimeout(() => {
        this.router.navigate(["/home"]);
      }, 1500);
    }, (err) => {
      this.helperService.Message({ message: err.error, type: "error", code: err.status });
    });
  }

  logout() {
    localStorage.removeItem("adminToken");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    this.helperService.Message({ message: "Çıkış İşlemi Başarılı", type: "success" });
  }


}
