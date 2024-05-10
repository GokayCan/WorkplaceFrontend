import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DecodeService {

  jwtHelperService:JwtHelperService=new JwtHelperService();

  constructor() { }

  getUserId():number{
    let decode=this.jwtHelperService.decodeToken(localStorage.getItem("adminToken"));
    var userId=Object.keys(decode).filter(p=>p.endsWith("/nameidentifier"))[0];
    return +decode[userId];
  }

  getUserName():string{
    let decode=this.jwtHelperService.decodeToken(localStorage.getItem("adminToken"));
    var userName=Object.keys(decode).filter(p=>p.endsWith("/name"))[0];
    return decode[userName];
  }

}
