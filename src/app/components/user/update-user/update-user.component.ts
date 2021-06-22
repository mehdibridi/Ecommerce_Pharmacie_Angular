import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModule} from '../../../models/user/user.module';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  form: FormGroup;
  currentUser: UserModule;
  constructor(public serviceUser: UserService,
              private router:Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        const id = params.get('id');
        this.currentUser = this.serviceUser.findById(+id);
        this.init();
      }
    );
  }
  init() {
    this.form = new FormGroup({
      userName: new FormControl(this.currentUser.userName, Validators.required),
      email: new FormControl(this.currentUser.email, Validators.required),
      password: new FormControl(this.currentUser.password, Validators.required),
      tel: new FormControl(this.currentUser.tel, Validators.required)
    });
  }
  get userName() { return this.form.get('userName'); }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }


  get tel() { return this.form.get('tel'); }

  onSubmit() {
    if (confirm('Confirmer la modification ? ')) {
      this.currentUser.userName = this.form.get('userName').value;
      this.currentUser.email = this.form.get('email').value;
      this.currentUser.password = this.form.get('password').value;
      this.currentUser.tel = this.form.get('tel').value;
      this.serviceUser.update(this.currentUser);
      this.router.navigate(['/List_User']);
    }

  }
}
