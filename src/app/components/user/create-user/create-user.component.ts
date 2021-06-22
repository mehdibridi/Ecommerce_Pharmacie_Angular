import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModule} from '../../../models/user/user.module';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  newUser: FormGroup;

  user: UserModule;

  constructor(private usersService: UserService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.newUser = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required)

    });
  }
  clear() {
    this.newUser.setValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      tel: ''
    });
  }

  onSubmit() {
    const userName = this.newUser.get('username').value;
    const tel = this.newUser.get('tel').value;
    const email = this.newUser.get('email').value;
    const password = this.newUser.get('password').value;
    const confirmPassword = this.newUser.get('confirmPassword').value;

    if (password !== confirmPassword ) {
      console.log('ERROR : password mismatch');
    } else {
      console.log(name + ' ' + userName + ' ' + email + ' ' + password + ' ' + confirmPassword);

      this.user = new UserModule();
      this.user.email = email;
      this.user.userName = userName;
      this.user.tel = tel;
      this.user.password = password;

      this.usersService.addUser(this.user).subscribe(
        (response) => {
          console.log('User created!');
        },
        (error) => {
          console.log('Error ! : ' + error);
        }
      );
      this.clear();
    }
  }
}
