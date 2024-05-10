import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/service/auth.service';
import { DecodeService } from '../../service/decoder.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,private decodeService:DecodeService) { }


  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
