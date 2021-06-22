import { Injectable } from '@angular/core';
import {UserModule} from '../models/user/user.module';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProduitModule} from '../models/produit/produit.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private  http: HttpClient) {}

  private users: UserModule[] = [];
  usersSubject = new Subject<UserModule[]>() ;
  url = 'http://localhost:8080/user';


  emitUserSubject() {
    this.usersSubject.next(this.users);
  }

  addUser(user: UserModule): Observable<boolean> {
    this.users.push(user);
    this.emitUserSubject();
    return this.http.post<boolean>(this.url + '/AddUser', user);
  }

  private getUsersSubject() {
    this.http.get<UserModule[]>(this.url + '/getAll').subscribe(
      (data) => {
        this.users = data;
        this.emitUserSubject();
      }
    );
  }
  getUsers() {
    this.getUsersSubject();
    return this.users;
  }
  findById(id: number) {
    const user = this.users.find(
      (p) => {
        return p.idUser === id;
      }
    );
    return user;
  }
  deleteUser(user: UserModule) {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    this.emitUserSubject();
    this.http.delete(this.url + '/delete/' + user.idUser)
      .subscribe(
        ()  => {
          this.getUsers();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }
  update(user: UserModule) {
    this.http
      .put<any>(this.url + '/update', user)
      .subscribe(
        () => {
          this.getUsers();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  findByUserNameAndPassword(username: string, password: string): UserModule {
    return this.users.find( e => e.userName.toLowerCase() === username.toLowerCase()
      && e.password.toLowerCase() === password.toLowerCase());
  }
  findUsername(username: string){
    return this.http.get<UserModule>(this.url + '/getByUsername/' + username);
  }
}
