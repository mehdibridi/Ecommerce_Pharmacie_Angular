import { Component, OnInit } from '@angular/core';
import {UserModule} from '../../../models/user/user.module';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
 list: UserModule[] = [];
  subscription: Subscription;
  constructor(public  userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.refresh();

  }
  refresh() {
    this.subscription = this.userService.usersSubject.subscribe(
      (data: UserModule[]) => {
        this.list = data;
      }
    );
    this.userService.getUsers();
  }
  onDelete(user: UserModule) {
    if (confirm('Confirmez la suppression ?')) {
        this.userService.deleteUser(user);
    }
  }
  onEdit(user: UserModule) {
    this.router.navigate(['/update_User', user.idUser]);
  }
  onFilter() {

    const searchKey = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    if (searchKey === '') {
      this.refresh();
    } else {
      this.list.forEach(
        e => {
          if (!JSON.stringify(e).toString().toLowerCase().includes(searchKey)) {
            const index = this.list.indexOf(e);
            this.list.splice(index, 1);
          }
        }
      );

    }
  }

  onClear() {
    (document.getElementById('searchInput') as HTMLInputElement).value = '';
    this.refresh();
  }

}
