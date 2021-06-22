import { Component, OnInit } from '@angular/core';
import {UserModule} from '../../../models/user/user.module';
import {AuthServiceService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  activeUser: boolean;
  userName: string;
  ngOnInit(): void {
    this.activeUser = this.authService.isAuth();
    this.userName = JSON.parse(localStorage.getItem('activeUser')).userName;
  }


  constructor(public authService: AuthServiceService) {

  }


  OnsignOut() {
    this.authService.signOut();
  }

}
