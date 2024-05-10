import { Injectable } from '@angular/core';
import { Role } from '../model/role';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DecodeService {

  jwtHelperService:JwtHelperService=new JwtHelperService();
  roles:Role[]=[];
  role:Role=new Role();

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

  getUserRole():string{

    let decode=this.jwtHelperService.decodeToken(localStorage.getItem("adminToken"));
    var userRoles=Object.keys(decode).filter(p=>p.endsWith("/role"));

    userRoles.forEach(element => {
      let model:Role=new Role();
      model.role=decode[element];
      this.roles.push(model);
      this.role.role=model.role;
    });


    return this.role.role;
  }

}
