import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  form: FormGroup;
  message: string = null;

  constructor(private router: Router,
              public authService: AuthServiceService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl(),
    });
  }

  get userName() { return this.form.get('userName'); }

  get password() { return this.form.get('password'); }

  onSubmit() {
    this.authService.signInUser(this.userName.value, this.password.value);
    this.message = 'Nom d\'utilisateur ou mot de passe incorretce!';
  }

}
