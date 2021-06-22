import { Component } from '@angular/core';
import {AuthServiceService} from './services/auth-service.service';
import {UserModule} from './models/user/user.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled';
  activeUser: UserModule;

  constructor(public authService: AuthServiceService) {
    this.authService.getLoggedInUser.subscribe(user => this.changeActiveUser(user));
  }

  changeActiveUser(user: UserModule) {
    this.activeUser = user;
  }
  OnsignOut() {
    this.authService.signOut();
  }
}

