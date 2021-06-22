import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {RoleModule} from '../models/role/role.module';
import {HttpClient} from '@angular/common/http';
import {PanierModule} from '../models/panier/panier.module';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: RoleModule[] = [];
  roleSubject = new Subject<RoleModule[]>();
  url = 'http://localhost:8080/role';

  constructor(private http: HttpClient) { }

  emitSubject() {
    this.roleSubject.next(this.roles);
  }

  getAll() {
    this.http.get<RoleModule[]>(this.url + '/getAll').subscribe(
      (data: RoleModule[]) => {
        this.roles = data;
        this.emitSubject();
      }, (error) => {
        console.log('Role getAll error : ' + JSON.stringify(error));
      }
    );
  }
}
