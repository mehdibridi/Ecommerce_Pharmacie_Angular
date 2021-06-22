import {EventEmitter, Injectable, Output} from '@angular/core';
import {UserModule} from '../models/user/user.module';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  @Output() getLoggedInUser: EventEmitter<UserModule> = new EventEmitter();
  activeUser: UserModule;

  constructor(public userService: UserService,
              private router: Router) {
    this.userService.getUsers();
  }

  signInUser(userName: string, password: string) {
    this.activeUser = this.userService.findByUserNameAndPassword(userName, password);
    if (this.activeUser !== undefined) {
      localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
      this.getLoggedInUser.emit(this.activeUser);
      this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
    }
  }
  isAuth(){
    if (localStorage.getItem('activeUser') !== ''){
      return true;
    }
    return false;
  }
 /* signInAdmin(userName: string, password: string) {
    this.activeUser = this.userService.findByUserNameAndPassword(userName, password);
    if (this.activeUser !== undefined && JSON.stringify(this.activeUser.roles).includes('admin')) {
      localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
      this.getLoggedInUser.emit(this.activeUser);
      this.router.navigate(['/list-utilisateur']);
    }
  }*/

  signOut() {
    localStorage.setItem('activeUser', '');
   // this.router.navigate(['/home']);
    this.router.navigate(['/home'])
      .then(() => {
        window.location.reload();
      });

  }
}
